import { randomUUID } from "crypto";
import { Entity } from "../../../core/entities/entity";
import type { Optional } from "../../../core/types/optional";
import type { Metric } from "../value-objects/metric";

export type SupervisedProps = {
  id: string;
  name: string;
  highlightedMetric: Metric;
  metrics: Metric[];
  mealIds: string[];
};

export class Supervised extends Entity<SupervisedProps> {
  constructor(props: Optional<SupervisedProps, "id" | "mealIds">) {
    super({
      ...props,
      id: props.id ?? randomUUID(),
      mealIds: [],
    });
  }
}
