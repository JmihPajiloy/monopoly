import { Player } from "../Player";
import { BaseField, Position } from "./BaseField";
import { SocketEvents } from "../../socketEvents";
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
        player.goTo(0);
        player.balance += 300;
        player.sendMessage(`${player.name} прошел на поле старт и получил 300₽`);
        player.sendOffer({
          options: ["Завершить ход!"],
          events: [SocketEvents.NEXT_STEP],
          msg: "Заверши ход"
        });
      },
      msg: "Игрок переходит на поле Старт и получает 300₽"
    },
    {
      action: (player: Player) => {
        const hasPassed = player.goTo(24);
        if (hasPassed) {
          player.balance += 300;
          player.sendMessage(`${player.name} прошел на Парковый проспект и получил 300₽ за прохождение круга`);
        } else {
          player.sendMessage(`${player.name} прошел на Парковый проспект`);
        }
        Game.fields[24].onStep(player);
      },
      msg: "Иди на парковый проспект и получи 300₽ если прошел круг"
    }
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
