import { StartSupervisionViewModel } from "@/adapters/view-models/start-supervision";
import StartSupervisionController from "@/components/supervision/controller";
import SupervisionHeader from "@/components/supervision/header";
import SupervisionView from "@/components/supervision/view";
import { useAppInjector } from "@/hooks/app-injector";
import { SupervisionStore } from "@/stores/supervision";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function StartSupervisionPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  if (!id) {
    throw new Error("User ID not found");
  }

  const viewModel = useAppInjector<StartSupervisionViewModel>(
    "StartSupervisionViewModel"
  );
  const store = useAppInjector<SupervisionStore>("SupervisionStore");

  return (
    <StartSupervisionController
      userId={id}
      viewModel={viewModel}
      View={(props) => (
        <SupervisionView
          header={<SupervisionHeader store={store}></SupervisionHeader>}
          highlightedMetric={<></>}
          meals={<></>}
          {...props}
        ></SupervisionView>
      )}
    ></StartSupervisionController>
  );
}
