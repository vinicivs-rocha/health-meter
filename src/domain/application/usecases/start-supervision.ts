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
  supervised: SupervisedData | null;
  meals: MealData[];
};

@injectable()
export class StartSupervision
  implements Usecase<Input, StartSupervisionOutput>
{
  output!: StartSupervisionOutput;

  constructor(
    @inject("SupervisedRepository")
    private readonly supervisedRepository: SupervisedRepository,
    @inject("SupervisedRepository")
    private readonly mealRepository: MealRepository,
    @inject("SupervisedRepository")
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

      this.supervisionPresenter.presentSupervision({
        supervised: this.output.supervised,
        meals: this.output.meals,
      });
    } catch (error) {
      if (error instanceof FetchFailed) {
        this.supervisionPresenter.presentError(error.message);
      }
      console.error(error);
    }
  }
}
