import { randomUUID } from "expo-crypto";
import { Entity } from "../../../core/entities/entity";
import type { Optional } from "../../../core/types/optional";
import type { MetricIntake } from "../value-objects/metric-intake";

export type MealProps = {
  id: string;
  name: string;
  metricIntakes: MetricIntake[];
};

export class Meal extends Entity<MealProps> {
  constructor(props: Optional<MealProps, "id">) {
    super({
      ...props,
      id: props.id ?? randomUUID(),
    });
  }

  get id() {
    return this.props.id;
  }

  get metricIntakes() {
    return this.props.metricIntakes;
  }
}
