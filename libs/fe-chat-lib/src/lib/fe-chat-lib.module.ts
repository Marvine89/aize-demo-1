import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { SplitterModule } from 'primeng/splitter';
import { BadgeModule } from 'primeng/badge';
import { FeChatLibRoutingModule } from './fe-chat-lib-routing.module';
import { ChatsPageComponent } from './chats-page/chats-page.component';
import { TopBarComponent } from './chats-page/components/top-bar/top-bar.component';
import { SideBlockComponent } from './chats-page/components/side-block/side-block.component';
import { MessagesBlockComponent } from './chats-page/components/messages-block/messages-block.component';
import { MessageComponent } from './chats-page/components/messages-block/message/message.component';
import { FeTranslationDropdownComponent } from '@fe-translation-lib';
import { PushModule } from '@rx-angular/template/push';
import { IfModule } from '@rx-angular/template/if';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsService } from './services/chats.service';
import { SocketIOService } from './services/socket-io.service';

@NgModule({
  declarations: [
    ChatsPageComponent,
    TopBarComponent,
    SideBlockComponent,
    MessagesBlockComponent,
    MessageComponent
  ],
  imports: [
    IfModule,
    PushModule,
    BadgeModule,
    FormsModule,
    CommonModule,
    RouterModule,
    AvatarModule,
    ButtonModule,
    SplitterModule,
    TranslateModule,
    ReactiveFormsModule,
    FeChatLibRoutingModule,
    FeTranslationDropdownComponent
  ],
  providers: [ChatsService, SocketIOService]
})
export class FeChatLibModule {}
