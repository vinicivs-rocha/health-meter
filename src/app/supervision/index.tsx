import { StartSupervisionViewModel } from "@/adapters/view-models/start-supervision";
import StartSupervisionController from "@/components/supervision/controller";
import SupervisionHeader from "@/components/supervision/header";
import HighlightedMetrics from "@/components/supervision/highlighted-metrics";
import Meal from "@/components/supervision/meal";
import SupervisionMeals from "@/components/supervision/meals";
import SupervisionView from "@/components/supervision/view";
import { useAppInjector } from "@/hooks/app-injector";
import { SupervisionStore } from "@/stores/supervision";
import React from "react";

export default function StartSupervisionPage() {
  const viewModel = useAppInjector<StartSupervisionViewModel>(
    "StartSupervisionViewModel"
  );
  const store = useAppInjector<SupervisionStore>("SupervisionStore");

  return (
    <StartSupervisionController
      viewModel={viewModel}
      View={(props) => (
        <SupervisionView
          Header={(props) => (
            <SupervisionHeader {...props} Store={store}></SupervisionHeader>
          )}
          HighlightedMetrics={(props) => (
            <HighlightedMetrics {...props} Store={store} />
          )}
          Meals={(props) => (
            <SupervisionMeals
              {...props}
              Store={store}
              Meal={(props) => <Meal {...props} Store={store} />}
            ></SupervisionMeals>
          )}
          {...props}
        ></SupervisionView>
      )}
    ></StartSupervisionController>
  );
}
