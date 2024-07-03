import { MetricIntake } from "@/domain/enterprise/value-objects/metric-intake";

export type MealData = {
  id: string;
  name: string;
  createdAt: Date;
  metricIntakes: MetricIntake[];
};

export type MealDeletionData = {
  mealId: string;
};

export interface MealRepository {
  findById(id: string): Promise<MealData | null>;
  findByIds(ids: string[]): Promise<MealData[]>;
  findAllBySupervised(supervisedId: string): Promise<MealData[]>;
  delete(data: MealDeletionData): Promise<MealData[]>;
}
