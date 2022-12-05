import { Pipe, PipeTransform } from '@angular/core';
import { Beverage } from '../interfaces/beverage';
import { AlcoholService } from '../services/alcohol.service';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {
  constructor(private alcohol: AlcoholService) {}

  transform(beverages: Beverage[]): string {
    let units = 0;

    for (const beverage of beverages) {
      units += this.alcohol.calculateUnitFromAlcoholabv(beverage.amount, beverage.abv);
    }

    return units.toFixed(2);
  }

}
