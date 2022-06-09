import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlcoholService {

  constructor() { }

  calculateUnitFromAlcoholabv(liquidCl: number, abv: number): number {
    // https://vinsiderne.dk/artikler/alkohol-vol
    return (liquidCl * abv * 0.7873 / 120) * 100;
  }

  calculatePerMille(units: number, minutes: number, weight: number, gender: boolean): number {
    const alcoholAmount = 12 * units;
    const bodyFactor = gender ? (weight * 0.6) : (weight * 0.7);

    return (alcoholAmount / bodyFactor) - (0.15 * (minutes / 60));

    // https://www.sundhed.dk/borger/patienthaandbogen/psyke/sygdomme/alkohol/alkoholpromille-beregning/

    // https://www.sundhed.dk/borger/patienthaandbogen/psyke/sygdomme/alkohol/alkohol-fakta/
  }

  getEstimatedSoberTime(permille: number): Date {
    const ms = (permille / 0.15) * 3600000;
    return new Date(new Date().getTime() + ms);
  }

  getWarningLevel(permille: number): string {
    if (permille <= 0.2) {
      return "Du er ædru - eller så godt som."
    } else if (permille <= 0.5) {
      return "Dine øjnes evne til hurtigt at fokusere og omstille sig fra lys til mørke er forringet."
    } else if (permille <= 0.8) {
      return "Din evne til på en gang at opfatte situationer og samtidigt udføre præcise bevægelser er forringet og din synsvinkel indsnævret."
    } else if (permille <= 1.0) {
      return "Du har nedsat koordinationsevne og øget reaktionstid."
    } else if (permille <= 1.5) {
      return "Din opmærksomhed samt koncentrationsevne er svækket. Du begynder at blive træt og får nedsat balance- og bevægelsesevner."
    } else if (permille <= 2.0) {
      return "Advarsel: Du har udtalt forringet bevægelsesevne og talebesvær. Centralnervesystemet har fået nok."
    } else if (permille <= 3.0) {
      return "Advarsel: Du har udtalte forgiftningssymptomer samt manglende selvkontrol."
    } else if (permille <= 4.0) {
      return "Advarsel: Du har manglende kontrol med for urinblæren og kan blive bevidstløs."
    } else {
      return "Advarsel: Bevidstløshed og livsfare!"
    }
    // https://netdoktor.dk/sunderaad/fakta/alkohol.htm
  }
}
