import { Component, OnInit } from '@angular/core';
import { Beverage } from 'src/app/interfaces/beverage';
import { Party } from 'src/app/interfaces/party';
import { Message } from 'src/app/models/message';
import { AlcoholService } from 'src/app/services/alcohol.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  baseParty = {
    start: new Date().getTime(),
    name: "Don Fernando",
    gender: false,
    weight: 60,
    consumption: new Array<Beverage>(),
    showInfo: true,
    showDrinkBox: true,
    showChatBox: true,
    messages: new Array<Message>()
  };
  myParty = JSON.parse(JSON.stringify(this.baseParty)) as Party;

  constructor(private alcoholService: AlcoholService) { }

  ngOnInit(): void {
    this.myParty = this.getParty();

    if (this.calculatePermille() <= 0) {
      this.storeParty();

      const baseParty = JSON.parse(JSON.stringify(this.baseParty));
      this.myParty.start = baseParty.start;
      this.myParty.consumption = baseParty.consumption;
      this.myParty.messages = baseParty.messages;
    }

  }

  calculatePermille(): number {
    let totalUnits = 0;

    for (const drink of this.myParty.consumption) {
      totalUnits += this.alcoholService.calculateUnitFromAlcoholabv(drink.amount, drink.abv);
    }

    if (totalUnits <= 0) {
      return 0;
    }

    const minutes = (new Date().getTime() - this.myParty.start) / 60000;

    return this.alcoholService.calculatePerMille(totalUnits, minutes, this.myParty.weight, this.myParty.gender);
  }

  getSoberTime(): string {
    return this.alcoholService.getEstimatedSoberTime(this.calculatePermille()).toISOString();
  }

  getWarningLevel(): string {
    return this.alcoholService.getWarningLevel(this.calculatePermille());
  }

  storeParty(): void {
    if (this.myParty?.consumption?.length <= 0) {
        return;
    }

    const storage = localStorage.getItem("partyArray");
    let partyArray = new Array();

    if (storage) {
      try {
        partyArray = JSON.parse(storage) as Party[];
      } catch (e) {
        throw (e);
      }
    } else {
      partyArray = new Array();
    }

    if (partyArray?.some(x => x.start === this.myParty.start)) {
      return;
    }

    partyArray.unshift(JSON.parse(JSON.stringify(this.myParty)));

    localStorage.setItem("partyArray", JSON.stringify(partyArray));
  }

  getParty(): Party {
    const storage = localStorage.getItem("myParty");

    if (storage) {
      try {
        return JSON.parse(storage) as Party;
      } catch {
        return JSON.parse(JSON.stringify(this.baseParty));
      }
    }

    return  JSON.parse(JSON.stringify(this.baseParty));
  }


  setParty(party: Party): void {
    localStorage.setItem("myParty", JSON.stringify(party));
  }

}
