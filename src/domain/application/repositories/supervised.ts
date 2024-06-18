import type { Goal } from "../../enterprise/value-objects/goal";
import type { Metric } from "../../enterprise/value-objects/nutrient";

export type SupervisedData = {
  id: string;
  name: string;
  photo: string;
  highlightedGoal: Goal;
  highlightedIntake: number;
  metrics: Metric[];
  mealIds: string[];
};

export interface SupervisedRepository {
  findById(id: string): Promise<SupervisedData | null>;
}
