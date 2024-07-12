import { InvalidField } from "../exceptions/invalid-field";

export enum TacoFields {
  CARBS = "carbohydrates",
  FAT = "lipids",
  PROTEIN = "protein",
  CALORIES = "kcal",
}

export class TacoField {
  private _value: keyof typeof TacoFields;

  private constructor(value: string) {
    if (!this.isValid(value)) {
      throw new InvalidField("TacoField", value);
    }
    this._value = value;
  }

  private isValid(value: string): value is keyof typeof TacoFields {
    return Object.keys(TacoFields).includes(value);
  }

  get value(): TacoFields {
    return TacoFields[this._value];
  }
}
