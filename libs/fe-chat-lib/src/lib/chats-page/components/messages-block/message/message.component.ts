import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  inject
} from '@angular/core';
import { ChatMessage } from '../../../../models';
import { ChatsService } from '../../../../services';
import { UserStoreService } from '@share-libs/services';
import { Subject, debounceTime } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fe-chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnChanges, OnDestroy {
  @Input() chats!: ChatMessage[];
  @ViewChild('ChatWindow') readonly chatWindow!: ElementRef;
  private readonly document = inject(DOCUMENT);
  private readonly _chatsService = inject(ChatsService);
  private readonly _scroolToBottom$ = new Subject<void>();
  private readonly _userStore = inject(UserStoreService);
  readonly myUserId = this._userStore.userId;

  constructor() {
    this._onScrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chats'].currentValue) {
      changes['chats'].currentValue && this._scroolToBottom$.next();
      this._getUnReadMessage();
    }
  }

  trackChatBy(_: number, chat: ChatMessage) {
    return chat.id;
  }

  private _getUnReadMessage() {
    const unreadChats = this.chats
      .filter(chat => !chat.read && !chat.isMine(this.myUserId))
      .map(unreadChat => unreadChat.updateReadStatus());
    unreadChats.length && this._chatsService.sendReadChats(unreadChats);
  }

  private _onScrollToBottom() {
    this._scroolToBottom$.pipe(debounceTime(300)).subscribe(() => {
      this.document
        .getElementById(`msg-${this.chats.length - 1}`)
        ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  }

  ngOnDestroy() {
    this._scroolToBottom$.unsubscribe();
  }
}
