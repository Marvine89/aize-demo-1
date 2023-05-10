import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/login.service';
import { untilDestroyed } from '@share-lib';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fe-auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  private readonly _untilDestroyed = untilDestroyed();
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  readonly username = signal<FormControl>(new FormControl('', [Validators.required]));
  readonly password = signal<FormControl>(new FormControl('', [Validators.required]));

  readonly hasError$ = this._authService.hasError$;
  readonly apiLoading$ = this._authService.isLoginLoading$;
  readonly usernameLoading$ = this._authService.isValidateUserLoading$;
  readonly loginEvents$ = this._authService.combineLoadingEvents$;
  readonly hasInvalidUserName = this._authService.usernameDoesNotExist;

  ngOnInit() {
    this._onUsernameChanged();
  }

  private _onUsernameChanged() {
    this.username()
      .valueChanges.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(filter(Boolean))
      .pipe(switchMap(username => this._authService.validateUsername(username)))
      .pipe(this._untilDestroyed())
      .subscribe();
  }

  submitForm(e: SubmitEvent) {
    e.preventDefault();

    this._authService
      .login(this.username().value, this.password().value)
      .pipe(filter(Boolean))
      .subscribe(() => this._router.navigate(['/chats']));
  }
}
