import { StartSupervisionViewModel } from "@/adapters/view-models/start-supervision";
import StartSupervisionController from "@/components/supervision/controller";
import { useAppInjector } from "@/hooks/app-injector";
import { SupervisionStore } from "@/stores/supervision";
import { useLocalSearchParams } from "expo-router";

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
      store={store}
    ></StartSupervisionController>
  );
}
