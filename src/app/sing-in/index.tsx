import { SignInViewModel } from "@/adapters/view-models/sign-in";
import { useAppInjector } from "@/hooks/app-injector";

export default function SignInPage() {
  const viewModel = useAppInjector<SignInViewModel>("SignInViewModel");
}
