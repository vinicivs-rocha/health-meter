import { MealAddingViewModel } from "@/adapters/view-models/meal-adding";
import { Text } from "react-native";

export interface AddMealControllerProps {
  viewModel: MealAddingViewModel;
}

export default function AddMealController({
  viewModel,
}: AddMealControllerProps) {
  return <Text>Add Meal</Text>;
}
