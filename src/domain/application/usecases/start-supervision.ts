import { Supervised } from "@/domain/enterprise/entities/supervised";
import { inject, injectable } from "inversify";
import { Usecase } from "../../../core/usecases/usecase";
import type { SupervisionPresenter } from "../presenters/supervision";
import { MetricRepository } from "../repositories/metric";
import type { SupervisedRepository } from "../repositories/supervised";

export type StartSupervisionOutput = {
  supervised: Supervised;
};

@injectable()
export class StartSupervision implements Usecase<[], StartSupervisionOutput> {
  output!: StartSupervisionOutput;

  @inject("SupervisedRepository")
  private supervisedRepository!: SupervisedRepository;
  @inject("SupervisionPresenter")
  private supervisionPresenter!: SupervisionPresenter;
  @inject("MetricRepository")
  private metricRepository!: MetricRepository;

  async execute() {
    try {
      const supervised = await this.supervisedRepository.findCurrent();
      const highlightedMetric =
        await this.metricRepository.findHighlightedInIds(supervised.metrics);

      if (!highlightedMetric) {
        throw new Error("No highlighted metric found");
      }

      const highlightedIntake = supervised.meals.reduce(
        (acc, meal) =>
          acc +
          meal.foods.reduce(
            (acc, food) =>
              acc +
              food.intakes
                .filter((intake) => intake.metricId === highlightedMetric.id)
                .reduce((acc, intake) => acc + intake.value, 0),
            0
          ),
        0
      );

      this.supervisionPresenter.presentSupervised(supervised);
      this.supervisionPresenter.presentIntake(highlightedIntake);
      this.supervisionPresenter.presentHighlightedMetric(highlightedMetric);

      this.supervisionPresenter.setSupervisedLoading(false);
      this.supervisionPresenter.presentHighlightedMetricLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
}
