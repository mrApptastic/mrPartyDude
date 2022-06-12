import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/interfaces/party';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.scss']
})
export class PartyListComponent implements OnInit {
  partyArray: Party[];

  constructor() {}

  ngOnInit(): void {
    const storage = localStorage.getItem("partyArray");

    if (storage) {
      try {
        this.partyArray = JSON.parse(storage) as Party[];
      } catch (e) {
        this.partyArray = new Array();
      }
    } else {
      this.partyArray = new Array();
    }
    console.log(this.partyArray);
  }
}
