import { Module } from '@nestjs/common';
import { BeAuthLibModule } from '@be-auth-lib';
import { BeChatController } from './be-chat-lib.controller';
import { BeChatsGateway } from './be-chat-lib.gateway';
import { BeChatService, NlpService, BeChatStoreService } from './services';

@Module({
  imports: [BeAuthLibModule],
  controllers: [BeChatController],
  providers: [BeChatService, NlpService, BeChatsGateway, BeChatStoreService]
})
export class BeChatLibModule {}
