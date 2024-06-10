import { IndexViewModel } from "@/adapters/view-models";

interface IndexControllerProps {
  viewModel: IndexViewModel;
}

export default function IndexController({ viewModel }: IndexControllerProps) {
  viewModel.authenticateUser();
  return <></>;
}
