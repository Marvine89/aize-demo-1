import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatsPageComponent } from './chats-page/chats-page.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: ChatsPageComponent, title: 'Chats - DemoApp' }])],
  exports: [RouterModule]
})
export class FeChatLibRoutingModule {}
