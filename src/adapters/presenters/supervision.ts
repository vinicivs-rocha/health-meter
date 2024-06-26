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

  async presentSupervised(data: { supervised: SupervisedData }): Promise<void> {
    this.store.supervised = data.supervised;
  }

  async presentMeals(data: { meals: MealData[] }): Promise<void> {
    this.store.meals = data.meals;
  }

  async setMealsLoading(state: boolean): Promise<void> {
    this.store.mealsLoading = state;
  }

  async setSupervisedLoading(state: boolean): Promise<void> {
    this.store.supervisedLoading = state;
  }
}
