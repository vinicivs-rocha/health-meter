import { randomUUID } from "expo-crypto";
import { Entity } from "../../../core/entities/entity";
import type { Optional } from "../../../core/types/optional";
import { Meal } from "./meal";

export type SupervisedProps = {
  id: string;
  name: string;
  photo?: string;
  metrics: string[];
  meals: Meal[];
};

export class Supervised extends Entity<SupervisedProps> {
  constructor(props: Optional<SupervisedProps, "id">) {
    super({
      ...props,
      id: props.id ?? randomUUID(),
    });
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get metrics() {
    return this.props.metrics;
  }

  get meals() {
    return this.props.meals;
  }

  get photo() {
    return this.props.photo;
  }

  removeMeal(mealId: string) {
    this.props.meals = this.meals.filter((m) => m.id !== mealId);
  }

  getMetricIntake(metricId: string) {
    return this.props.meals.reduce(
      (acc, meal) => acc + meal.getMetricTotalIntake(metricId),
      0
    );
  }
}
