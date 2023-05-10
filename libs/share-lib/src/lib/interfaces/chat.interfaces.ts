export interface OnlineUser {
  userId: string;
  socketId: string;
  username: string;
  img?: string;
}

export interface IChatUser extends OnlineUser {
  responseTime?: number;
}

export interface ISentMessageProps {
  receiverUserId: string;
  message: string;
}

export interface IChatMessage extends ISentMessageProps {
  id: string;
  senderUserId: string;
  dateTime: Date;
  sentDateTime?: Date;
  readDateTime?: Date;
}

export interface ITypingMessageProps {
  receiverUserId: string;
  message: string;
}