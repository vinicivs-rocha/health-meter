import type { MealData } from "../repositories/meal";
import type { SupervisedData } from "../repositories/supervised";

export interface SupervisionPresenter {
  presentSupervision(data: {
    supervised: Promise<SupervisedData>;
    meals: Promise<MealData[]>;
  }): Promise<void>;
  presentError(message: string): Promise<void>;
  presentCalorieGoal(goal: number): Promise<void>;
}
