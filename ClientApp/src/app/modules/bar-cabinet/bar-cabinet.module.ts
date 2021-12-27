import { NgModule } from '@angular/core';
import { BarCabinetComponent } from './bar-cabinet.component';
import { BarCabinetRoutingModule } from './bar-cabinet-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BarCabinetRoutingModule,
    BrowserModule,
    CommonModule
  ],
  declarations: [
    BarCabinetComponent
  ]
})
export class BarCabinetModule { }
