import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlcoholService {

  constructor() { }

  calculateUnitFromAlcoholabv(liquidCl: number, abv: number): number {
    // https://vinsiderne.dk/artikler/alkohol-vol
    return liquidCl * abv * 0.7873 / 120;
  }

  calculatePerMille(units: number, minutes: number, weight: number, gender: boolean): number {
    const alcoholAmount = 12 * units;
    const bodyFactor = gender ? (weight * 0.6) : (weight * 0.7);

    return (alcoholAmount / bodyFactor) - (0.15 * (minutes / 60));

    // https://www.sundhed.dk/borger/patienthaandbogen/psyke/sygdomme/alkohol/alkoholpromille-beregning/

    // https://www.sundhed.dk/borger/patienthaandbogen/psyke/sygdomme/alkohol/alkohol-fakta/
  }
}
