import { TacoField } from "./taco-field";

export class Intake {
  constructor(
    public readonly name: string,
    public readonly unit: string,
    public readonly tacoField: TacoField
  ) {}
}
