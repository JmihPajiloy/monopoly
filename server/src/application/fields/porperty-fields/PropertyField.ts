import { BaseField, Position } from "../BaseField";
import { Player } from "../../Player";
import { FieldGroups } from "./Street";
import { SocketEvents } from "../../../socket-events";
import { GameplayError, NotEnoughMoneyError } from "../../errors";


export abstract class PropertyField extends BaseField {

  private _owner?: Player;
  public readonly buyCost: number;
  public readonly sellCost: number;
  public readonly rentList: number[];
  abstract readonly group: FieldGroups;

  protected constructor(name: string,
                        pos: Position,
                        buyCost: number,
                        sellCost: number,
                        rentList: number[]) {
    super(name, pos);
    this.buyCost = buyCost;
    this.sellCost = sellCost;
    this.rentList = rentList;
  }

  public hasOwner(): boolean {
    return !!this._owner
  }

  public get owner(): Player {
    if (!this._owner) throw new GameplayError(`Field ${this.name} does not have an owner!`);
    return this._owner;
  }

  public set owner(value: Player | undefined) {
    this._owner = value;
  }

  abstract get shownRent(): string

  abstract getRent(player?: Player): number

  public toJSON() {
    return {
      name: this.name,
      pos: this.position,
      rent: this.shownRent
    };
  }

  public collectRent(player: Player): void | never {
    const rent: number = this.getRent(player);
    if ((!this._owner) || (this._owner === player)) throw new GameplayError(`Field "${this.name}" doesn't have an owner or owner is the player themselves!`);
    if (player.balance - rent < 0) throw new NotEnoughMoneyError(`${player.name} can't pay rent because he is too poor!`);
    player.balance -= rent;
    this.owner.balance += rent;
  }

  private onOwned(player: Player): void {
    if (this._owner === player) {
      player.sendMessage(`${player.name} встает на свое поле и не обязан платить ренту`);
      player.endStep();
    }
  }

  private onRivals(player: Player): void {
    if ((this._owner !== player) && this._owner) {
      player.sendMessage(`Поле ${this.name} принадлежит ${this.owner.name}, и ${player.name} обязан заплатить ренту ${this.getRent(player)}₽`);
      player.sendOffer({
        events: [SocketEvents.PAY_RENT],
        options: [`Заплатить ${this.getRent(player)}₽`],
        msg: `Вы обязаны заплатить ${this.owner.name} ренту ${this.getRent(player)}₽`
      });
    }
  }

  private onUnowned(player: Player): void {
    if (!this._owner) {
      player.sendMessage(`Поле никем не занято и ${player.name} может купить его за ${this.buyCost}₽`);
      player.sendOffer({
        events: [SocketEvents.BUY_FIELD, SocketEvents.END_STEP],
        options: [`Купить за ${this.buyCost}₽`, "Не покупать"],
        msg: `Поле никем не занято. Хочешь купить его?`
      });
    }
  }

  onStep(player: Player): void {
    this.onUnowned(player);
    this.onOwned(player);
    this.onRivals(player);
  }
}