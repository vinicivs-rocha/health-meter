export interface MealAddingPresentingInput {
  defaultMealName: string;
}

export interface MealPresenter {
  presentMealAdding(data: MealAddingPresentingInput): Promise<void>;
}
