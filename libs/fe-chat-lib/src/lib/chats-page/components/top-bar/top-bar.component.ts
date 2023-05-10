import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserStoreService } from '@share-lib';

@Component({
  selector: 'fe-chat-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _userStore = inject(UserStoreService);
  private readonly _userService = inject(UserService);

  username$ = this._userStore.username$;
  isFetchingDetails$ = this._userService.isFetchingDetails$;

  ngOnInit() {
    this._userService.getMyDetails().subscribe();
  }

  logout() {
    this._router.navigate(['/']);
  }
}
