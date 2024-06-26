import type { NutritionalValue } from "../../enterprise/value-objects/nutritional-value";

export type MealData = {
  id: string;
  name: string;
  createdAt: Date;
  nutrionalValues: NutritionalValue[];
};

export interface MealRepository {
  findById(id: string): Promise<MealData | null>;
  findByIds(ids: string[]): Promise<MealData[]>;
  findAllBySupervised(supervisedId: string): Promise<MealData[]>;
}
