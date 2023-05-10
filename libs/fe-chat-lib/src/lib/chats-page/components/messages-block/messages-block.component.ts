import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject
} from '@angular/core';
import { ChatsService } from '../../../services/chats.service';
import { FormControl, Validators } from '@angular/forms';
import { filter, throttleTime } from 'rxjs';

@Component({
  selector: 'fe-chat-messages-block',
  templateUrl: './messages-block.component.html',
  styleUrls: ['./messages-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesBlockComponent implements AfterViewInit {
  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;
  private readonly _chatsService = inject(ChatsService);
  readonly textMessage = new FormControl('', [Validators.required]);

  private readonly _selectedUser = this._chatsService.selectedUser;
  readonly userId = computed(() => this._selectedUser()?.userId);
  readonly selectedUser = computed(() => {
    this._setInputAutoFocus();
    this._fetchChats();
    return this._selectedUser();
  });

  private readonly _chats = this._chatsService.chats;
  readonly chats = computed(() => this._myChats);

  ngAfterViewInit(): void {
    this._onTypingMessage();
  }

  private _fetchChats() {
    if (!this.userId()) return;
    this._chatsService.fetchMessages(this.userId()!).subscribe();
  }

  get _myChats() {
    return this._chats().filter(chat => chat.isUserChat(this.userId()));
  }

  private _onTypingMessage() {
    this.textMessage.valueChanges.pipe(throttleTime(3000), filter(Boolean)).subscribe(() => {
      this.userId() && this._chatsService.sendTyping(this.userId()!);
    });
  }

  private _setInputAutoFocus() {
    setTimeout(() => this.textInput?.nativeElement.focus(), 300);
  }

  sendMessage() {
    if (this.textMessage.value?.trim() && this._selectedUser()?.userId) {
      const message = this.textMessage.value;
      const receiverUserId = this._selectedUser()!.userId;
      this._chatsService.sendMessage({ message, receiverUserId });
      this.textMessage.setValue('');
    }
  }
}
