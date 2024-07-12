import { Supervised } from "@/domain/enterprise/entities/supervised";

export interface SupervisedRepository {
  findCurrent(): Promise<Supervised>;
  deleteMeal(mealId: string): Promise<void>;
}
