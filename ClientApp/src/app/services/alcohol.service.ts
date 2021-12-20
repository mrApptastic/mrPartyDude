import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlcoholService {

  constructor() { }

  calculatePerMille(units: number, minutes: number, gender: boolean ): number {
    // https://www.sundhed.dk/borger/patienthaandbogen/psyke/sygdomme/alkohol/alkoholpromille-beregning/

    // https://www.sundhed.dk/borger/patienthaandbogen/psyke/sygdomme/alkohol/alkohol-fakta/
    return 0;
  }
}
