import { SupervisionPresenter } from "@/domain/application/presenters/supervision";
import { Metric } from "@/domain/enterprise/entities/metric";
import { Supervised } from "@/domain/enterprise/entities/supervised";
import { SupervisionStore } from "@/stores/supervision";
import { inject, injectable } from "inversify";

@injectable()
export class ExpoSupervisionPresenter implements SupervisionPresenter {
  @inject("SupervisionStore") private readonly store!: SupervisionStore;

  presentError(message: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  presentCalorieGoal(goal: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async presentSupervised(supervised: Supervised): Promise<void> {
    this.store.supervised = supervised;
  }

  async setSupervisedLoading(state: boolean): Promise<void> {
    this.store.supervisedLoading = state;
  }

  async setMealDeletionLoading(state: boolean, mealId: string): Promise<void> {
    this.store.mealsDeletionLoading = {
      state,
      mealId,
    };
  }

  async presentIntake(intake: number): Promise<void> {
    this.store.highlightedIntake = intake;
  }

  async presentHighlightedMetric(metric: Metric): Promise<void> {
    this.store.highlightedMetric = metric;
  }

  async presentHighlightedMetricLoading(state: boolean): Promise<void> {
    this.store.highlightedMetricLoading = state;
  }
}
