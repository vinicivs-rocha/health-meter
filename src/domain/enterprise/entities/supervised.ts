import { randomUUID } from "crypto";
import { Entity } from "../../../core/entities/entity";
import type { Optional } from "../../../core/types/optional";
import type { Goal } from "../value-objects/goal";
import type { Nutrient } from "../value-objects/nutrient";

export type SupervisedProps = {
  id: string;
  name: string;
  calorieGoal?: Goal;
  calorieIntake: number;
  nutrients: Nutrient[];
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
