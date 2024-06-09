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
  supervised: SupervisedData | null;
  meals: MealData[];
};

export class StartSupervision
  implements Usecase<Input, StartSupervisionOutput>
{
  output!: StartSupervisionOutput;

  constructor(
    private readonly supervisedRepository: SupervisedRepository,
    private readonly mealRepository: MealRepository,
    private readonly supervisionPresenter: SupervisionPresenter
  ) {}
  async execute({ supervisedId }: Input) {
    try {
      this.output = {
        supervised: await this.supervisedRepository.findById(supervisedId),
        meals: [],
      };

      if (!this.output.supervised) {
        throw new FetchFailed("Supervised");
      }

      this.output.meals.concat(
        ...(await this.mealRepository.findByIds(this.output.supervised.mealIds))
      );
    } catch (error) {
      if (error instanceof FetchFailed) {
        this.supervisionPresenter.presentError(error.message);
      }
      console.error(error);
    }
  }
}
