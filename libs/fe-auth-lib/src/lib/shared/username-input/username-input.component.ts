import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Signal,
  SimpleChanges,
  inject,
  signal
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'fe-auth-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsernameInputComponent implements OnChanges {
  @Input() username!: FormControl;
  @Input() type!: 'login' | 'signup';

  private readonly _authService = inject(AuthService);
  readonly isLoginLoading$ = this._authService.isLoginLoading$;
  readonly buttonDisabled$ = this._authService.combineLoadingEvents$;
  readonly usernameLoading$ = this._authService.isValidateUserLoading$;
  readonly hasInvalidUserName = signal<Signal<boolean>>(signal(false));

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']?.currentValue) this._assignInvalidUserName();
  }

  private _assignInvalidUserName() {
    this.hasInvalidUserName.set(
      this.type === 'login' ? this._authService.usernameDoesNotExist : this._authService.usernameExist
    );
  }
}
