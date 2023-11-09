import { Game } from "./Game";
import { Player } from "./Player";
import { GameplayError } from "./errors";
import { PropertyField } from "./fields/porperty-fields/PropertyField";

class Auction {
  private roulette: Player[];
  private readonly step: number = 10;
  private price: number;
  private iter: number;

  public constructor(game: Game, field: PropertyField) {
    this.roulette = game.playerList;
    this.price = field.buyCost;
    this.iter = 0;
  }

  delete(player: Player): void | never {
    if (!this.roulette.includes(player)) throw new GameplayError(`Can't delete ${player.name} from auction because he is not in auction roulette`);
    for (let i = 0; i < this.roulette.length; i++) {
      if (this.roulette[i] === player) {
        this.roulette = this.roulette.splice(i);
        break;
      }
    }
  }

  public get currentPlayer() {
    return this.roulette[this.iter];
  }

  public next() {
    this.iter = (this.iter + 1) % this.roulette.length;
  }

  public run() {
    this.currentPlayer.sendOffer({
      options: [],
      events: [],
      msg: ""
    });


  }

}