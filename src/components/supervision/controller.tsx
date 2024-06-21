import { StartSupervisionViewModel } from "@/adapters/view-models/start-supervision";
import { SupervisionStore } from "@/stores/supervision";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import SupervisionHeader from "./header";

interface StartSupervisionControllerProps {
  userId: string;
  viewModel: StartSupervisionViewModel;
  store: SupervisionStore;
}

export default function StartSupervisionController({
  userId,
  viewModel,
  store,
}: StartSupervisionControllerProps) {
  useEffect(() => {
    viewModel.start({ userId });
  }, []);

  if (!store.supervisedLoading && !store.mealsLoading) {
    return null;
  }

  return <SupervisionHeader store={store} />;
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
