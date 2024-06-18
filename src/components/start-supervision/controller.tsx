import { StartSupervisionViewModel } from "@/adapters/view-models/start-supervision";

interface StartSupervisionControllerProps {
  userId: string;
  viewModel: StartSupervisionViewModel;
}

export default function StartSupervisionController({
  userId,
  viewModel,
}: StartSupervisionControllerProps) {
  viewModel.start({ userId });
  return <></>;
}
