import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatsService } from '../../../services/chats.service';
import { ChatUser } from '../../../models';

@Component({
  selector: 'fe-chat-side-block',
  templateUrl: './side-block.component.html',
  styleUrls: ['./side-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBlockComponent {
  private readonly chatsService = inject(ChatsService);
  readonly selectedUser = signal<UNDEFINED<string>>(undefined);
  readonly onlineUsers = this.chatsService.onlineUsers;
  readonly typingUserId = this.chatsService.typingUserId;
  readonly unreadChats = this.chatsService.unreadChat;

  userClicked(chatUser: ChatUser) {
    this.selectedUser.set(chatUser.userId);
    this.chatsService.setSelectedUser(chatUser);
  }
}
