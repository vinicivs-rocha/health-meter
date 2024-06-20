import { SupervisionPresenter } from "@/domain/application/presenters/supervision";
import { MealData } from "@/domain/application/repositories/meal";
import { SupervisedData } from "@/domain/application/repositories/supervised";
import { injectable } from "inversify";

@injectable()
export class ExpoSupervisionPresenter implements SupervisionPresenter {
  presentError(message: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  presentCalorieGoal(goal: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async presentSupervision(data: {
    supervised: Promise<SupervisedData>;
    meals: Promise<MealData[]>;
  }): Promise<void> {
    await Promise.all([data.supervised, data.meals]);

    console.log(data.supervised, data.meals);
  }
}
