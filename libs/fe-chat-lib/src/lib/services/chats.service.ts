import { Injectable, computed, inject, signal } from '@angular/core';
import { SocketIOService } from './socket-io.service';
import { IChatMessage, IChatUser, ISentMessageProps, SocketEvents, UserStoreService, uuid } from '@share-lib';
import { HttpClient } from '@angular/common/http';
import { EnvironmentToken } from '@fe-environment';
import { map, tap } from 'rxjs';
import { ChatMessage, ChatUser } from '../models';

@Injectable()
export class ChatsService {
  private readonly _http = inject(HttpClient);
  private readonly _environment = inject(EnvironmentToken);
  private readonly _socketIOService = inject(SocketIOService);
  private readonly _userStore = inject(UserStoreService);

  private readonly _authUrl = `${this._environment.apiUrl}/chats`;

  private readonly _selectedUser = signal<UNDEFINED<ChatUser>>(undefined);
  readonly selectedUser = computed(() => this._selectedUser());

  private readonly _onlineUsers = signal<Array<ChatUser>>([]);
  readonly onlineUsers = computed(() => this._onlineUsers());

  private readonly _chats = signal<Array<ChatMessage>>([]);
  readonly chats = computed(() => this._chats());
  readonly unreadChat = computed(() => this._chats().filter(({ read }) => !read));

  private readonly _typingUserId = signal<string>('');
  readonly typingUserId = computed(() => this._typingUserId());

  connect(): void {
    this._socketIOService.connect();
    this._onSuccessConnection();
    this._onNewUser();
    this._onNewMessage();
    this._onTypingMessage();
    this._onMessageRead();
    this._onDisconnectedUser();
  }

  private _onSuccessConnection() {
    this._socketIOService.socket.on(SocketEvents.ON_LOGIN_USER_SUCCESS, (users: IChatUser[]) => {
      this._onlineUsers.set(users.map(user => new ChatUser(user)));
    });
  }

  private _onNewUser() {
    this._socketIOService.socket.on(SocketEvents.ON_NEW_USER, (new_user: IChatUser) => {
      this._onlineUsers.update(users => [...users, new ChatUser(new_user)]);
    });
  }

  private _onNewMessage() {
    this._socketIOService.socket.on(SocketEvents.ON_NEW_MESSAGE, (chat: IChatMessage) => {
      this._chats.update(chats => [...chats, new ChatMessage(chat)]);
    });
  }

  private _onTypingMessage() {
    this._socketIOService.socket.on(SocketEvents.ON_TYPING_MESSAGE, (user: { userId: string }) => {
      this._typingUserId.update(() => {
        this._completeTypingMessage();
        return user.userId;
      });
    });
  }

  private _onMessageRead() {
    this._socketIOService.socket.on(SocketEvents.ON_MESSAGE_READ, (chats: IChatMessage[]) => {
      this.updateChats(chats.map(chat => new ChatMessage(chat)));
    });
  }

  private _onDisconnectedUser() {
    this._socketIOService.socket.on(SocketEvents.ON_USER_DISCONECTED, (user: { userId: string }) => {
      this._onlineUsers.update(users => users.filter(({ userId }) => userId !== user.userId));
    });
  }

  fetchMessages(userId: string) {
    return this._http
      .get<IChatMessage[]>(`${this._authUrl}/${userId}`)
      .pipe(map(userChats => userChats.map(chat => new ChatMessage(chat))))
      .pipe(map(userChats => userChats.filter(({ id }) => !this._chats().some(chat => id === chat.id))))
      .pipe(tap(newChats => this._addMoreChats(newChats)));
  }

  sendMessage({ message, receiverUserId }: ISentMessageProps) {
    const chat = new ChatMessage({
      id: uuid(),
      senderUserId: this._userStore.userId,
      receiverUserId: receiverUserId,
      message: message,
      dateTime: new Date()
    });
    this._chats.update(chats => [...chats, chat]);

    this._socketIOService.socket.emit(SocketEvents.SEND_MESSAGE, chat.toInterface(), (chat: IChatMessage) => {
      this.updateChats([new ChatMessage(chat)]);
    });
  }

  sendTyping(receiverUserId: string) {
    this._socketIOService.socket.emit(SocketEvents.TYPING_MESSAGE, { receiverUserId });
  }

  unreadChatUser(unreadChats: ChatMessage[]) {
    unreadChats
      .filter(({ read }) => !read)
      .map(unreadChat => {
        unreadChat.readDateTime = new Date();
        return unreadChat;
      });
  }

  sendReadChats(unreadChats: ChatMessage[]) {
    setTimeout(() => this.updateChats(unreadChats), 800);
    this._socketIOService.socket.emit(
      SocketEvents.MESSAGE_READ,
      unreadChats.map(chat => chat.toInterface())
    );
  }

  setSelectedUser(chatUser: ChatUser) {
    if (chatUser.userId === this._selectedUser()?.userId) return;
    this._selectedUser.set(chatUser);
  }

  disconnect(): void {
    this._socketIOService.disconnect();
    this._selectedUser.set(undefined);
    this._onlineUsers.set([]);
    this._chats.set([]);
    this._typingUserId.set('');
  }

  private updateChats(updatedChats: ChatMessage[]) {
    this._chats.update(chats => {
      return chats.map(chat => {
        const newChats = updatedChats.find(updatedChat => updatedChat.id === chat.id);
        return newChats ? newChats : chat;
      });
    });
  }

  private _addMoreChats(newChats: ChatMessage[]) {
    this._chats.update(chats => {
      return [...chats, ...newChats].sort((aChat, zChat) => this._sortChatByDate(aChat, zChat));
    });
  }

  private _sortChatByDate(aChat: ChatMessage, zChat: ChatMessage) {
    return aChat.dateTime.getTime() - zChat.dateTime.getTime();
  }

  private _completeTypingMessage() {
    setTimeout(() => {
      this._typingUserId.set('');
    }, 3000);
  }
}
