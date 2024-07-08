import { MealAddingViewModel } from "@/adapters/view-models/meal-adding";
import AddMealController from "@/components/add-meal/controller";
import MealAddView from "@/components/add-meal/view";
import { useAppInjector } from "@/hooks/app-injector";
import { MealStore } from "@/stores/meal";

export default function AddMealPage() {
  const viewModel = useAppInjector<MealAddingViewModel>("MealAddingViewModel");
  const store = useAppInjector<MealStore>("MealStore");

  return (
    <AddMealController
      viewModel={viewModel}
      View={(props) => <MealAddView Store={store} />}
    ></AddMealController>
  );
}
