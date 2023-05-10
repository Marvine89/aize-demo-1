import { BeAuthLibModule } from '@be-auth-lib';
import { BeChatLibModule } from '@be-chat-lib';
import { BeUserLibModule } from '@be-user-lib';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    BeAuthLibModule,
    BeUserLibModule,
    BeChatLibModule,
    RouterModule.register([
      {
        path: 'auth',
        module: BeAuthLibModule
      },
      {
        path: 'users',
        module: BeUserLibModule
      },
      {
        path: 'chats',
        module: BeChatLibModule
      }
    ])
  ]
})
export class AppRouteModule {}
