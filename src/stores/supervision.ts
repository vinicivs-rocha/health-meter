import { Metric } from "@/domain/enterprise/entities/metric";
import { Supervised } from "@/domain/enterprise/entities/supervised";
import { injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";

type SetMealsDeletionLoadingInput = {
  mealId: string;
  state: boolean;
};

@injectable()
export class SupervisionStore {
  private _supervisedLoading: boolean = true;
  private _supervised: Supervised | null = null;
  private _mealsDeletionLoading = new Map<string, boolean>();
  private _highlightedIntake: number = 0;
  private _highlightedMetric: Metric | null = null;
  private _highlightedMetricLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  set supervisedLoading(state: boolean) {
    runInAction(() => {
      this._supervisedLoading = state;
    });
  }

  get supervisedLoading() {
    return this._supervisedLoading;
  }

  set supervised(supervised: Supervised) {
    runInAction(() => {
      this._supervised = supervised;
    });
  }

  get supervised(): Supervised | null {
    return this._supervised;
  }

  get meals() {
    return this._supervised?.meals ?? [];
  }

  set mealsDeletionLoading({ mealId, state }: SetMealsDeletionLoadingInput) {
    runInAction(() => {
      this._mealsDeletionLoading.set(mealId, state);
    });
  }

  get highlightedIntake() {
    return this._highlightedIntake;
  }

  set highlightedIntake(value: number) {
    runInAction(() => {
      this._highlightedIntake = value;
    });
  }

  get highlightedMetric(): Metric | null {
    return this._highlightedMetric;
  }

  set highlightedMetric(metric: Metric) {
    runInAction(() => {
      this._highlightedMetric = metric;
    });
  }

  get highlightedMetricLoading() {
    return this._highlightedMetricLoading;
  }

  set highlightedMetricLoading(state: boolean) {
    runInAction(() => {
      this._highlightedMetricLoading = state;
    });
  }

  getMealDeletionLoadingState(mealId: string) {
    return this._mealsDeletionLoading.get(mealId) ?? false;
  }
}
