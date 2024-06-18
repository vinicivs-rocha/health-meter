import type { Goal } from "./goal";

export class Metric {
  constructor(
    private _name: string,
    private _fieldName: string,
    private _unit: string,
    public readonly goal: Goal,
    public readonly intake = 0
  ) {}

  get name() {
    return this._name.charAt(0).toUpperCase() + this._name.slice(1);
  }
}
