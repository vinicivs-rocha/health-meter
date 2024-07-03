import { Metric } from "@/domain/enterprise/value-objects/metric";
import { Usecase } from "@core/usecases/usecase";
import { inject } from "inversify";
import { SupervisionPresenter } from "../presenters/supervision";
import { MealData, MealRepository } from "../repositories/meal";
import {
  SupervisedData,
  SupervisedRepository,
} from "../repositories/supervised";

type Input = {
  mealId: string;
  supervisedId: string;
};

export type DeleteMealOutput = {
  supervised: SupervisedData;
  meals: MealData[];
};

export class DeleteMeal implements Usecase<Input, DeleteMealOutput> {
  output!: DeleteMealOutput;

  @inject("SupervisedRepository")
  private supervisedRepository!: SupervisedRepository;
  @inject("MealRepository")
  private mealRepository!: MealRepository;
  @inject("SupervisionPresenter")
  private supervisionPresenter!: SupervisionPresenter;

  async execute(input: Input): Promise<void> {
    this.supervisionPresenter.setMealDeletionLoading(true, input.mealId);

    const meal = await this.mealRepository.findById(input.mealId);
    const supervised = await this.supervisedRepository.findById(
      input.supervisedId
    );

    const meals = await this.mealRepository.delete({ mealId: input.mealId });

    this.supervisionPresenter.setMealDeletionLoading(false, input.mealId);
    this.supervisionPresenter.presentMeals({ meals });

    const newMetrics = supervised.metrics.map((metric) => {
      const mealIntake = meal?.metricIntakes.find(
        (intake) => intake.metricId === metric.id
      );
      if (!mealIntake) return metric;

      return new Metric(
        metric.id,
        metric.name,
        metric.fieldName,
        metric.unit,
        metric.goal,
        metric.intake - mealIntake.intake
      );
    });

    await Promise.all(
      newMetrics.map((metric) =>
        this.supervisedRepository.updateMetric({
          supervisedId: supervised.id,
          metric,
        })
      )
    );

    supervised.metrics = newMetrics;
    supervised.highlightedMetric = newMetrics.find(
      (metric) => metric.id === supervised.highlightedMetric.id
    )!;

    this.supervisionPresenter.presentSupervised({ supervised });
  }
}
