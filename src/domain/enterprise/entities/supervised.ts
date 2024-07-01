import { randomUUID } from "crypto";
import { Entity } from "../../../core/entities/entity";
import type { Optional } from "../../../core/types/optional";
import type { Goal } from "../value-objects/goal";
import type { Metric } from "../value-objects/metric";

export type SupervisedProps = {
  id: string;
  name: string;
  calorieGoal?: Goal;
  calorieIntake: number;
  nutrients: Metric[];
  mealIds: string[];
};

export class Supervised extends Entity<SupervisedProps> {
  constructor(
    props: Optional<SupervisedProps, "id" | "calorieIntake" | "mealIds">
  ) {
    super({
      ...props,
      id: props.id ?? randomUUID(),
      calorieIntake: props.calorieIntake ?? 0,
      mealIds: [],
    });
  }

  get intakePercentage() {
    return this.props.calorieIntake / (this.props.calorieGoal?.value ?? 0);
  }

  get hasReachedGoal() {
    return this.intakePercentage >= 1;
  }

  set calorieGoal(goal: Goal) {
    this.props.calorieGoal = goal;
  }
}
