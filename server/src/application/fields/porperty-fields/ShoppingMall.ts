import { FieldGroups } from "./Street";
import { PropertyField } from "./PropertyField";
import { GameplayError } from "../../errors";
import { Position } from "../BaseField";

export interface ShoppingMallConstructorObject {
  name: string,
  pos: Position
}

export class ShoppingMall extends PropertyField {
  group: FieldGroups = FieldGroups.SHOPPING_MALL;

  constructor({ name, pos }: ShoppingMallConstructorObject) {
    super(name,
      pos,
      200,
      100,
      [25, 50, 100, 200]
    );
  }

  get shownRent(): string {
    return this.getRent().toString();
  }

  getRent(): number | never {
    if (!this.owner) throw new GameplayError(`Can't get rent of property ${this.name} because it doesnt have owner!`);
    const arr: ShoppingMall[] = this.owner.owns.filter(prop => (prop instanceof ShoppingMall));
    return this.rentList[arr.length - 1];
  }
}
