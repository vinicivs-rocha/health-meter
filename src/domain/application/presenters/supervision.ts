import type { MealData } from "../repositories/meal";
import type { SupervisedData } from "../repositories/supervised";

export interface SupervisionPresenter {
  setSupervisedLoading(state: boolean): Promise<void>;
  setMealsLoading(state: boolean): Promise<void>;
  setMealDeletionLoading(state: boolean, mealId: string): Promise<void>;
  presentSupervised(data: { supervised: SupervisedData }): Promise<void>;
  presentMeals(data: { meals: MealData[] }): Promise<void>;
  presentError(message: string): Promise<void>;
  presentCalorieGoal(goal: number): Promise<void>;
}
