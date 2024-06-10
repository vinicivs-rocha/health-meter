import { AppInjectorProvider } from "@/contexts/app-injector";
import { Authenticate } from "@/domain/application/usecases/authenticate";
import { Stack } from "expo-router/stack";
import { Container } from "inversify";
import { IndexViewModel } from "./view-model";

const appInjector = new Container();
// TODO - add authenticate dependencies
appInjector.bind<Authenticate>("Authenticate").to(Authenticate);
appInjector.bind<IndexViewModel>("IndexViewModel").to(IndexViewModel);

export default function Layout() {
  return (
    <AppInjectorProvider appInjector={appInjector}>
      <Stack />
    </AppInjectorProvider>
  );
}
