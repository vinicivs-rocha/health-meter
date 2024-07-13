import { randomUUID } from "expo-crypto";
import { Entity } from "../../../core/entities/entity";
import type { Optional } from "../../../core/types/optional";
import { Food } from "./food";

export type MealProps = {
  id: string;
  name: string;
  createdAt: Date;
  foods: Food[];
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

  get name() {
    return this.props.name;
  }

  get foods() {
    return this.props.foods;
  }

  addFood(food: Food) {
    this.props.foods.push(food);
  }

  removeFood(food: Food) {
    this.props.foods = this.props.foods.filter((f) => f.id !== food.id);
  }

  getMetricTotalIntake(metricId: string) {
    return this.props.foods.reduce(
      (acc, food) => acc + food.getMetricIntake(metricId),
      0
    );
  }
}
