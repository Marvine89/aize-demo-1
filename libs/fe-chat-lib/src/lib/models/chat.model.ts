import { IChatMessage } from '@share-lib';
import { format } from 'date-fns';

export class ChatMessage {
  id: string;
  receiverUserId: string;
  senderUserId: string;
  message: string;
  dateTime: Date;
  sentDateTime?: Date;
  readDateTime?: Date;

  constructor(chatMessage: IChatMessage) {
    this.id = chatMessage.id;
    this.receiverUserId = chatMessage.receiverUserId;
    this.senderUserId = chatMessage.senderUserId;
    this.message = chatMessage.message;
    this.dateTime = new Date(chatMessage.dateTime);
    this.sentDateTime = chatMessage.sentDateTime && new Date(chatMessage.sentDateTime);
    this.readDateTime = chatMessage.readDateTime && new Date(chatMessage.readDateTime);
  }

  isMine(userId: string) {
    return userId === this.senderUserId;
  }

  get sent() {
    return !!this.sentDateTime;
  }

  get read() {
    return !!this.readDateTime;
  }

  get formatedDateTime() {
    return format(this.dateTime, 'HH:mm');
  }

  isUserChat(userId?: string) {
    return [this.receiverUserId, this.senderUserId].includes(userId || '');
  }

  updateReadStatus() {
    this.readDateTime = new Date();
    return this;
  }

  toInterface(): IChatMessage {
    return {
      id: this.id,
      receiverUserId: this.receiverUserId,
      senderUserId: this.senderUserId,
      message: this.message,
      dateTime: this.dateTime,
      sentDateTime: this.sentDateTime,
      readDateTime: this.readDateTime
    };
  }
}
