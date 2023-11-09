import { Server } from "socket.io";
import http from "http";
import express from "express";

import cors from "cors";

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
  SUGGEST = "suggest"
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

export const app: express.Express = express();
app.use(cors());
export const server: http.Server = http.createServer(app);
export const io: Server = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});
