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
        this.partyArray = (JSON.parse(storage) as Party[]).sort(function(a, b) {
          return b.start - a.start;
        });
      } catch (e) {
        this.partyArray = new Array();
      }
    } else {
      this.partyArray = new Array();
    }
    console.log(this.partyArray);
  }

  getUniqueParticipants(party: Party): number {
    if (party) {
      const ids = party?.messages?.map(x => x.clientuniqueid);
      const unique = [...new Set(ids)];

      return unique?.length;
    }

    return 0;
  }
}
