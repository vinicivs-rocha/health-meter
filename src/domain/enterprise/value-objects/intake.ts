import { ValueObject } from "@core/value-objects/value-object";
import { InvalidField } from "../exceptions/invalid-field";
import { TacoField } from "./taco-field";

export class Intake implements ValueObject {
  private _value: number;

  constructor(
    public readonly name: string,
    public readonly tacoField: TacoField,
    value: number
  ) {
    if (!this.isValidValue(value)) throw new InvalidField("IntakeValue", value);
    this._value = value;
  }

  private isValidValue(value: number): boolean {
    if (isNaN(Number(value))) return false;
    if (!Number.isFinite(value)) return false;

    return value >= 0;
  }

  get value(): number {
    return this._value;
  }

  equals(other: any): boolean {
    if (other === null) {
      return false;
    }

    if (!(other instanceof Intake)) {
      return false;
    }

    return (
      this.name === other.name &&
      this.tacoField.equals(other.tacoField) &&
      this.value === other.value
    );
  }
}
