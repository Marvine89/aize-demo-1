import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './signup-page/signup-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginPageComponent, title: 'Login - DemoApp' },
      { path: 'signup', component: SignUpPageComponent, title: 'Sign up - DemoApp' }
    ])
  ],
  exports: [RouterModule]
})
export class FeAuthLibRoutingModule {}
