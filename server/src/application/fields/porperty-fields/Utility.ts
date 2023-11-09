import { Player } from "../../Player";
import { FieldGroups } from "./Street";
import { PropertyField } from "./PropertyField";
import { Position } from "../BaseField";
import { GameplayError } from "../../errors";

export interface UtilityConstructorObject {
  name: string,
  pos: Position
}

export class Utility extends PropertyField {
  readonly group: FieldGroups = FieldGroups.UTILITY;

  constructor({ name, pos }: UtilityConstructorObject) {
    super(name, pos, 150, 75, [4, 10]);
  }

  get shownRent(): string {
    if (!this.owner) return this.buyCost.toString();
    if (this.owner.hasMonopoly(this.group)) {
      return `x${this.rentList[1]}`;
    }
    return `x${this.rentList[0]}`;
  }

  getRent(player: Player): number {
    if (!this.owner) throw new GameplayError(`Property ${this.name} does not have an owner!`);
    if (!player.lastDice) throw new GameplayError(`Can not find ${player.name}'s dice!`);
    if (this.owner.hasMonopoly(this.group)) {
      return player.lastDice.value * this.rentList[1];
    }
    return player.lastDice.value * this.rentList[0];
  }
}
