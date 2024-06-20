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
  supervised: Promise<SupervisedData>;
  meals: Promise<MealData[]>;
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
      const supervised = this.supervisedRepository.findById(supervisedId);

      const meals = this.mealRepository.findAllBySupervised(supervisedId);

      this.output = {
        supervised,
        meals,
      };

      this.supervisionPresenter.presentSupervision(this.output);
    } catch (error) {
      if (error instanceof FetchFailed) {
        this.supervisionPresenter.presentError(error.message);
      }
      console.error(error);
    }
  }
}
