import logger from "./logger";
import { AnyField, Game } from "./application/Game";
import { Dice, Player } from "./application/Player";
import { io, SocketEvents } from "./socketEvents";
import { Socket } from "socket.io";
import { Tax } from "./application/fields/Tax";
import { PropertyField } from "./application/fields/porperty-fields/PropertyField";
import { NotEnoughMoneyError } from "./application/errors";
import { BaseField } from "./application/fields/BaseField";

class SocketHandler {
  private readonly socket: Socket;

  public constructor(socket: Socket) {
    this.socket = socket;
  }

  public onDisconnect(reason: string): void {
    const description: Map<string, string> = new Map([
      ["transport close", "The connection was closed (the user has lost connection)"],
      ["transport error", "The connection has encountered an error"],
      ["server shutting down", "The server is, well, shutting down"],
      ["ping timeout", "The client did not send a PONG packet in the pingTimeout delay"],
      ["client namespace disconnect", "The client has manually disconnected the socket using socket.disconnect()"],
      ["server namespace disconnect", "The socket was forcefully disconnected with socket.disconnect()"]
    ]);
    logger.warning(`Player with socket ID "${this.socket.id}" disconnected from the server`);
    logger.warning(`${reason.toUpperCase()}: ${description.get(reason)}`);
    const player: Player = Game.getPlayer(this.socket);
    player.sendMessage(`${player.name} вышел из игры ${player.room}`);
  }

  public onRegister({ nickname, room }: { nickname: string, room: string }): void {
    this.socket.join(room);
    const game: Game = Game.getInstance(room);
    const player: Player = game.createPlayer(this.socket, nickname);
    game.loggedIn += 1;
    player.sendMessage(`${player.name} присоединился к игре ${room}!`);
    this.socket.emit(SocketEvents.SUGGEST, {
      options: ["Готов!"],
      events: [SocketEvents.READY],
      msg: "Когда все игроки будут готовы, игра начнется"
    });
  }

  public onReady(): void {
    const player: Player = Game.getPlayer(this.socket);
    const game: Game = Game.getInstance(player.room);
    game.ready += 1;
    player.sendMessage(`${player.name} готов (${game.ready}/${game.loggedIn})!`);
    player.sendOk()
    if (game.ready === game.loggedIn) {
      game.start();
    }
  }

  public onNextStep(): void {
    const prevPlayer: Player = Game.getPlayer(this.socket)
    prevPlayer.sendOk()
    const game: Game = Game.getInstance(prevPlayer.room);
    const player: Player = game.getNextPlayer();
    if (player.inJail && player.spentInJail < 3) {
      player.sendOffer({
        options: ["Заплатить 50", "Бросить кубики"],
        events: [SocketEvents.PAY_FINE, SocketEvents.ROLL_DICE_IN_JAIL],
        msg: "Бросьте кубики или заплатите выкуп"
      });
    } else if (player.inJail && player.spentInJail >= 3) {
      player.sendOffer({
        options: ["Заплатить 50"],
        events: [SocketEvents.PAY_FINE],
        msg: "Заплати выкуп и выйди из тюрьмы"
      });
    } else {
      player.sendOffer({
        options: ["Бросить кубики"],
        events: [SocketEvents.ROLL_DICE_DEFAULT],
        msg: "Бросьте кубики"
      });
    }
  }

  public onRollDiceInJail(): void {
    const player: Player = Game.getPlayer(this.socket);
    const dice: Dice = player.rollDice();
    if (dice.isDouble()) {
      player.inJail = false;
      player.spentInJail = 0;
      player.goOn(dice.value);
      player.currentField.onStep(player);
    } else {
      player.spentInJail += 1;
      player.sendOffer({
        options: ["Завершить ход!"],
        events: [SocketEvents.NEXT_STEP],
        msg: "Заверши ход"
      });
    }
  }

  public onPayFine(): void {
    const player: Player = Game.getPlayer(this.socket);
    try {
      player.payFine();
      player.sendOk();
    } catch (e) {
      logger.info(`Caught ${e.name}`);
      if (e instanceof NotEnoughMoneyError) {
        player.sendError("Ты слишком бедный, чтобы купить это!");
      } else {
        logger.info(`Unexpected error: ${e.message}`);
      }
    }
    player.sendMessage(`${player.name} заплатил залог 50 и вышел из тюрьмы`);
    player.sendOffer({
      options: ["Бросить кубики"],
      events: [SocketEvents.ROLL_DICE_DEFAULT],
      msg: "Бросай кубики"
    });
  }

  public onRollDiceDefault(): void {
    const player: Player = Game.getPlayer(this.socket);
    const dice: Dice = player.rollDice();
    player.goOn(dice.value);
    player.sendMessage(`${player.name} выбрасывает ${dice.die1}:${dice.die2} и проходит на поле ${player.currentField.name}`);
    player.currentField.onStep(player);
  }

  public onDoChanceAction(): void {
    const player: Player = Game.getPlayer(this.socket);
    if (!player.lastChanceCard) {
      logger.warning("Trying to access ChanceCard which was not picked");
      player.sendError("Карта шанс не найдена!");
      return;
    }
    player.sendOk()
    player.lastChanceCard.action(player);
  }

  public onPayTax(): void {
    const player: Player = Game.getPlayer(this.socket);
    const field: BaseField = player.currentField;
    if (!(field instanceof Tax)) throw new TypeError(`Field "${field.name}" is not a Tax!`);
    field.collectTax(player);
    player.endStep();
  }

  public onPayRent(): void {
    const player: Player = Game.getPlayer(this.socket);
    const field: BaseField = player.currentField;
    if (!(field instanceof PropertyField)) throw new TypeError(`Field "${field.name}" is not a property!`);
    try {
      field.collectRent(player);
      player.sendOk()
      player.sendMessage(`${player.name} заплатил ренту игроку ${field.owner.name}`);
      player.endStep();
    } catch (e) {
      logger.info(e)
      player.sendError("Ты слишком бедный, чтобы заплатить ренту!");
    }
  }

  public onBuyField(): void {
    const player: Player = Game.getPlayer(this.socket);
    const field: BaseField = player.currentField;
    try {
      player.buyField(field);
      player.sendMessage(`${player.name} купил ${field.name} за ${(field as PropertyField).buyCost}`);
      player.sendOk()
      player.endStep();
    } catch (e) {
      player.sendError(e.message);
    }
  }

  // public onUp(): void {
  //   const player: Player = Game.getPlayer(this.socket);
  //
  //   // TODO
  // }
  //
  // public onReject(): void {
  //   // TODO
  // }
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
      // On step events
      socket.on(SocketEvents.PAY_TAX, handler.onPayTax.bind(handler));  // Заплатить налог
      socket.on(SocketEvents.PAY_RENT, handler.onPayRent.bind(handler));
      socket.on(SocketEvents.DO_CHANCE_ACTION, handler.onDoChanceAction.bind(handler));
      socket.on(SocketEvents.BUY_FIELD, handler.onBuyField.bind(handler));
      // Auction Events
      // socket.on(AuctionSocketEvents.UP, handler.onUp.bind(handler));  // Поднять цену в аукционе
      // socket.on(AuctionSocketEvents.REJECT, handler.onReject.bind(handler));  // Выйти из аукциона
    });

    io.listen(this.port);
    logger.info(`Server is running on PORT ${this.port}!`);
  }
}

const socketServer: SocketServer = new SocketServer(4000);
socketServer.init();
