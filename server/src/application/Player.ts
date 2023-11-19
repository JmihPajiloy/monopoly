import logger from "../logger";
import { Socket } from "socket.io";
import { Message, Offer, SocketEvents } from "../socket-events";
import { Game, PlayerColor } from "./Game";
import { FieldGroups } from "./fields/porperty-fields/Street";
import { ChanceCard } from "./fields/Chance";
import { GameplayError, NotEnoughMoneyError } from "./errors";
import { PropertyField } from "./fields/porperty-fields/PropertyField";
import { BaseField, Position } from "./fields/BaseField";

export class Dice {
  readonly die1: number;
  readonly die2: number;

  private constructor() {
    this.die1 = Math.ceil(Math.random() * 6);
    this.die2 = Math.ceil(Math.random() * 6);
  }

  public static roll(): Dice {
    return new Dice();
  }

  public get value(): number {
    return this.die1 + this.die2;
  }

  /** Проверяет является ли выбрашенное число дублем */
  public isDouble(): boolean {
    return this.die1 === this.die2;
  }
}


export class Player {
  color: PlayerColor;
  socket: Socket;
  position: Position;
  name: string;
  balance: number;
  inJail: boolean;
  spentInJail: number;
  thrownDoubles: number;
  owns: PropertyField[];
  room: string;
  _lastDice?: Dice;
  _lastChanceCard?: ChanceCard;

  get lastDice() {
    if (!this._lastDice) throw new GameplayError(`${this.name} did not roll dice!`);
    return this._lastDice;
  }

  set lastDice(val: Dice) {
    this._lastDice = val;
  }

  get lastChanceCard() {
    if (!this._lastChanceCard) throw new GameplayError(`${this.name} did not roll dice!`);
    return this._lastChanceCard;
  }

  set lastChanceCard(val: ChanceCard) {
    this._lastChanceCard = val;
  }

  constructor(socket: Socket, room: string, name: string, color: PlayerColor) {
    this.socket = socket;
    this.room = room;
    this.name = name;

    this.position = 0;
    this.balance = 1500;
    this.inJail = false;
    this.spentInJail = 0;
    this.thrownDoubles = 0;
    this.owns = [];
    this.color = color;
  }

  public toJSON() {
    return {
      name: this.name,
      color: this.color,
      balance: this.balance,
      position: this.position,
      owns: this.owns.map(prop => prop.toJSON())
    };
  }

  public get currentField() {
    const game = Game.getInstance(this.room);
    return game.fields[this.position];
  }

  /** Проверяет есть ли у игрока монополия на собственность группы `group`*/
  public hasMonopoly(group: FieldGroups): boolean {
    const streetsByGroups: Map<FieldGroups, number> = new Map([
      [FieldGroups.BROWN, 2],
      [FieldGroups.LIGHT_BLUE, 3],
      [FieldGroups.PINK, 3],
      [FieldGroups.ORANGE, 3],
      [FieldGroups.RED, 3],
      [FieldGroups.YELLOW, 3],
      [FieldGroups.GREEN, 3],
      [FieldGroups.DARK_BLUE, 2],
      [FieldGroups.UTILITY, 2],
      [FieldGroups.SHOPPING_MALL, 4]
    ]);
    return this.owns.filter(value => (value.group === group)).length === streetsByGroups.get(group);
  }

  public goToJail(): void {
    const game = Game.getInstance(this.room);

    game.sendState();
    game.fields[10].onStep(this);
  }

  sendOk(): void {
    this.socket.emit(SocketEvents.OK);
  }

  sendError(errorMessage: string): void {
    logger.warning(errorMessage);
    this.socket.emit(SocketEvents.ERROR, errorMessage);
  }

  public endStep(): void {
    if (!this._lastDice) throw new GameplayError("Can not find players last dice!");
    if (this.lastDice.isDouble() && !this.inJail) {
      this.sendOffer({
        options: ["Бросить кубики!"],
        events: [SocketEvents.ROLL_DICE_DEFAULT],
        msg: "У тебя дубль! Кидай кубики еще раз"
      });
      // this.rollDice();
      // this.goOn(this.lastDice.value);
      // this.currentField.onStep(this);
    } else if (!this.lastDice.isDouble() || this.inJail) {
      this.sendOffer({
        options: ["Завершить ход!"],
        events: [SocketEvents.NEXT_STEP],
        msg: "Заверши ход"
      });
    }
  }

  public buyField(field: BaseField): void | never {
    if (!(field instanceof PropertyField)) throw new TypeError(`Field "${field.name}" is not a property!`);
    if (field.hasOwner()) throw new GameplayError(`Field "${field.name}" already has an owner!`);
    if (this.balance - field.buyCost < 0) throw new NotEnoughMoneyError(`${this.name} can't buy field because he is too poor!`);
    this.balance -= field.buyCost;
    field.owner = this;
    this.owns.push(field);
  }

  public sellField(field: BaseField): void {
    if (!(field instanceof PropertyField)) throw new TypeError(`Field "${field.name}" is not a property!`);
    if (field.owner != this) throw new GameplayError(`Field "${field.name}" already has another owner!`);
    this.balance += field.sellCost;
    field.owner = undefined;
    const index = this.owns.indexOf(field);
    if (index !== -1) {
      this.owns.splice(index, 1);
    } else {
      throw new GameplayError(`Field "${field.name}" doesn't have an owner!`);
    }


  }

  public payFine(): void | never {
    if (this.balance - 50 < 0) throw new NotEnoughMoneyError(`${this.name} can't pay fine because he is too poor!`);
    this.balance -= 50;
    this.inJail = false;
    this.spentInJail = 0;
  }

  public rollDice(): Dice {
    this.lastDice = Dice.roll();

    if (this.lastDice.isDouble()) {
      this.thrownDoubles += 1;
    } else {
      this.thrownDoubles = 0;
    }

    if (this.thrownDoubles >= 3) {
      this.goToJail();
      this.sendMessage(`${this.name} выбрасывает 3 дуля подряд и отправляется в тюрьму!`);
      this.thrownDoubles = 0;
    }
    return this.lastDice;
  }

  /** Логгирует сообщение и отправляет его в чат на сайте
   * @param {string} msg - сообщение
   */
  public sendMessage(msg: string): void {
    const message: Message = { msg: msg, time: (new Date()).toLocaleTimeString() };
    logger.chat(msg);
    this.socket.to(this.room).emit(SocketEvents.MESSAGE, message);
    this.socket.emit(SocketEvents.MESSAGE, message);
  }

  /** Отправляет оффер игроку
   * @param {Offer} offer - оффер */
  public sendOffer(offer: Offer): void {
    this.socket.emit(SocketEvents.SUGGEST, offer);
  }

  /** Перемещает игрока на `steps` шагов вперед
   *
   * @return {boolean} - прошел ли игрок поле Старт*/
  public goOn(steps: number): boolean {
    const prevPos: number = this.position;
    this.position = <Position>((this.position + steps) % 40);
    return (this.position < prevPos);
  }

  /** Перемещает игрока на позицию `pos`
   * @param {number} pos - позиция на которую нужно переместить игрока (от 0 до 39)
   * @return {boolean} - прошел ли игрок поле Старт
   * @throws Error - неверное значение `pos`
   */
  goTo(pos: Position): boolean | never {
    const passedStart = pos < this.position;
    this.position = pos;
    return passedStart;
  }
}
