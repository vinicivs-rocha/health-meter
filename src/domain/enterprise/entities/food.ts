import { BaseValue } from "../value-objects/base-value";
import { Metric } from "../value-objects/metric";
import { MetricIntake } from "../value-objects/metric-intake";

export interface FoodProps {
  id: number;
  name: string;
  baseValues: BaseValue[];
  intakes?: MetricIntake[];
}

export class Food {
  constructor(
    public id: number,
    public name: string,
    private baseValues: BaseValue[],
    public intakes: MetricIntake[] = []
  ) {}

  static create({ id, name, baseValues, intakes }: FoodProps): Food {
    return new Food(id, name, baseValues, intakes);
  }

  addIntake(metric: Metric, quantity: number): void {
    const baseValue =
      this.baseValues.find((baseValue) => baseValue.metricId === metric.id) ??
      new BaseValue(metric.id, 0);
    this.intakes.push(new MetricIntake(metric.id, baseValue.value * quantity));
  }
}
