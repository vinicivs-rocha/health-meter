import type { Nutrient } from "./nutrient";

export class NutritionalValue {
  constructor(
    public readonly nutrient: Nutrient,
    public readonly value: number
  ) {}
}
