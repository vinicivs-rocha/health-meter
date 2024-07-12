import { ValueObject } from "@core/value-objects/value-object";
import { InvalidField } from "../exceptions/invalid-field";

export enum TacoFieldNames {
  CARBS = "carbohydrates",
  FAT = "lipids",
  PROTEIN = "protein",
  CALORIES = "kcal",
}

export enum TacoFieldUnits {
  CARBS = "g",
  FAT = "g",
  PROTEIN = "g",
  CALORIES = "kcal",
}

export class TacoField implements ValueObject {
  private _name: keyof typeof TacoFieldNames;
  private _unit: keyof typeof TacoFieldUnits;

  constructor(name: string, unit: string) {
    if (!this.isValidName(name)) throw new InvalidField("TacoFieldName", name);

    if (!this.isValidUnit(unit)) throw new InvalidField("TacoFieldUnit", unit);

    this._name = name;
    this._unit = unit;
  }

  private isValidName(name: string): name is keyof typeof TacoFieldNames {
    return Object.keys(TacoFieldNames).includes(name);
  }

  private isValidUnit(unit: string): unit is keyof typeof TacoFieldUnits {
    return Object.keys(TacoFieldUnits).includes(unit);
  }

  get name(): TacoFieldNames {
    return TacoFieldNames[this._name];
  }

  get unit(): TacoFieldUnits {
    return TacoFieldUnits[this._unit];
  }

  equals(other: any): boolean {
    if (other === null) {
      return false;
    }

    if (!(other instanceof TacoField)) {
      return false;
    }

    return this.name === other.name && this.unit === other.unit;
  }
}
