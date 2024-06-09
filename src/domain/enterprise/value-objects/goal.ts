import { NegativeGoal } from "../exceptions/negative-goal";

export class Goal {
  public readonly value: number;
  constructor(value: number) {
    if (value < 0) {
      throw new NegativeGoal();
    }
    this.value = Math.floor(value);
  }
}
