import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Beverage } from '../interfaces/beverage';

@Injectable({
  providedIn: 'root'
})
export class BeverageService {
  baseStorage = "beverageStorage";
  baseList = [
    { id: 1, name : "Carlberg Pilsner", amount: 0.333333333, abv: 4.6, description: "Carlsberg Pilsner er en pilsnerøl fra Carlsberg som blev introduceret i 1904. Den omtales ofte ved sit kælenavn HOF. Etiketten til ølflaskerne er oprindeligt tegnet af Thorvald Bindesbøll i 1904 og er stort set uforandret siden sin introduktion", type : "Øl", subType : "Pilsner", manufacturer : "Carlsberg", country : "Danmark", image: "", rating: null },
    { id: 2, name : "Ale no. 16", amount: 0.5, abv: 5.7, description: "Ale No. 16 fra Bryggeriet Refsvindinge er en mørk, overgæret guldøl. Den delikate øl har en maltet smag med et strejf af nødder, en let ristet aroma og en tilpas sødme, som tilsammen skaber en skøn smagssymfoni.", manufacturer : "Bryggeriet Refsvindinge", type : "Øl", subType : "Ale", country : "Danmark", image: "", rating: null },
    { id: 3, name : "Weihenstephaner Hefe weissbier", amount: 0.5, abv: 5.4, description: "En gylden og let uklar hvedeøl med et vedholdende og højtstående hvidt skum. Duften er klassisk med tydelige aromaer af hvede og krydderier. Smagen er behagelig, rund og blød. En behagelig og fuldstændig klassisk tysk hvedeøl.", type : "Øl", subType : "Hvedeøl", manufacturer : "Bayerische Staatsbrauerei Weihenstephan", country : "Tyskland", image: "", rating: null },
    { id: 4, name : "De Koninck", amount: 0.25, abv: 5, description: "De Koninck er en øl med en fin gul farve, der er let at drikke. Øllen er meget populær i regionen omkring Antwerpen, hvor den almindeligvis betegnes som en \"Bolleke\" (lille bold) på grund af den runde form af glasset, den serveres i.", type : "Øl", subType : null, manufacturer : "De Koninck Antwerpse Stadsbrouwerij", country : "Belgien", image: "", rating: null },
    { id: 5, name : "Golden Champion", amount: 0.5, abv: "5", description: "", type : "Ale", subType : "Pilsner", manufacturer : "Badger Brewery", country : "England", image: "", rating: null }
  ] as Beverage[];

  constructor(private toastr: ToastrService) { }

  getAll(): Beverage[] {
    const storage = JSON.parse(localStorage.getItem(this.baseStorage));

    if (storage) {
      return storage;
    }

    localStorage.setItem(this.baseStorage, JSON.stringify(this.baseList));

    return this.baseList;
  }

  update(drink: Beverage): Beverage {
    const list = this.getAll();

    if (drink.id > 0) {

      const item = list.find(x => x.id === drink.id);
      if (item) {
        item.abv = drink.abv;
        item.amount = drink.amount;
        item.country = drink.country;
        item.description = drink.description;
        item.image = drink.image;
        item.manufacturer = drink.manufacturer;
        item.name = drink.name;
        item.rating = drink.rating;
        item.subType = drink.subType;
        item.type = drink.type;
        localStorage.setItem(this.baseStorage, JSON.stringify(list));
        return item;
      } else {
        this.toastr.error("Fejl", "Den efterspurgte drink eksisterer ikke!");
      }
    } else {
      drink.id = Math.max(...list.map(x => x.id), 0) + 1;
      list.push(drink);
      localStorage.setItem(this.baseStorage, JSON.stringify(list));
      return drink;
    }
  }

  delete(id: number): void {
    const list = this.getAll();
    const index = list.findIndex(x => x.id === id);
    if (index > -1) {
      list.splice(index, 1);
      localStorage.setItem(this.baseStorage, JSON.stringify(list));
    } else {
      this.toastr.error("Fejl", "Den efterspurgte drink eksisterer ikke!");
    }
  }


}
