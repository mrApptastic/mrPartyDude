import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarCabinetComponent } from './bar-cabinet.component';

const routes: Routes = [
  {
    path: '',
    component: BarCabinetComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarCabinetRoutingModule {}
