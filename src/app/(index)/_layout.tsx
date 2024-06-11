import { SupabaseAuthenticationGateway } from "@/adapters/gateways/authentication";
import { ExpoAuthenticationPresenter } from "@/adapters/presenters/authentication";
import { SignInViewModel } from "@/adapters/view-models/sign-in";
import { AppInjectorProvider } from "@/contexts/app-injector";
import { AuthenticationGateway } from "@/domain/application/gateways/authentication";
import { AuthenticationPresenter } from "@/domain/application/presenters/authentication";
import { Authenticate } from "@/domain/application/usecases/authenticate";
import { SignIn } from "@/domain/application/usecases/sign-in";
import { supabase } from "@/utils/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { router } from "expo-router";
import { Stack } from "expo-router/stack";
import { ExpoRouter } from "expo-router/types/expo-router";
import { Container } from "inversify";
import { AppState } from "react-native";
import "reflect-metadata";
import { IndexViewModel } from "../../adapters/view-models";

const appInjector = new Container();
// TODO - add authenticate dependencies
appInjector.bind<SupabaseClient>("SupabaseClient").toConstantValue(supabase);
appInjector
  .bind<AuthenticationGateway>("AuthenticationGateway")
  .to(SupabaseAuthenticationGateway);

appInjector.bind<ExpoRouter.Router>("ExpoRouter").toConstantValue(router);
appInjector
  .bind<AuthenticationPresenter>("AuthenticationPresenter")
  .to(ExpoAuthenticationPresenter);

appInjector.bind<Authenticate>("Authenticate").to(Authenticate);
appInjector.bind<SignIn>("SignIn").to(SignIn);

appInjector.bind<IndexViewModel>("IndexViewModel").to(IndexViewModel);
appInjector.bind<SignInViewModel>("SignInViewModel").to(SignInViewModel);

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Layout() {
  return (
    <AppInjectorProvider appInjector={appInjector}>
      <Stack />
    </AppInjectorProvider>
  );
}
