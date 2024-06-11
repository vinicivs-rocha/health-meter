import { SignInViewModel } from "@/adapters/view-models/sign-in";
import { useAppInjector } from "@/hooks/app-injector";
import SignInController from "../../components/sign-in/controller";

export default function SignInPage() {
  const viewModel = useAppInjector<SignInViewModel>("SignInViewModel");
  return <SignInController viewModel={viewModel}></SignInController>;
}
