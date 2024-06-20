import { MealData } from "@/domain/application/repositories/meal";
import { SupervisedData } from "@/domain/application/repositories/supervised";
import { injectable } from "inversify";
import { action, makeAutoObservable, runInAction } from "mobx";

@injectable()
export class SupervisionStore {
  supervisedLoading: boolean = true;
  mealsLoading: boolean = true;
  supervised: SupervisedData | null = null;
  meals: MealData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadSupervised(supervised: Promise<SupervisedData>) {
    this.supervisedLoading = true;
    supervised.then((supervised) => {
      this.supervised = supervised;
      runInAction(() => (this.supervisedLoading = false));
    });
  }

  loadMeals(meals: Promise<MealData[]>) {
    this.mealsLoading = true;
    meals.then((meals) => {
      this.meals = meals;
      this.mealsLoading = false;
    });
  }
}
