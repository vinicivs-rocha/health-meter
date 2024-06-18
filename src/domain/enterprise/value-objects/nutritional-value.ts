import type { Metric } from "./nutrient";

export class NutritionalValue {
  constructor(
    public readonly nutrient: Metric,
    public readonly value: number
  ) {}
}
