import logger from "./logger";
import { Game } from "./application/Game";
import { Dice, Player } from "./application/Player";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  SocketEvents
} from "./socket-events";
import { Server, Socket } from "socket.io";
import { Tax } from "./application/fields/Tax";
import { PropertyField } from "./application/fields/porperty-fields/PropertyField";
import { BaseField, Position } from "./application/fields/BaseField";
import express from "express";
import cors from "cors";
import http from "http";


class SocketHandler {
  private readonly socket: Socket;

  public constructor(socket: Socket) {
    this.socket = socket;
  }

  public onDisconnect(reason: string): void {
    logger.warning(`Player with socket ID "${this.socket.id}" disconnected from the server`);
    logger.warning(`Reason: ${reason.toUpperCase()}`);
    this.socket.broadcast.emit(`${this.socket.data.playerName} вышел из игры`);

  }

  public onEndStep(): void {
    const player: Player = Game.getPlayer(this.socket);
    player.endStep();
  }

  public onRegister({ nickname, room }: { nickname: string, room: string }): void {
    this.socket.join(room);
    const game: Game = Game.getInstance(room);
    const player: Player = game.createPlayer(this.socket, nickname);
    game.loggedIn += 1;
    player.sendMessage(`${player.name} присоединился к игре ${room}!`);
    game.sendState();
    player.sendOffer({
      options: ["Готов!"],
      events: [SocketEvents.READY],
      msg: "Когда все игроки будут готовы, игра начнется"
    });
  }

  public onReady(): void {
    logger.info("ready");
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    game.sendState();
    game.ready += 1;
    player.sendMessage(`${player.name} готов (${game.ready}/${game.loggedIn})!`);
    player.sendOk();
    if (game.ready === game.loggedIn) {
      game.start();
    }
  }

  public onNextStep(): void {
    const prevPlayer: Player = Game.getPlayer(this.socket);
    prevPlayer.sendOk();
    const game: Game = Game.getInstance(prevPlayer.room);
    game.sendState();
    const player: Player = game.getNextPlayer();
    if (player.inJail && player.spentInJail < 3) {
      player.sendOffer({
        options: ["Заплатить 50₽", "Бросить кубики"],
        events: [SocketEvents.PAY_FINE, SocketEvents.ROLL_DICE_IN_JAIL],
        msg: "Брось кубики или внеси залог"
      });
    } else if (player.inJail && player.spentInJail >= 3) {
      player.sendOffer({
        options: ["Заплатить 50₽"],
        events: [SocketEvents.PAY_FINE],
        msg: "Внеси залог и выйди из тюрьмы"
      });
    } else {
      player.sendOffer({
        options: ["Бросить кубики"],
        events: [SocketEvents.ROLL_DICE_DEFAULT],
        msg: "Брось кубики"
      });
    }
  }

