import { BaseField, Position } from "./BaseField";
import { Player } from "../Player";
import { SocketEvents } from "../../socketEvents";
import { NotEnoughMoneyError } from "../errors";

export interface TaxConstructorObject {
  name: string,
  pos: Position,
  amount: number
}

export class Tax extends BaseField {
  readonly amount: number;

  constructor({ name, pos, amount }: TaxConstructorObject) {
    super(name, pos);
    this.amount = amount;
  }

  public collectTax(player: Player): void | never {
    if (player.balance - this.amount < 0) throw new NotEnoughMoneyError(`${player.name} can't pay tax because he is too poor!`);
    player.balance -= this.amount;
  }

  public onStep(player: Player): void {
    player.sendMessage(`${player.name} встал на поле ${this.name} и обязан заплатить ${this.amount}₽`);
    player.sendOffer({
      events: [SocketEvents.PAY_TAX],
      options: [`Заплатить ${this.amount}₽`],
      msg: "Заплати налог"
    });
  }
}
