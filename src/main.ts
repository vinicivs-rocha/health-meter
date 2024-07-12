import { SupabaseClient } from "@supabase/supabase-js";
import { router } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { Container } from "inversify";
import { SupabaseAuthenticationGateway } from "./adapters/gateways/authentication";
import { ExpoAuthenticationPresenter } from "./adapters/presenters/authentication";
import { ExpoMealPresenter } from "./adapters/presenters/meal";
import { ExpoSupervisionPresenter } from "./adapters/presenters/supervision";
import { SupabaseSupervisedRepository } from "./adapters/repository/supervised";
import { IndexViewModel } from "./adapters/view-models";
import { MealAddingViewModel } from "./adapters/view-models/meal-adding";
import { SignInViewModel } from "./adapters/view-models/sign-in";
import { StartSupervisionViewModel } from "./adapters/view-models/start-supervision";
import { AuthenticationGateway } from "./domain/application/gateways/authentication";
import { AuthenticationPresenter } from "./domain/application/presenters/authentication";
import { MealPresenter } from "./domain/application/presenters/meal";
import { SupervisionPresenter } from "./domain/application/presenters/supervision";
import { MetricRepository } from "./domain/application/repositories/metric";
import { SupervisedRepository } from "./domain/application/repositories/supervised";
import { Authenticate } from "./domain/application/usecases/authenticate";
import { DeleteMeal } from "./domain/application/usecases/delete-meal";
import { SignIn } from "./domain/application/usecases/sign-in";
import { SignOut } from "./domain/application/usecases/sign-out";
import { StartMealAdding } from "./domain/application/usecases/start-meal-adding";
import { StartSupervision } from "./domain/application/usecases/start-supervision";
import { MealStore } from "./stores/meal";
import { SupervisionStore } from "./stores/supervision";
import { supabase } from "./utils/supabase";
import { SupabaseMetricRepository } from "./adapters/repository/metric";

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

appInjector.bind<MealStore>("MealStore").to(MealStore).inSingletonScope();

appInjector.bind<MealPresenter>("MealPresenter").to(ExpoMealPresenter);

appInjector.bind<StartMealAdding>("StartMealAdding").to(StartMealAdding);

appInjector
  .bind<MealAddingViewModel>("MealAddingViewModel")
  .to(MealAddingViewModel);

appInjector
  .bind<MetricRepository>("MetricRepository")
  .to(SupabaseMetricRepository);

export { appInjector };

