import { Component, OnInit } from '@angular/core';
import { Beverage } from 'src/app/interfaces/beverage';
import { BeverageService } from 'src/app/services/beverage.service';

@Component({
  selector: 'app-BarCabinet',
  templateUrl: './bar-cabinet.component.html',
  styleUrls: ['./bar-cabinet.component.scss']
})
export class BarCabinetComponent implements OnInit {
  drinks: Beverage[];

  constructor(private drinkResponsible: BeverageService) {}

  ngOnInit(): void {
    this.drinks = this.drinkResponsible.getAll();
  }
}
