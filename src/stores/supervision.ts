import { MealData } from "@/domain/application/repositories/meal";
import { SupervisedData } from "@/domain/application/repositories/supervised";
import { injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";

type SetMealsDeletionLoadingInput = {
  mealId: string;
  state: boolean;
};

@injectable()
export class SupervisionStore {
  private _supervisedLoading: boolean = true;
  private _mealsLoading: boolean = true;
  private _supervised: SupervisedData | null = null;
  private _meals: MealData[] = [];
  private _mealsDeletionLoading = new Map<string, boolean>();

  constructor() {
    makeAutoObservable(this);
  }

  set supervisedLoading(state: boolean) {
    runInAction(() => {
      this._supervisedLoading = state;
    });
  }

  get supervisedLoading() {
    return this._supervisedLoading;
  }

  set mealsLoading(state: boolean) {
    runInAction(() => {
      this._mealsLoading = state;
    });
  }

  get mealsLoading() {
    return this._mealsLoading;
  }

  set supervised(supervised: SupervisedData) {
    runInAction(() => {
      this._supervised = supervised;
    });
  }

  get supervised(): SupervisedData | null {
    return this._supervised;
  }

  set meals(meals: MealData[]) {
    runInAction(() => {
      this._meals = meals;
      meals.forEach((meal) => {
        this._mealsDeletionLoading.set(meal.id, false);
      });
    });
  }

  get meals() {
    return this._meals;
  }

  set mealsDeletionLoading({ mealId, state }: SetMealsDeletionLoadingInput) {
    runInAction(() => {
      this._mealsDeletionLoading.set(mealId, state);
    });
  }
}
