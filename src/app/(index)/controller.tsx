import { IndexViewModel } from "./view-model";

interface IndexControllerProps {
  viewModel: IndexViewModel;
}

export default function IndexController({ viewModel }: IndexControllerProps) {
  viewModel.authenticateUser();
  return <></>;
}
