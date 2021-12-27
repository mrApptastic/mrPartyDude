import { NgModule } from '@angular/core';
import { BarCabinetComponent } from './bar-cabinet.component';
import { BarCabinetRoutingModule } from './bar-cabinet-routing.module';

@NgModule({
  imports: [
    BarCabinetRoutingModule
  ],
  declarations: [
    BarCabinetComponent
  ]
})
export class BarCabinetModule { }
