import { Message } from "../models/message";
import { Beverage } from "./beverage";

export interface Party {
  start: number;
  name: string;
  gender: boolean;
  weight: number;
  consumption: Beverage[];
  showInfo: boolean;
  showDrinkBox: boolean;
  showChatBox: boolean;
  messages: Message[];
}
