import { Controller, Get, Param, Session, UseGuards } from '@nestjs/common';
import { ChatReqDto } from './models/be-chat.model';
import { BeChatService } from './services';
import { BeAuthLibGuard } from '@be-auth-lib';

@Controller()
export class BeChatController {
  constructor(private readonly chatService: BeChatService) {}

  @Get('/:userId')
  @UseGuards(BeAuthLibGuard)
  getChats(@Param() params: ChatReqDto, @Session() session: ChatReqDto) {
    return this.chatService.getChats(session.userId, params.userId);
  }
}
