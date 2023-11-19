import { Player } from "./Player";
import { EmptyField, EmptyFieldConstructorObject } from "./fields/EmptyField";
import { Street, StreetConstructorObject } from "./fields/porperty-fields/Street";
import { Chance } from "./fields/Chance";
import { Tax, TaxConstructorObject } from "./fields/Tax";
import { ShoppingMall, ShoppingMallConstructorObject } from "./fields/porperty-fields/ShoppingMall";
import { Utility, UtilityConstructorObject } from "./fields/porperty-fields/Utility";
import { ToJail, ToJailConstructorObject } from "./fields/ToJail";
import { Socket } from "socket.io";
import { fields } from "./fields";
import { SocketEvents } from "../socket-events";
import { BaseField, Position } from "./fields/BaseField";
import { GameplayError } from "./errors";

export type PlayerColor = "red" | "green" | "blue" | "yellow"

type GameJSON = {
  room: string,
  players: {
    name: string,
    color: PlayerColor
    balance: number,
    position: Position,
    owns: {
      name: string,
      pos: Position,
      rent: string
    }[]
  }[]
}

/** Класс для игры*/
export class Game {
  private players: Player[];
  readonly fields: BaseField[] = [
    new EmptyField(<EmptyFieldConstructorObject>fields[0]),
    new Street(<StreetConstructorObject>fields[1]),
    new Chance(fields[2]),
    new Street(<StreetConstructorObject>fields[3]),
    new Tax(<TaxConstructorObject>fields[4]),
    new ShoppingMall(<ShoppingMallConstructorObject>fields[5]),
    new Street(<StreetConstructorObject>fields[6]),
    new Chance(fields[7]),
    new Street(<StreetConstructorObject>fields[8]),
    new Street(<StreetConstructorObject>fields[9]),
    new EmptyField(<EmptyFieldConstructorObject>fields[10]),
    new Street(<StreetConstructorObject>fields[11]),
    new Utility(<UtilityConstructorObject>fields[12]),
    new Street(<StreetConstructorObject>fields[13]),
    new Street(<StreetConstructorObject>fields[14]),
    new ShoppingMall(<ShoppingMallConstructorObject>fields[15]),
    new Street(<StreetConstructorObject>fields[16]),
    new Chance(fields[17]),
    new Street(<StreetConstructorObject>fields[18]),
    new Street(<StreetConstructorObject>fields[19]),
    new EmptyField(<EmptyFieldConstructorObject>fields[20]),
    new Street(<StreetConstructorObject>fields[21]),
    new Chance(fields[22]),
    new Street(<StreetConstructorObject>fields[23]),
    new Street(<StreetConstructorObject>fields[24]),
    new ShoppingMall(<ShoppingMallConstructorObject>fields[25]),
    new Street(<StreetConstructorObject>fields[26]),
    new Street(<StreetConstructorObject>fields[27]),
    new Utility(<UtilityConstructorObject>fields[28]),
    new Street(<StreetConstructorObject>fields[29]),
    new ToJail(<ToJailConstructorObject>fields[30]),
    new Street(<StreetConstructorObject>fields[31]),
    new Street(<StreetConstructorObject>fields[32]),
    new Chance(fields[33]),
    new Street(<StreetConstructorObject>fields[34]),
    new ShoppingMall(<ShoppingMallConstructorObject>fields[35]),
    new Chance(fields[36]),
    new Street(<StreetConstructorObject>fields[37]),
    new Tax(<TaxConstructorObject>fields[38]),
    new Street(<StreetConstructorObject>fields[39])
  ];

  static playersBySockets: Map<string, Player> = new Map();
  private playersGenerator?: Generator<Player>;
  readonly room: string;
  private static instances: Map<string, Game> = new Map();
  public loggedIn: number;
  public ready: number;
  private colors: PlayerColor[];


  get playerList() {
    return [...this.players];
  }

  constructor(room: string) {
    this.room = room;
    this.players = [];
    this.loggedIn = 0;
    this.ready = 0;
    this.colors = ["red" , "green" , "blue", "yellow"]
  }

  toJSON(): GameJSON {
    return {
      room: this.room,
      players: [...this.players.map(p => p.toJSON())]
    };
  }

  /** Возвращает экземпляр класса `Game` */
  static getInstance(room: string): Game {
    if (!Game.instances.has(room)) {
      Game.instances.set(room, new Game(room));
    }
    return <Game>Game.instances.get(room);
  }

  /** Возвращает игрока по нику
   * @param {Socket} socket - сокет
   */
  static getPlayer(socket: Socket): Player {
    if (!this.playersBySockets.has(socket.id)) {
      throw new GameplayError("Player object was not created properly, so it could not be found!");
    }
    return <Player>this.playersBySockets.get(socket.id);
  }

  createPlayer(socket: Socket, name: string): Player {
    const color = <PlayerColor>this.colors.pop()
    const player: Player = new Player(socket, this.room, name, color);
    socket.data.playerName = name;
    Game.playersBySockets.set(socket.id, player);
    this.players.push(player);
    return player;
  }

  sendState(): void {
    const socket = this.playerList[0].socket;
    socket.broadcast.emit(SocketEvents.GAME_STATE, this.toJSON());
    socket.emit(SocketEvents.GAME_STATE, this.toJSON());
  }

  private* getTurn(): Generator<Player> {
    while (true) {
      for (const player of this.players) {
        yield player;
      }
    }
  }

  public getNextPlayer(): Player {
    if (!this.playersGenerator) this.playersGenerator = this.getTurn();
    return this.playersGenerator.next().value;
  }

  public start(): void {
    const player: Player = this.getNextPlayer();
    player.sendOffer({
      events: [SocketEvents.ROLL_DICE_DEFAULT],
      options: ["Бросить кубики"],
      msg: "Твой ход первый - бросай кубики!"
    });
  }

  public deleteSession() {
    Game.instances.delete(this.room)
  }

// kickPlayer(player: Player): void {
//   const idx = this.players.indexOf(player);
//   this.players.splice(idx, 1);
// }
}
