import { MealAddingViewModel } from "@/adapters/view-models/meal-adding";
import AddMealController from "@/components/add-meal/controller";
import { useAppInjector } from "@/hooks/app-injector";

export default function AddMealPage() {
  const viewModel = useAppInjector<MealAddingViewModel>("MealAddingViewModel");
  return <AddMealController viewModel={viewModel}></AddMealController>;
}
