import { IChatUser } from '@share-lib';
import { ChatMessage } from './chat.model';

export class ChatUser {
  userId: string;
  username: string;
  img?: string;
  responseTime?: number;
  unreadChatCount?: number = 0;

  constructor(chatUser: IChatUser) {
    this.userId = chatUser.userId;
    this.username = chatUser.username;
    this.img = chatUser.img;
    this.responseTime = chatUser.responseTime;
  }

  isTyping(userId: string) {
    return userId === this.userId;
  }

  getUnreadChatCount(unreadChats: ChatMessage[]) {
    this.unreadChatCount = unreadChats.filter(({ senderUserId }) => senderUserId === this.userId).length;
    return this.unreadChatCount;
  }

  toInterface(): IChatUser {
    return {
      userId: this.userId,
      username: this.username,
      img: this.img,
      responseTime: this.responseTime,
      socketId: ''
    };
  }
}
