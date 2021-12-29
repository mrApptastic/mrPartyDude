import { Component, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/interfaces/message';
import { ChatService } from 'src/app/services/chat-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  txtMessage = "";
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();

  constructor(private toastr: ToastrService, private chatService: ChatService,
    private _ngZone: NgZone) {
      this.subscribeToEvents();
    }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = "";
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = "received";
          this.messages.push(message);
        }
      });
    });
  }
}
