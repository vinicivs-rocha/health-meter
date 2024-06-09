import { Container } from "inversify";
import { createContext } from "react";

export const AppInjectorContext = createContext<Container | null>(null);

interface AppInjectorProviderProps {
  children: React.ReactNode;
  appInjector: Container;
}

export function AppInjectorProvider({
  children,
  appInjector,
}: AppInjectorProviderProps) {
  return (
    <AppInjectorContext.Provider value={appInjector}>
      {children}
    </AppInjectorContext.Provider>
  );
}
