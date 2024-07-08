import { injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";

@injectable()
export class MealStore {
  private _defaultMealName = "";

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
}
