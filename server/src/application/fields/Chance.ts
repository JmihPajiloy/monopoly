import { Player } from "../Player";
import { BaseField, Position } from "./BaseField";
import { SocketEvents } from "../../socket-events";
import { Game } from "../Game";

export interface ChanceCard {
  action: (p: Player) => void;
  msg: string;
}

export interface ChanceConstructorObject {
  pos: Position;
}

export class Chance extends BaseField {
  private static cards: ChanceCard[] = [
    {
      action: (player: Player): void => {
        const game = Game.getInstance(player.room);
        player.goTo(0);
        player.balance += 300;
        player.sendMessage(`${player.name} прошел на поле старт и получил 300₽`);
        game.sendState()
        player.endStep()
      },
      msg: "Игрок переходит на поле Старт и получает 300₽"
    },
    {
      action: (player: Player) => {
        const game = Game.getInstance(player.room);
        const hasPassed = player.goTo(24);
        if (hasPassed) {
          player.balance += 300;
          game.sendState()
          player.sendMessage(`${player.name} прошел на Парковый проспект и получил 300₽ за прохождение круга`);
        } else {
          game.sendState()
          player.sendMessage(`${player.name} прошел на Парковый проспект`);
        }
        game.fields[24].onStep(player);
      },
      msg: "Иди на парковый проспект и получи 300₽, если прошел круг"
    },
    {
      action: (player: Player): void => {
        const game = Game.getInstance(player.room);
        game.sendState()
        player.goOn(-3);
        player.sendMessage(`${player.name} прошел на 3 поля назад и попал на поле ${player.currentField.name}`);
        game.sendState()
        player.currentField.onStep(player)
      },
      msg: "Проходи на 3 поля назад"
    },
    {
      action: (player: Player): void => {
        const game = Game.getInstance(player.room);
        game.sendState()
        player.balance -= 15
        player.sendMessage(`${player.name} заплатил налог на бедность 15₽`);
        game.sendState()
        player.endStep()
      },
      msg: "Заплати налог на бедность 15₽"
    },
    {
      action: (player: Player): void => {
        const game = Game.getInstance(player.room);
        game.sendState()
        player.balance += 50
        player.sendMessage(`Банк выплатил ${player.name} дивиденды на сумму 50₽`);
        game.sendState()
        player.endStep()
      },
      msg: "Банк платит вам дивиденды 50₽"
    },
    {
      action: (player: Player) => {
        const game = Game.getInstance(player.room);
        const hasPassed = player.goTo(11);
        if (hasPassed) {
          player.balance += 300;
          game.sendState()
          player.sendMessage(`${player.name} прошел на ул. Маршала Рыбалко и получил 300₽ за прохождение круга`);
        } else {
          game.sendState()
          player.sendMessage(`${player.name} прошел на ул. Маршала Рыбалко`);
        }
        game.fields[11].onStep(player);
      },
      msg: "Иди на ул. Маршала Рыбалко и получи 300₽, если прошел круг"
    },
  ];

  constructor({ pos }: ChanceConstructorObject) {
    super("Шанс", pos);
  }

  public peekRandomCard(): ChanceCard {
    const x: number = Math.floor(Math.random() * Chance.cards.length);
    return Chance.cards[x];
  }

  onStep(player: Player): void {
    player.lastChanceCard = this.peekRandomCard();
    player.sendMessage(`${player.name} вытянул карту "${player.lastChanceCard.msg}"`);
    player.sendOffer({
      events: [SocketEvents.DO_CHANCE_ACTION],
      options: ["Выполнить"],
      msg: `Ты вытянул карту шанс с заданием "${player.lastChanceCard.msg}"`
    });
  }
}