  public onRollDiceInJail(): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    const dice: Dice = player.rollDice();
    player.sendMessage(`${player.name} выбросил ${dice.die1}:${dice.die2}`);
    game.sendState();
    if (dice.isDouble()) {
      player.inJail = false;
      player.spentInJail = 0;
      game.sendState();
      const passed = player.goOn(dice.value);
      if (passed) player.balance += 300;
      game.sendState();
      player.currentField.onStep(player);
    } else {
      player.spentInJail += 1;
      game.sendState();
      player.sendOffer({
        options: ["Завершить ход!"],
        events: [SocketEvents.NEXT_STEP],
        msg: "Заверши ход, все тебя ждут"
      });
    }
  }

  public onPayFine(): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    try {
      game.sendState();
      player.payFine();
      player.sendMessage(`${player.name} заплатил залог 50₽ и вышел из тюрьмы`);
      game.sendState();
      player.sendOk();
      player.sendOffer({
        options: ["Бросить кубики"],
        events: [SocketEvents.ROLL_DICE_DEFAULT],
        msg: "Бросай кубики"
      });
    } catch (e) {
      logger.warning(`Caught ${e.name}`);
      player.sendError("Ты не можешь заплатить залог!");

    }
  }


  public onRollDiceDefault(): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    const dice: Dice = player.rollDice();
    player.sendMessage(`${player.name} выбросил ${dice.die1}:${dice.die2}`);
    game.sendState();
    const passed = player.goOn(dice.value);
    if (passed) player.balance += 300;
    game.sendState();
    player.sendMessage(`${player.name} выбрасывает ${dice.die1}:${dice.die2} и проходит на поле ${player.currentField.name}`);
    player.currentField.onStep(player);
  }

  public onDoChanceAction(): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    if (!player.lastChanceCard) {
      logger.warning("Trying to access ChanceCard which was not picked");
      player.sendError("Карта шанс не найдена!");
      return;
    }
    player.sendOk();
    game.sendState();
    player.lastChanceCard.action(player);
  }

  public onPayTax(): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    const field: BaseField = player.currentField;
    if (!(field instanceof Tax)) throw new TypeError(`Field "${field.name}" is not a Tax!`);
    try {
      game.sendState();
      field.collectTax(player);
      game.sendState();
      player.endStep();
    } catch (e) {
      player.sendError("Ты не можешь заплатить налог");
    }
  }

  public onPayRent(): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    const field: BaseField = player.currentField;
    if (!(field instanceof PropertyField)) throw new TypeError(`Field "${field.name}" is not a property!`);
    try {
      field.collectRent(player);
      player.sendOk();
      game.sendState();
      player.sendMessage(`${player.name} заплатил ренту игроку ${field.owner.name}`);
      player.endStep();
    } catch (e) {
      logger.info(e);
      player.sendError("Ты слишком бедный, чтобы заплатить ренту!");
    }
  }

  public onSell(fieldID: Position): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    const field = game.fields[fieldID];
    try {
      game.sendState();
      player.sellField(field);
      player.sendMessage(`${player.name} продал поле ${field.name} за ${(field as PropertyField).sellCost}₽`);
      game.sendState();
    } catch (e) {
      player.sendError("Ты не можешь продать это поле!");
    }
  }


  public onBuyField(): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    const field: BaseField = player.currentField;
    try {
      player.buyField(field);
      player.sendMessage(`${player.name} купил ${field.name} за ${(field as PropertyField).buyCost}₽`);
      player.sendOk();
      game.sendState();
      player.endStep();
    } catch (e) {
      player.sendError(`Ты не можешь купить поле ${field.name}!`);
    }
  }

}

class SocketServer {
  readonly port;

  public constructor(port: number) {
    this.port = port;
  }

  /** Точка входа для всей игры */
  public init(): void {
    io.on(SocketEvents.CONNECT, (socket: Socket) => {
      logger.info(`Player with socket ID "${socket.id}" connected to server`);

      const handler: SocketHandler = new SocketHandler(socket);
      // General events
      socket.on(SocketEvents.DISCONNECT, handler.onDisconnect.bind(handler));
      socket.on(SocketEvents.REGISTER, handler.onRegister.bind(handler));
      socket.on(SocketEvents.READY, handler.onReady.bind(handler));
      socket.on(SocketEvents.NEXT_STEP, handler.onNextStep.bind(handler));
      socket.on(SocketEvents.ROLL_DICE_DEFAULT, handler.onRollDiceDefault.bind(handler));
      socket.on(SocketEvents.ROLL_DICE_IN_JAIL, handler.onRollDiceInJail.bind(handler));  // Бросить кубики, чтобы попытаться выйти из тюрьмы
      socket.on(SocketEvents.PAY_FINE, handler.onPayFine.bind(handler));  // Заплатить залог для выхода из тюрьмы
      socket.on(SocketEvents.END_STEP, handler.onEndStep.bind(handler));
      socket.on(SocketEvents.PAY_TAX, handler.onPayTax.bind(handler));  // Заплатить налог
      socket.on(SocketEvents.PAY_RENT, handler.onPayRent.bind(handler));
      socket.on(SocketEvents.DO_CHANCE_ACTION, handler.onDoChanceAction.bind(handler));
      socket.on(SocketEvents.BUY_FIELD, handler.onBuyField.bind(handler));
      socket.on(SocketEvents.SELL, handler.onSell.bind(handler));
    });

    io.listen(this.port);
    logger.info(`Server is running on PORT ${this.port}!`);
  }
}

const app: express.Express = express();
app.use(cors());
const server: http.Server = http.createServer(app);
export const io: Server = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*"
  }
});

const socketServer: SocketServer = new SocketServer(4000);
socketServer.init();
