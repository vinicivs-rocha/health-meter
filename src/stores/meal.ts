import { Food } from "@/domain/enterprise/entities/food";
import { injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";

@injectable()
export class MealStore {
  private _defaultMealName = "";
  private _foods: Food[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  set defaultMealName(name: string) {
    runInAction(() => {
      this._defaultMealName = name;
    });
  }

  get defaultMealName() {
    return this._defaultMealName;
  }

  set foods(foods: Food[]) {
    runInAction(() => {
      this._foods = foods;
    });
  }

  get foods() {
    return this._foods;
  }
}
