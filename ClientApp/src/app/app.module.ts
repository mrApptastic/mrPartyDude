import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { MrMr2Module } from 'mr-mr2';
import { BarCabinetComponent } from './components/bar-cabinet/bar-cabinet.component';
import { ChatService } from './services/chat-service';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { PartyListComponent } from './components/party-list/party-list.component';
import { InfoComponent } from './components/info/info.component';


@NgModule({
  declarations: [
    AppComponent,
    BarCabinetComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ChatRoomComponent,
    PartyListComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MrMr2Module,
    ToastrModule.forRoot()
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
