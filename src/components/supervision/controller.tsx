import { StartSupervisionViewModel } from "@/adapters/view-models/start-supervision";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SupervisionViewProps } from "./view";

interface StartSupervisionControllerProps {
  userId: string;
  viewModel: StartSupervisionViewModel;
  View: (props: OmitUppercase<SupervisionViewProps>) => React.ReactNode;
}

export default function StartSupervisionController({
  userId,
  viewModel,
  View,
}: StartSupervisionControllerProps) {
  useEffect(() => {
    viewModel.start({ userId });
  }, []);

  return (
    <>
      <View
        startMealAdding={() => console.log("add meal")}
        checkHistory={() => console.log("checkHistory")}
        logout={() => viewModel.logout()}
        startMetricGoalChange={() => console.log("change goal")}
        deleteMeal={(mealId: string) => console.log(`delete meal ${mealId}`)}
        startMealUpdating={(mealId: string) =>
          console.log(`update meal ${mealId}`)
        }
      ></View>
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    transform: [{ scale: 3 }],
  },
});
