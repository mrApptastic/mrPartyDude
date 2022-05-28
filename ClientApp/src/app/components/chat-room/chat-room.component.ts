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
  myConsumption : Beverage[] = new Array();
  myStart: number = new Date().getTime();
  myName = "Buddy";
  myGender = false;
  myWeight = 60;
  showInfo = true;
  showDrinkBox = true;
  showChatBox = true;

  constructor(private toastr: ToastrService,
    private chatService: ChatService,
    private _ngZone: NgZone,
    private beverageService: BeverageService,
    private alcoholService: AlcoholService
    ) {
      this.subscribeToEvents();
  }

  ngOnInit(): void {
    this.drinks = this.beverageService.getAll();
    if (this.drinks?.length > 0) {
      this.selectedDrink = this.drinks[0]?.name;
    }
  }

  addDrink(): void {
    const drink = this.drinks.find(x => x.name === this.selectedDrink);
    if (drink) {
      this.myConsumption.push(drink);
      let messageText = "Jeg har indtaget en " + drink?.name + " og min promille er nu på ";
      messageText += this.calculatePermille().toFixed(3);

      this.txtMessage = messageText;
      this.sendMessage();
    }
  }

  calculatePermille(): number {
    let totalUnits = 0;

    for (const drink of this.myConsumption) {
      totalUnits += this.alcoholService.calculateUnitFromAlcoholabv(drink.amount, drink.abv);
    }

    if (totalUnits <= 0) {
      return 0;
    }

    const minutes = (new Date().getTime() - this.myStart) / 60000;

    return this.alcoholService.calculatePerMille(totalUnits, minutes, this.myWeight, this.myGender);
  }

  getName(): string {
    return localStorage.getItem("myName");
  }

  setName(name: string): void {
    localStorage.setItem("myName", name);
  }

  getWeight(): string {
    return localStorage.getItem("myName");
  }

  etWeight(name: string): void {
    localStorage.setItem("myName", name);
  }

  changeWeight(): void {
    this.myWeight = parseFloat(localStorage.getItem("myName"));
  }

  changeGender(): void {
    this.myGender = localStorage.getItem("myGender").toLowerCase() === "true";
  }


  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = (this.myName ? (this.myName + ": ") : "") + this.txtMessage;
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
