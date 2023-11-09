import { Player } from "../Player";

import { BaseField, Position } from "./BaseField";
import { SocketEvents } from "../../socketEvents";

export interface ToJailConstructorObject {
  name: string,
  pos: Position
}

export class ToJail extends BaseField {
  constructor({name, pos}: ToJailConstructorObject) {
    super(name, pos);
  }

  onStep(player: Player): void {
    player.goTo(10);
    player.inJail = true;
    player.sendMessage(`${player.name} попал в тюрьму`);
    player.sendOffer({
      options: ["Закончить ход"],
      events: [SocketEvents.NEXT_STEP],
      msg: "Ты попал в тюрьму. Заверши ход"
    })
  }
}
