import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarCabinetComponent } from './components/bar-cabinet/bar-cabinet.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: ChatRoomComponent, pathMatch: 'full' },
  { path: 'bar', component: BarCabinetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
