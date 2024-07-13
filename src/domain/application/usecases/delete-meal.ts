import { Supervised } from "@/domain/enterprise/entities/supervised";
import { Usecase } from "@core/usecases/usecase";
import { inject, injectable } from "inversify";
import { SupervisionPresenter } from "../presenters/supervision";
import { MetricRepository } from "../repositories/metric";
import { SupervisedRepository } from "../repositories/supervised";

export type DeleteMealInput = {
  mealId: string;
};

export type DeleteMealOutput = {
  supervised: Supervised;
};

@injectable()
export class DeleteMeal implements Usecase<DeleteMealInput, DeleteMealOutput> {
  output!: DeleteMealOutput;

  @inject("SupervisedRepository")
  private supervisedRepository!: SupervisedRepository;
  @inject("MetricRepository") private metricRepository!: MetricRepository;
  @inject("SupervisionPresenter")
  private supervisionPresenter!: SupervisionPresenter;

  async execute(input: DeleteMealInput): Promise<void> {
    this.supervisionPresenter.setMealDeletionLoading(true, input.mealId);

    const supervised = await this.supervisedRepository.findCurrent();
    const highlightedMetric = await this.metricRepository.findHighlightedInIds(
      supervised.metrics
    );

    if (!highlightedMetric) {
      throw new Error("No highlighted metric found");
    }

    supervised.removeMeal(input.mealId);

    await this.supervisedRepository.deleteMeal(input.mealId);

    this.supervisionPresenter.setMealDeletionLoading(false, input.mealId);
    this.supervisionPresenter.presentSupervised(supervised);
    this.supervisionPresenter.presentIntake(
      supervised.getMetricIntake(highlightedMetric.id)
    );
  }
}
