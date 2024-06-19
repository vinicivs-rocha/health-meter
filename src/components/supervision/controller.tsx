import { StartSupervisionViewModel } from "@/adapters/view-models/start-supervision";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface StartSupervisionControllerProps {
  userId: string;
  viewModel: StartSupervisionViewModel;
}

export default function StartSupervisionController({
  userId,
  viewModel,
}: StartSupervisionControllerProps) {
  viewModel.start({ userId });
  return (
    <View style={styles.pageContainer}>
      <ActivityIndicator size="large" color="#EAB308" style={styles.spinner} />
    </View>
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