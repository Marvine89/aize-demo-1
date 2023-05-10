import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'fe-chat-chats-page',
  templateUrl: './chats-page.component.html',
  styleUrls: ['./chats-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsPageComponent implements OnInit, OnDestroy {
  private readonly _chatsService = inject(ChatsService);

  ngOnInit() {
    this._chatsService.connect();
  }

  ngOnDestroy() {
    this._chatsService.disconnect();
  }
}
