import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from './environments/environment';
import { EnvironmentToken } from './environment.token';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: EnvironmentToken,
      useValue: environment
    }
  ]
})
export class FeEnvironmentModule {}
