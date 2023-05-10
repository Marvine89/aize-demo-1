import { Injectable } from '@nestjs/common';
import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();
import { USERS } from '../be-chat-bots.mock';
import { IChatUser, IChatMessage } from '@share-libs/interfaces';

@Injectable()
export class BeChatStoreService {
  private _onlineUsers: IChatUser[] = [...USERS];
  private _chats: IChatMessage[] = [];

  get onlineUsers() {
    return [...this._onlineUsers];
  }

  isUserOnline(user: IChatUser) {
    return this._onlineUsers.find(({ userId }) => userId === user.userId);
  }

  addOnlineUser(user: IChatUser) {
    user.img = generator.generateRandomAvatar();
    this._onlineUsers = [...this._onlineUsers, user];
    return user;
  }

  removeOnlineUser(p_socketId: string) {
    const userIndex = this._onlineUsers.findIndex(({ socketId }) => socketId === p_socketId);
    userIndex > -1 && this._onlineUsers.splice(userIndex, 1);
    return <IChatUser[]>[...this._onlineUsers];
  }

  findUserById(id: string) {
    return this._onlineUsers.find(({ userId }) => userId === id);
  }

  findUserBySocketId(p_socketId: string) {
    return this._onlineUsers.find(({ socketId }) => socketId === p_socketId);
  }

  get chats() {
    return [...this._chats];
  }

  addChat(chat: IChatMessage) {
    chat.sentDateTime = new Date();
    this._chats = [...this._chats, chat];
    return chat;
  }

  updateChat(newChat: IChatMessage) {
    const updatedChats = this._chats.map(chat => (chat.id === newChat.id ? newChat : chat));
    this._chats = [...updatedChats];
    return newChat;
  }

  getUserMessages(userId: string, chatUserId: string) {
    return this._chats.filter(({ receiverUserId, senderUserId }) => {
      const userMessage = [receiverUserId, senderUserId].includes(userId);
      const chatUserMsg = [receiverUserId, senderUserId].includes(chatUserId);
      return userMessage && chatUserMsg;
    });
  }
}
