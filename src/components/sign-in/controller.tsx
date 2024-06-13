import { SignInViewModel } from "@/adapters/view-models/sign-in";
import SignInView from "./view";

interface SignInControllerProps {
  viewModel: SignInViewModel;
}

export default function SignInController({ viewModel }: SignInControllerProps) {
  return <SignInView login={() => viewModel.signIn()}></SignInView>;
}
