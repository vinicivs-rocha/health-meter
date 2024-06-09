import { IndexViewModel } from "@/adapters/view-models";
import IndexView from "./view";

interface IndexControllerProps {
  viewModel: IndexViewModel;
}

export default function IndexController({ viewModel }: IndexControllerProps) {
  const illustration = "@assets/illustration.png";
  const googleIcon = "@assets/google-icon.png";
  return (
    <IndexView
      illustration={illustration}
      googleIcon={googleIcon}
      login={() => viewModel.authenticateUser()}
    ></IndexView>
  );
}
