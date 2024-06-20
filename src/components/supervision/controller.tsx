import { StartSupervisionViewModel } from "@/adapters/view-models/start-supervision";
import { SupervisionStore } from "@/stores/supervision";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface StartSupervisionControllerProps {
  userId: string;
  viewModel: StartSupervisionViewModel;
  store: SupervisionStore;
}

const StartSupervisionController = observer(
  ({ userId, viewModel, store }: StartSupervisionControllerProps) => {
    useEffect(() => {
      viewModel.start({ userId });
    }, []);

    if (!store.supervisedLoading && !store.mealsLoading) {
      return null;
    }

    return (
      <View style={styles.pageContainer}>
        <ActivityIndicator
          size="large"
          color="#EAB308"
          style={styles.spinner}
        />
      </View>
    );
  }
);

export default StartSupervisionController;

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
