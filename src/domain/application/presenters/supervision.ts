import { Supervised } from "@/domain/enterprise/entities/supervised";

export interface SupervisionPresenter {
  setSupervisedLoading(state: boolean): Promise<void>;
  setMealDeletionLoading(state: boolean, mealId: string): Promise<void>;
  presentSupervised(data: Supervised): Promise<void>;
  presentError(message: string): Promise<void>;
  presentCalorieGoal(goal: number): Promise<void>;
  presentIntake(intake: number): Promise<void>;
}
