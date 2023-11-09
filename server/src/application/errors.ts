/** Ошибка, которая возникла во время игры */
export class GameplayError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "GameplayError"
  }
}

/** Ошибка возникает, если у `player` недостаточно денег, чтобы оплатить долг */
export class NotEnoughMoneyError extends GameplayError{
  public constructor(message: string) {
    super(message);
    this.name = "NotEnoughMoneyError"
  }
}