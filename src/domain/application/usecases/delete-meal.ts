import { Meal } from "@/domain/enterprise/entities/meal";
import { Supervised } from "@/domain/enterprise/entities/supervised";
import { Usecase } from "@core/usecases/usecase";
import { inject } from "inversify";
import { SupervisionPresenter } from "../presenters/supervision";
import { MealData, MealRepository } from "../repositories/meal";
import {
  SupervisedData,
  SupervisedRepository,
} from "../repositories/supervised";

export type DeleteMealInput = {
  mealId: string;
  supervisedId: string;
};

export type DeleteMealOutput = {
  supervised: SupervisedData;
  meals: MealData[];
};

export class DeleteMeal implements Usecase<DeleteMealInput, DeleteMealOutput> {
  output!: DeleteMealOutput;

  @inject("SupervisedRepository")
  private supervisedRepository!: SupervisedRepository;
  @inject("MealRepository")
  private mealRepository!: MealRepository;
  @inject("SupervisionPresenter")
  private supervisionPresenter!: SupervisionPresenter;

  async execute(input: DeleteMealInput): Promise<void> {
    this.supervisionPresenter.setMealDeletionLoading(true, input.mealId);
    this.supervisionPresenter.setSupervisedLoading(true);

    const mealData = await this.mealRepository.findById(input.mealId);
    const supervisedData = await this.supervisedRepository.findById(
      input.supervisedId
    );
    const supervisedMeals = await this.mealRepository.findAllBySupervised(
      supervisedData.id
    );

    const supervised = new Supervised({
      id: supervisedData.id,
      name: supervisedData.name,
      highlightedMetric: supervisedData.highlightedMetric,
      metrics: supervisedData.metrics,
      mealIds: supervisedMeals.map((meal) => meal.id),
    });
    const meal = new Meal({
      id: mealData!.id,
      name: mealData!.name,
      metricIntakes: mealData!.metricIntakes,
    });

    supervised.removeMeal(meal);
    supervised.subtractMetricIntakes(meal.metricIntakes);

    this.mealRepository.delete({ mealId: input.mealId }).then((meals) => {
      this.supervisionPresenter.presentMeals({ meals });
    });

    Promise.all(
      supervised.metrics.map((metric) =>
        this.supervisedRepository.updateMetric({
          supervisedId: supervised.id,
          metric,
        })
      )
    ).then(() => {
      this.supervisionPresenter.presentSupervised({
        supervised: {
          id: supervised.id,
          name: supervised.name,
          photo: supervisedData.photo,
          highlightedMetric: supervised.highlightedMetric,
          metrics: supervised.metrics,
        },
      });

      this.supervisionPresenter.setSupervisedLoading(false);
    });

    this.supervisionPresenter.setMealDeletionLoading(false, input.mealId);
  }
}
