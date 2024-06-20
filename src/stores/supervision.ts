import { MealData } from "@/domain/application/repositories/meal";
import { SupervisedData } from "@/domain/application/repositories/supervised";
import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

@injectable()
export class SupervisionStore {
  supervisedLoading?: boolean;
  mealsLoading?: boolean;
  supervised?: SupervisedData;
  meals?: MealData[];

  constructor() {
    makeAutoObservable(this);
  }

  loadSupervised(supervised: Promise<SupervisedData>) {
    this.supervisedLoading = true;
    supervised.then((supervised) => {
      this.supervised = supervised;
      this.supervisedLoading = false;
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
