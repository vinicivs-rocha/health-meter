import { ValueObject } from "@core/value-objects/value-object";
import { Intake } from "./intake";
import { TacoField } from "./taco-field";

export class Food implements ValueObject {
  constructor(
    public readonly name: string,
    public readonly amount: number,
    public readonly intakes: Intake[]
  ) {}

  addIntake(name: string, tacoField: TacoField, baseValue: number): void {
    this.intakes.push(new Intake(name, tacoField, baseValue * this.amount));
  }

  equals(other: any): boolean {
    if (other === null) {
      return false;
    }

    if (!(other instanceof Food)) {
      return false;
    }

    return (
      this.name === other.name &&
      this.amount === other.amount &&
      this.intakes.length === other.intakes.length &&
      this.intakes.every((intake, index) => intake.equals(other.intakes[index]))
    );
  }
}
