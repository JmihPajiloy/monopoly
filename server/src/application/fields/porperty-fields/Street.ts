import { Player } from "../../Player";
import { PropertyField } from "./PropertyField";
import { GameplayError } from "../../errors";
import { Position } from "../BaseField";

export enum FieldGroups {
  BROWN,
  LIGHT_BLUE,
  PINK,
  ORANGE,
  RED,
  YELLOW,
  GREEN,
  DARK_BLUE,
  UTILITY,
  SHOPPING_MALL
};

export interface StreetConstructorObject {
  name: string,
  pos: Position,
  buyCost: number,
  sellCost: number,
  buildingCost: number,
  rentList: number[],
  color: FieldGroups
}

export class Street extends PropertyField {


  public houses: (0 | 1 | 2 | 3 | 4 | 5);
  readonly buildingCost: number;
  group: FieldGroups;

  constructor({ name, pos, buyCost, sellCost, buildingCost, rentList, color }: StreetConstructorObject) {
    super(name, pos, buyCost, sellCost, rentList);
    this.buildingCost = buildingCost;
    this.houses = 0;
    this.group = color;
  }

  get shownRent(): string {
    if (!this.owner) return this.buyCost.toString();
    return this.getRent().toString();
  }

  buildHouse(): void | never {
    if (!this.owner) throw new GameplayError(`Property ${this.name} does not have an owner!`);
    if (this.houses === 5) throw new GameplayError(`Can't build house on field ${this.name} because house limit is reached!`);
    if (!this.owner.hasMonopoly(this.group)) throw new GameplayError(`Can't build house on field ${this.name} because player doesn't have a monopoly!`);
    this.houses += 1;
    // TODO
  }

  destroyHouse(): void | never {
    if (!this.owner) throw new GameplayError(`Property ${this.name} does not have an owner!`);
    if (this.houses === 0) throw new GameplayError(`Can't destroy house on field ${this.name} because there are no any houses!`);
    if (!this.owner.hasMonopoly(this.group)) throw new GameplayError(`Can't destroy house on field ${this.name} because player doesn't have a monopoly!`);
    this.houses -= 1;
  }

  getRent(): number {
    if (!this.owner) throw new GameplayError(`Property ${this.name} does not have an owner!`);
    if (!this.owner.hasMonopoly(this.group)) {
      return this.rentList[0];
    }
    return this.rentList[this.houses + 1];
  }
}
