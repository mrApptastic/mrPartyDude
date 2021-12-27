import { Injectable } from '@angular/core';
import { Beverage } from '../interfaces/beverage';

@Injectable({
  providedIn: 'root'
})
export class BeverageService {
  baseList = [
    { name : "Carlberg Pilsner", amount: 0.333333333, abv: 4.6, description: "Carlsberg Pilsner er en pilsnerøl fra Carlsberg som blev introduceret i 1904. Den omtales ofte ved sit kælenavn HOF. Etiketten til ølflaskerne er oprindeligt tegnet af Thorvald Bindesbøll i 1904 og er stort set uforandret siden sin introduktion", type : "Øl", subType : "Pilsner", manufacturer : "Carlsberg", country : "Danmark", image: "", rating: null },
    { name : "Ale no. 16", amount: 0.5, abv: 5.7, description: "Ale No. 16 fra Bryggeriet Refsvindinge er en mørk, overgæret guldøl. Den delikate øl har en maltet smag med et strejf af nødder, en let ristet aroma og en tilpas sødme, som tilsammen skaber en skøn smagssymfoni.", manufacturer : "Bryggeriet Refsvindinge", type : "Øl", subType : "Ale", country : "Danmark", image: "", rating: null },
    { name : "Weihenstephaner Hefe weissbier", amount: 0.5, abv: 5.4, description: "En gylden og let uklar hvedeøl med et vedholdende og højtstående hvidt skum. Duften er klassisk med tydelige aromaer af hvede og krydderier. Smagen er behagelig, rund og blød. En behagelig og fuldstændig klassisk tysk hvedeøl.", type : "Øl", subType : "Hvedeøl", manufacturer : "Bayerische Staatsbrauerei Weihenstephan", country : "Tyskland", image: "", rating: null },
    { name : "De Koninck", amount: 0.25, abv: 5, description: "De Koninck er en \"Special Belge\" øl med en fin gul farve, let at drikke. Ølen er meget populær i regionen omkring Antwerpen, hvor den almindeligvis betegnes som en \"Bolleke\" (lille bold) på grund af den runde form af glasset, den serveres i.", type : "Øl", subType : null, manufacturer : "De Koninck Antwerpse Stadsbrouwerij", country : "Belgien", image: "", rating: null },
    { name : "Golden Champion", amount: 0.5, abv: "5", description: "", type : "Ale", subType : "Pilsner", manufacturer : "Badger Brewery", country : "England", image: "", rating: null }
  ] as Beverage[];

  constructor() { }
}
