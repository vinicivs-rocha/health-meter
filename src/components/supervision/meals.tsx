import { SupervisionStore } from "@/stores/supervision";
import { observer } from "mobx-react-lite";

export interface SupervisionMealsProps {
  Store: SupervisionStore;
  deleteMeal: (mealId: string) => void;
  startMealUpdating: (mealId: string) => void;
}

function SupervisionMeals({}: SupervisionMealsProps) {
  return <></>;
}

export default observer(SupervisionMeals);
