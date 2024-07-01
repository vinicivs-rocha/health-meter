import { MetricIntake } from "@/domain/enterprise/value-objects/metric-intake";

export type MealData = {
  id: string;
  name: string;
  createdAt: Date;
  nutrionalValues: MetricIntake[];
};

export interface MealRepository {
  findById(id: string): Promise<MealData | null>;
  findByIds(ids: string[]): Promise<MealData[]>;
  findAllBySupervised(supervisedId: string): Promise<MealData[]>;
}
