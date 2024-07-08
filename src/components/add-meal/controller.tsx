import { MealAddingViewModel } from "@/adapters/view-models/meal-adding";
import { AddMealViewProps } from "./view";

export interface AddMealControllerProps {
  viewModel: MealAddingViewModel;
  View: (props: OmitUppercase<AddMealViewProps>) => React.ReactNode;
}

export default function AddMealController({ viewModel, View }: AddMealControllerProps) {
  return <View />;
}
