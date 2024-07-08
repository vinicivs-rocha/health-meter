import { Usecase } from "@core/usecases/usecase";
import { inject } from "inversify";
import { MealPresenter } from "../presenters/meal";

export type StartMealAddingInput = [];

export type StartMealAddingOutput = {
  defaultMealName: string;
};

export class StartMealAdding
  implements Usecase<StartMealAddingInput, StartMealAddingOutput>
{
  output!: StartMealAddingOutput;

  @inject("MealPresenter") mealPresenter!: MealPresenter;

  async execute(): Promise<void> {
    this.output = { defaultMealName: this.evaluateDefaultMealName() };

    this.mealPresenter.presentMealAdding(this.output);
  }

  private evaluateDefaultMealName(): string {
    const nowHour = new Date().getHours();

    if (nowHour >= 21) {
      return "Lanche da noite";
    }

    if (nowHour >= 18) {
      return "Jantar";
    }

    if (nowHour >= 15) {
      return "Lanche da Tarde";
    }

    if (nowHour >= 12) {
      return "Almoço";
    }

    if (nowHour >= 9) {
      return "Lanche do Dia";
    }

    return "Café da manhã";
  }
}
