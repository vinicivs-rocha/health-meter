import { Meal } from "@/domain/enterprise/entities/meal";
import { Supervised } from "@/domain/enterprise/entities/supervised";

export interface SupervisedRepository {
  findCurrent(): Promise<Supervised>;
  findMealById(mealId: string): Promise<Meal>;
  deleteMeal(meal: Meal): Promise<void>;
}
