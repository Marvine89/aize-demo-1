import { Injectable } from '@nestjs/common';
import { NlpService } from './be-nlp.service';
import { BeChatStoreService } from './be-chat-store.service';
import { IChatMessage } from '@share-libs/interfaces';
import { uuid, waitFor } from '@share-libs/helpers/helper-functions';

@Injectable()
export class BeChatService {
  constructor(private readonly nlpService: NlpService, private readonly chatStoreService: BeChatStoreService) {}

  getChats(reqUserId: string, chatUserId: string): IChatMessage[] {
    return this.chatStoreService.getUserMessages(reqUserId, chatUserId);
  }

  async generateBotResponse(chat: IChatMessage) {
    const botUser = this.chatStoreService.findUserById(chat.receiverUserId)!;
    await waitFor(botUser.responseTime);
    const { answer } = await this.nlpService.process(chat.message);

    return this.chatStoreService.addChat({
      id: uuid(),
      senderUserId: chat.receiverUserId,
      receiverUserId: chat.senderUserId,
      message: answer || 'Ops... I did not get that',
      dateTime: new Date(),
      sentDateTime: new Date()
    });
  }
}
