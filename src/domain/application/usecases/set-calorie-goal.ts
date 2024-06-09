import { Supervised } from "@/domain/enterprise/entities/supervised";
import { FetchFailed } from "@/domain/enterprise/exceptions/fetch-failed";
import { Goal } from "@/domain/enterprise/value-objects/goal";
import { Usecase } from "@core/usecases/usecase";
import type { SupervisionPresenter } from "../presenters/supervision";
import type { SupervisedRepository } from "../repositories/supervised";

type Input = {
  supervisedId: string;
  calorieGoal: number;
};

export type SetCalorieGoalOutput = {
  calorieGoal: number;
};

export class SetCalorieGoal implements Usecase<Input, SetCalorieGoalOutput> {
  constructor(
    private readonly supervisedRepository: SupervisedRepository,
    private readonly supervisionPresenter: SupervisionPresenter
  ) {}
  output!: SetCalorieGoalOutput;

  async execute(input: Input): Promise<void> {
    try {
      const supervisedData = await this.supervisedRepository.findById(
        input.supervisedId
      );

      if (!supervisedData) {
        throw new FetchFailed("Supervised");
      }

      const supervised = new Supervised({
        ...supervisedData,
        calorieGoal: new Goal(input.calorieGoal),
      });

      this.supervisionPresenter.presentCalorieGoal(
        supervised.calorieGoal.value
      );
    } catch (error) {
      if (error instanceof FetchFailed) {
        this.supervisionPresenter.presentError(
          "Failed to fetch supervised data"
        );
      }
      throw error;
    }
  }
}
