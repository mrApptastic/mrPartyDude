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
    console.log(this.drinks);
  }

  addNewDrink() {
    this.drinkResponsible.update({
      id: 0,
      name: "",
      abv: 0,
      amount: 0,
      description: "",
      type: "",
      subType: "",
      manufacturer: "",
      country: "",
      image: "",
      rating: 0
    })

    this.drinks = this.drinkResponsible.getAll();
  }

  updateDrink(drink: Beverage) {
    this.drinkResponsible.update(drink);
  }

  deleteDrink(drink: Beverage) {
    this.drinkResponsible.delete(drink.id);

    this.drinks = this.drinkResponsible.getAll();
  }
}
