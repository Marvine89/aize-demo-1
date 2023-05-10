import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { environment } from '@be-environment-lib';
import { Req, UseGuards } from '@nestjs/common';
import { BeSocketAuthLibGuard } from '@be-auth-lib';
import { IClientReq } from './models/be-chat.model';
import { BeChatStoreService } from './services/be-chat-store.service';
import { IChatMessage, ITypingMessageProps } from '@share-libs/interfaces';
import { ERROR, SocketEvents } from '@share-libs/enums';
import { isBotUser, waitFor } from '@share-libs/helpers/helper-functions';
import { BeChatService } from './services';

@WebSocketGateway(4000, {
  cors: environment.cors,
  path: '/socket.io'
})
export class BeChatsGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatStoreService: BeChatStoreService, private readonly chatService: BeChatService) {}

  handleDisconnect(client: { id: string }) {
    const logoutUser = this.chatStoreService.findUserBySocketId(client.id);
    this.chatStoreService.removeOnlineUser(client.id);
    this.server.except(client.id).emit(SocketEvents.ON_USER_DISCONECTED, { userId: logoutUser?.userId });
  }

  @UseGuards(BeSocketAuthLibGuard)
  @SubscribeMessage(SocketEvents.LOGIN_USER)
  newLogin(@Req() client: IClientReq) {
    if (this.chatStoreService.isUserOnline(client.session)) {
      return { error: ERROR.USER_ALREADY_ONLINE };
    }

    // Emit to new login user
    client.emit(SocketEvents.ON_LOGIN_USER_SUCCESS, [...this.chatStoreService.onlineUsers]);
    // Push new user to array list
    const newUser = this.chatStoreService.addOnlineUser(client.session);
    // Emit to all user except login user
    this.server.except(client.session.socketId).emit(SocketEvents.ON_NEW_USER, newUser);
  }

  @UseGuards(BeSocketAuthLibGuard)
  @SubscribeMessage(SocketEvents.SEND_MESSAGE)
  async sendMessage(@MessageBody() payload: IChatMessage, @Req() client: IClientReq): Promise<IChatMessage> {
    const chat = this.chatStoreService.addChat({
      ...payload,
      senderUserId: client.session.userId
    });

    this._sendMessage(chat);
    return chat;
  }

  private async _sendMessage(chat: IChatMessage) {
    if (!isBotUser(chat.receiverUserId)) {
      const receiverUser = this.chatStoreService.findUserById(chat.receiverUserId);
      this.server.to(receiverUser?.socketId).emit(SocketEvents.ON_NEW_MESSAGE, chat);
      return;
    }

    await waitFor(1500);
    const receiverUser = this.chatStoreService.findUserById(chat.senderUserId);

    const updatedChat = this.chatStoreService.updateChat({ ...chat, readDateTime: new Date() });
    this.server.to(receiverUser.socketId).emit(SocketEvents.ON_MESSAGE_READ, [updatedChat]);

    this._sendTypingMessage(chat.receiverUserId, chat.senderUserId);
    const botMessage = await this.chatService.generateBotResponse(chat);

    this.server.to(receiverUser.socketId).emit(SocketEvents.ON_NEW_MESSAGE, botMessage);
  }

  @UseGuards(BeSocketAuthLibGuard)
  @SubscribeMessage(SocketEvents.MESSAGE_READ)
  async readChats(@MessageBody() chats: IChatMessage[]) {
    const updatedChats = chats.map(chat => this.chatStoreService.updateChat(chat));
    const senderUserId = updatedChats[0].senderUserId;

    const receiverUser = this.chatStoreService.findUserById(senderUserId);
    this.server.to(receiverUser.socketId).emit(SocketEvents.ON_MESSAGE_READ, updatedChats);
  }

  @UseGuards(BeSocketAuthLibGuard)
  @SubscribeMessage(SocketEvents.TYPING_MESSAGE)
  async sendTypingMessage(@MessageBody() { receiverUserId }: ITypingMessageProps, @Req() client: IClientReq) {
    this._sendTypingMessage(client.session.userId, receiverUserId);
  }

  private async _sendTypingMessage(senderUserId: string, receiverUserId: string) {
    const receiver = this.chatStoreService.findUserById(receiverUserId);
    this.server.to(receiver.socketId).emit(SocketEvents.ON_TYPING_MESSAGE, { userId: senderUserId });
  }
}
