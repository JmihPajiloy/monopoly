import { Socket } from "socket.io";
import { Position } from "./application/fields/BaseField";


/** Все ивенты, которые может обрабатывать сервер
 * @constant CONNECT - подключение к серверу
 * @constant DISCONNECT - отключение от сервера
 * @constant REGISTER - регистрация (ввод ника)
 * */
export enum SocketEvents {
  BUY_FIELD = "buy-field",
  CONNECT = "connection",
  DISCONNECT = "disconnect",
  DO_CHANCE_ACTION = "do-chance-action",
  END_STEP = "end-step",
  ERROR = "error",
  GAME_STATE = "game-state",
  MESSAGE = "message",
  NEXT_STEP = "next-step",
  OK = "ok",
  PAY_FINE = "pay-fine",
  PAY_RENT = "pay-rent",
  PAY_TAX = "pay-tax",
  READY = "ready",
  REGISTER = "register",
  ROLL_DICE_DEFAULT = "roll-dice:default",
  ROLL_DICE_IN_JAIL = "roll-dice:in-jail",
  SEND_ON_AUCTION = "send-on-auction",
  SUGGEST = "suggest",
  SELL = "sell"
}


/** На фронтенде создается окно с кнопками из `options`. При нажатии на кнопку выполняется соответствующий ивент из `events` */
export interface Offer {
  options: string[];
  events: string[];
  msg: string;
}

export interface Message {
  msg: string;
  time: string;
}

export interface ServerToClientEvents {
  "error": (errorMessage: string) => void,
  // "game-state": { ... },
  "message": (message: Message) => void,
  "ok": () => void,
  "suggest": (offer: Offer) => void,
}

export interface ClientToServerEvents {
  "buy-field": () => void;
  "connection": (socket: Socket) => void,
  "disconnect": (reason: string) => void,
  "do-chance-action": () => void,
  "end-step": () => void,
  "next-step": () => void,
  "pay-fine": () => void,
  "pay-rent": () => void,
  "pay-tax": () => void,
  "ready": () => void,
  "register": ({ nickname, room }: { nickname: string, room: string }) => void,
  "roll-dice:default": () => void,
  "roll-dice:in-jail": () => void,
  "send-on-auction": () => void,
  "sell": (fieldID: Position) => void
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  playerName: string;
}

