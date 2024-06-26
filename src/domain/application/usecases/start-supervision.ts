import { inject, injectable } from "inversify";
import { Usecase } from "../../../core/usecases/usecase";
import { FetchFailed } from "../../enterprise/exceptions/fetch-failed";
import type { SupervisionPresenter } from "../presenters/supervision";
import type { MealData, MealRepository } from "../repositories/meal";
import type {
  SupervisedData,
  SupervisedRepository,
} from "../repositories/supervised";

type Input = {
  supervisedId: string;
};

export type StartSupervisionOutput = {
  supervised: SupervisedData;
  meals: MealData[];
};

@injectable()
export class StartSupervision
  implements Usecase<Input, StartSupervisionOutput>
{
  output!: StartSupervisionOutput;

  @inject("SupervisedRepository")
  private supervisedRepository!: SupervisedRepository;
  @inject("MealRepository")
  private mealRepository!: MealRepository;
  @inject("SupervisionPresenter")
  private supervisionPresenter!: SupervisionPresenter;

  async execute({ supervisedId }: Input) {
    try {
      this.supervisionPresenter.setSupervisedLoading(true);
      const supervised = await this.supervisedRepository.findById(supervisedId);
      this.output = {
        supervised,
        meals: [],
      };
      this.supervisionPresenter.presentSupervised({ supervised });
      this.supervisionPresenter.setSupervisedLoading(false);

      this.supervisionPresenter.setMealsLoading(true);
      const meals = await this.mealRepository.findAllBySupervised(supervisedId);
      this.output.meals = meals;
      this.supervisionPresenter.presentMeals({ meals });
      this.supervisionPresenter.setMealsLoading(false);
    } catch (error) {
      if (error instanceof FetchFailed) {
        this.supervisionPresenter.presentError(error.message);
      }
      console.error(error);
    }
  }
}
