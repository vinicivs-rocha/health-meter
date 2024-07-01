import { randomUUID } from "crypto";
import { Entity } from "../../../core/entities/entity";
import type { Optional } from "../../../core/types/optional";
import type { MetricIntake } from "../value-objects/metric-intake";

export type MealProps = {
  id: string;
  name: string;
  calories: number;
  nutrionalValues: MetricIntake[];
};

export class Meal extends Entity<MealProps> {
  constructor(props: Optional<MealProps, "id">) {
    super({
      ...props,
      id: props.id ?? randomUUID(),
    });
  }
}
