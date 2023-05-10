import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperPageComponent } from './shared/wrapper-page/wrapper-page.component';
import { FeAuthLibRoutingModule } from './fe-auth-lib-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PushModule } from '@rx-angular/template/push';
import { IfModule } from '@rx-angular/template/if';
import { PasswordModule } from 'primeng/password';
import { FeTranslationDropdownComponent } from '@fe-translation-lib';
import { FeEnvironmentModule } from '@fe-environment';
import { AuthService } from './services/login.service';
import { SignUpPageComponent } from './/signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UsernameInputComponent } from './shared/username-input/username-input.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    PushModule,
    IfModule,
    PasswordModule,
    InputTextModule,
    TranslateModule,
    ReactiveFormsModule,
    FeEnvironmentModule,
    ProgressSpinnerModule,
    FeAuthLibRoutingModule,
    FeTranslationDropdownComponent
  ],
  declarations: [WrapperPageComponent, SignUpPageComponent, LoginPageComponent, UsernameInputComponent],
  providers: [AuthService]
})
export class FeAuthLibModule {}
