import type { Goal } from "../../enterprise/value-objects/goal";
import type { Nutrient } from "../../enterprise/value-objects/nutrient";

export type SupervisedData = {
  id: string;
  name: string;
  photo: string;
  calorieGoal: Goal;
  calorieIntake: number;
  nutrients: Nutrient[];
  mealIds: string[];
};

export interface SupervisedRepository {
  findById(id: string): Promise<SupervisedData | null>;
}
