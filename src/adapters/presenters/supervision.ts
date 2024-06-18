import { SupervisionPresenter } from "@/domain/application/presenters/supervision";
import { MealData } from "@/domain/application/repositories/meal";
import { SupervisedData } from "@/domain/application/repositories/supervised";

export class ExpoSupervisionPresenter implements SupervisionPresenter {
  presentError(message: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  presentCalorieGoal(goal: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async presentSupervision(data: {
    supervised: SupervisedData;
    meals: MealData[];
  }): Promise<void> {
    console.log(data);
  }
}
