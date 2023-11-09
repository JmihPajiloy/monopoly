import { BaseField, Position } from "./BaseField";
import { Player } from "../Player";

export interface EmptyFieldConstructorObject {
  name: string,
  pos: Position
}
export class EmptyField extends BaseField {
  constructor({ name, pos }: EmptyFieldConstructorObject) {
    super(name, pos);
  }

  onStep(player: Player): void {
    player.sendMessage(`${player.name} встал на поле ${this.name}`);
    player.endStep()
  }
}
