import { SupervisionPresenter } from "@/domain/application/presenters/supervision";
import { MealData } from "@/domain/application/repositories/meal";
import { SupervisedData } from "@/domain/application/repositories/supervised";
import { SupervisionStore } from "@/stores/supervision";
import { inject, injectable } from "inversify";

@injectable()
export class ExpoSupervisionPresenter implements SupervisionPresenter {
  @inject("SupervisionStore") private readonly store!: SupervisionStore;

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
    this.store.loadSupervised(data.supervised);
    this.store.loadMeals(data.meals);
  }
}
