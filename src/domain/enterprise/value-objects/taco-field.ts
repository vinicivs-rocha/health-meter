import { InvalidField } from "../exceptions/invalid-field";

export enum TacoFields {
  CARBS = "carbohydrates",
  FAT = "lipids",
  PROTEIN = "protein",
  CALORIES = "kcal",
}

export class TacoField {
  private _value: TacoFields;

  private constructor(value: TacoFields) {
    if (!this.isValid(value)) {
      throw new InvalidField("TacoField", value);
    }
    this._value = value;
  }

  private isValid(value: TacoFields): value is TacoFields {
    return Object.values(TacoFields).includes(value);
  }
}
