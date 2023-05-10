import { OnlineUser } from '@share-libs/interfaces';
import { Socket } from 'socket.io-client';

export class ChatReqDto {
  userId: string;
}

export class NlpBot {
  process: (lng: string, question: string) => Promise<NlpBotResponse>;
}

export class NlpBotResponse {
  answers: { answer: string }[];
  answer: string;
}

export interface IClientReq extends Socket {
  session: OnlineUser;
}
