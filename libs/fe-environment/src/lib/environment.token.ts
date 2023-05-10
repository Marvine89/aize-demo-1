import { InjectionToken } from '@angular/core';
import { Environment } from './environment.interface';
import { environment } from './environments/environment';

export const EnvironmentToken: InjectionToken<Environment> = new InjectionToken('ENVIRONMENT', {
  providedIn: 'root',
  factory: () => environment
});
