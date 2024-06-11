import { SignInViewModel } from "@/adapters/view-models/sign-in";
import SignInView from "./view";

interface SignInControllerProps {
  viewModel: SignInViewModel;
}

export default function SignInController({ viewModel }: SignInControllerProps) {
  const googleIcon = "@assets/google-icon.png";
  const illustration = "@assets/illustration.png";

  return (
    <SignInView
      illustration={illustration}
      googleIcon={googleIcon}
      login={() => viewModel.signIn({ email: "" })}
    ></SignInView>
  );
}
