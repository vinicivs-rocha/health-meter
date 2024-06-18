import type { MealData } from "../repositories/meal";
import type { SupervisedData } from "../repositories/supervised";

export interface SupervisionPresenter {
  presentSupervision(data: {
    supervised: SupervisedData;
    meals: MealData[];
  }): Promise<void>;
  presentError(message: string): Promise<void>;
  presentCalorieGoal(goal: number): Promise<void>;
}
