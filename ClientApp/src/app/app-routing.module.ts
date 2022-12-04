import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarCabinetComponent } from './components/bar-cabinet/bar-cabinet.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { PartyListComponent } from './components/party-list/party-list.component';

const routes: Routes = [
  { path: '', component: ChatRoomComponent, pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'bar', component: BarCabinetComponent },
  { path: 'list', component: PartyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
