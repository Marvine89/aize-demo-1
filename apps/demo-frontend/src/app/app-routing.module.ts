import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from '@fe-auth-lib';

const rootRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@fe-auth-lib').then(m => m.FeAuthLibModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('@fe-chat-lib').then(m => m.FeChatLibModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
