import {
  MealAddingPresentingInput,
  MealPresenter,
} from "@/domain/application/presenters/meal";
import { MealStore } from "@/stores/meal";
import { Router } from "@/types";
import { inject } from "inversify";

export class ExpoMealPresenter implements MealPresenter {
  @inject("MealStore") private readonly store!: MealStore;
  @inject("ExpoRouter") private readonly router!: Router;

  async presentMealAdding(data: MealAddingPresentingInput): Promise<void> {
    this.store.defaultMealName = data.defaultMealName;

    this.router.push("/add-meal");
  }
}
