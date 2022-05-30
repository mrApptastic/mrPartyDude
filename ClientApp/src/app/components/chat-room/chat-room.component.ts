import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Beverage } from 'src/app/interfaces/beverage';
import { Message } from 'src/app/models/message';
import { AlcoholService } from 'src/app/services/alcohol.service';
import { BeverageService } from 'src/app/services/beverage.service';
import { ChatService } from 'src/app/services/chat-service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
})
export class ChatRoomComponent implements OnInit {
  txtMessage = "";
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();
  selectedDrink: string;
  drinks: Beverage[] = new Array();
  baseParty = {
    start: new Date().getTime(),
    name: "Buddy",
    gender: false,
    weight: 60,
    consumption:  new Array(),
    showInfo: true,
    showDrinkBox: true,
    showChatBox: true
  };
  myParty = JSON.parse(JSON.stringify(this.baseParty));

  constructor(private toastr: ToastrService,
    private chatService: ChatService,
    private _ngZone: NgZone,
    private beverageService: BeverageService,
    private alcoholService: AlcoholService
    ) {
      this.subscribeToEvents();
  }

  ngOnInit(): void {
    this.myParty = this.getParty();

    if (this.calculatePermille() === 0) {
      this.myParty =JSON.parse(JSON.stringify(this.baseParty));
    }

    this.drinks = this.beverageService.getAll();
    if (this.drinks?.length > 0) {
      this.selectedDrink = this.drinks[0]?.name;
    }
  }

  addDrink(): void {
    const drink = this.drinks.find(x => x.name === this.selectedDrink);
    if (drink) {
      this.myParty.consumption.push(drink);
      this.setParty(this.myParty);
      let messageText = "Jeg har indtaget en " + drink?.name + " og min promille er nu på ";
      messageText += this.calculatePermille().toFixed(3);

      this.txtMessage = messageText;
      this.sendMessage();
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

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = (this.myParty?.name ? (this.myParty?.name + ": ") : "") + this.txtMessage;
      this.message.date = new Date();
      this.messages.unshift(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = "";
    }
  }

  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = "received";
          this.messages.unshift(message);
        }
      });
    });
  }
}

interface Party {
  start: number;
  name: string;
  gender: boolean;
  weight: number;
  consumption: Beverage[];
  showInfo: boolean;
  showDrinkBox: boolean;
  showChatBox: boolean;
}
