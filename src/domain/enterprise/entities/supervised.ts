import { randomUUID } from "crypto";
import { Entity } from "../../../core/entities/entity";
import type { Optional } from "../../../core/types/optional";
import { Metric } from "../value-objects/metric";
import { MetricIntake } from "../value-objects/metric-intake";
import { Meal } from "./meal";

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

  set mealIds(mealIds: string[]) {
    this.props.mealIds = mealIds;
  }

  get id() {
    return this.props.id;
  }

  get metrics() {
    return this.props.metrics;
  }

  get name() {
    return this.props.name;
  }

  get highlightedMetric() {
    return this.props.highlightedMetric;
  }

  removeMeal(meal: Meal) {
    this.props.mealIds = this.props.mealIds.filter(
      (mealId) => mealId !== meal.id
    );
  }

  subtractMetricIntakes(metricIntakes: MetricIntake[]) {
    this.props.metrics = this.props.metrics.map((metric) => {
      const metricIntake = metricIntakes.find(
        (intake) => intake.metricId === metric.id
      );
      if (!metricIntake) return metric;

      return new Metric(
        metric.id,
        metric.name,
        metric.fieldName,
        metric.unit,
        metric.goal,
        metric.intake - metricIntake.intake
      );
    });

    this.props.highlightedMetric = this.props.metrics.find(
      (metric) => metric.id === this.props.highlightedMetric.id
    )!;
  }
}
