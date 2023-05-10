import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/login.service';
import { untilDestroyed } from '@share-lib';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fe-auth-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpPageComponent implements OnInit {
  private readonly _untilDestroyed = untilDestroyed();
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  readonly username = new FormControl('', [Validators.required]);
  readonly password = new FormControl('', [Validators.required]);
  readonly confirmPassword = new FormControl('', [Validators.required]);
  readonly invalidPassword = signal<boolean>(false);

  readonly hasError$ = this._authService.hasError$;
  readonly isLoginLoading$ = this._authService.isLoginLoading$;
  readonly apiLoading$ = this._authService.combineLoadingEvents$;
  readonly usernameLoading$ = this._authService.isValidateUserLoading$;
  readonly hasInvalidUserName = this._authService.usernameExist;

  ngOnInit() {
    this._onUsernameChanged();
    this._onPasswordChanged();
  }

  private _onUsernameChanged() {
    this.username.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(filter(Boolean))
      .pipe(switchMap(username => this._authService.validateUsername(username)))
      .pipe(this._untilDestroyed())
      .subscribe();
  }

  private _onPasswordChanged() {
    combineLatest([this.password.valueChanges, this.confirmPassword.valueChanges])
      .pipe(map(([password, confirmPassword]) => password !== confirmPassword || Number(password?.length) < 6))
      .pipe(this._untilDestroyed())
      .subscribe(isInvalid => this.invalidPassword.set(isInvalid));
  }

  submitForm(e: SubmitEvent) {
    e.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    const confirmPassword = this.confirmPassword.value;
    if (!username || !password || !confirmPassword) return;

    this._authService
      .signup(username, password, confirmPassword)
      .pipe(filter(Boolean))
      .subscribe(() => this._router.navigate(['/login']));
  }
}
