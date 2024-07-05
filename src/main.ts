import { SupabaseClient } from "@supabase/supabase-js";
import { router } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { Container } from "inversify";
import { SupabaseAuthenticationGateway } from "./adapters/gateways/authentication";
import { ExpoAuthenticationPresenter } from "./adapters/presenters/authentication";
import { ExpoSupervisionPresenter } from "./adapters/presenters/supervision";
import { SupabaseMealRepository } from "./adapters/repository/meal";
import { SupabaseSupervisedRepository } from "./adapters/repository/supervised";
import { IndexViewModel } from "./adapters/view-models";
import { SignInViewModel } from "./adapters/view-models/sign-in";
import { StartSupervisionViewModel } from "./adapters/view-models/start-supervision";
import { AuthenticationGateway } from "./domain/application/gateways/authentication";
import { AuthenticationPresenter } from "./domain/application/presenters/authentication";
import { SupervisionPresenter } from "./domain/application/presenters/supervision";
import { MealRepository } from "./domain/application/repositories/meal";
import { SupervisedRepository } from "./domain/application/repositories/supervised";
import { Authenticate } from "./domain/application/usecases/authenticate";
import { DeleteMeal } from "./domain/application/usecases/delete-meal";
import { SignIn } from "./domain/application/usecases/sign-in";
import { SignOut } from "./domain/application/usecases/sign-out";
import { StartSupervision } from "./domain/application/usecases/start-supervision";
import { SupervisionStore } from "./stores/supervision";
import { supabase } from "./utils/supabase";

const appInjector = new Container();

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

appInjector
  .bind<SupervisedRepository>("SupervisedRepository")
  .to(SupabaseSupervisedRepository);
appInjector.bind<MealRepository>("MealRepository").to(SupabaseMealRepository);
appInjector
  .bind<SupervisionPresenter>("SupervisionPresenter")
  .to(ExpoSupervisionPresenter);

appInjector.bind<StartSupervision>("StartSupervision").to(StartSupervision);

appInjector
  .bind<StartSupervisionViewModel>("StartSupervisionViewModel")
  .to(StartSupervisionViewModel);

appInjector
  .bind<SupervisionStore>("SupervisionStore")
  .to(SupervisionStore)
  .inSingletonScope();

appInjector.bind<SignOut>("SignOut").to(SignOut);

appInjector.bind<DeleteMeal>("DeleteMeal").to(DeleteMeal);

export { appInjector };

