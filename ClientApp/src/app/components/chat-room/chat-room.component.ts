import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Beverage } from 'src/app/interfaces/beverage';
import { Party } from 'src/app/interfaces/party';
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
  message = new Message();
  selectedDrink: string;
  drinks = new Array<Beverage>();
  baseParty = {
    start: new Date().getTime(),
    avatar: "data:image/png;base64,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",
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

    if (this.calculatePermille() <= 0) {
      this.storeParty();

      const baseParty = JSON.parse(JSON.stringify(this.baseParty));
      this.myParty.start = baseParty.start;
      this.myParty.consumption = baseParty.consumption;
      this.myParty.messages = baseParty.messages;
    }

    this.drinks = this.beverageService.getAll();
    if (this.drinks?.length > 0) {
      this.selectedDrink = this.drinks[0]?.name;
    }
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

  addDrink(): void {
    const drink = this.drinks.find(x => x.name === this.selectedDrink);
    if (drink) {
      this.myParty.consumption.push(drink);
      let messageText = "Jeg har indtaget en " + drink?.name + " og min promille er nu på ";
      messageText += this.calculatePermille().toFixed(3) + ".";

      this.txtMessage = messageText;
      this.sendMessage();

      setTimeout(() => {
        this.setParty(this.myParty);
      }, 400);
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
      this.message.clientuniqueid = this.myParty.start.toString();
      this.message.type = "sent";
      this.message.message = (this.myParty?.name ? (this.myParty?.name + ": ") : "") + this.txtMessage;
      this.message.date = new Date();
      this.myParty.messages.unshift(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = "";
    }
  }

  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.myParty.start.toString()) {
          message.type = "received";
          this.myParty.messages.unshift(message);
          this.setParty(this.myParty);
        }
      });
    });
  }
}
