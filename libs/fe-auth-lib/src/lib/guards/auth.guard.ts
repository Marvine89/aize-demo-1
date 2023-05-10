import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@share-lib';


export const authGuard = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.token) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
