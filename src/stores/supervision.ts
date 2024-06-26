import { MealData } from "@/domain/application/repositories/meal";
import { SupervisedData } from "@/domain/application/repositories/supervised";
import { injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";

@injectable()
export class SupervisionStore {
  private _supervisedLoading: boolean = true;
  private _mealsLoading: boolean = true;
  private _supervised: SupervisedData | null = null;
  private _meals: MealData[] = [];

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
    });
  }

  get meals() {
    return this._meals;
  }
}
