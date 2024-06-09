import { AppInjectorContext } from "@/contexts/app-injector";
import { useContext } from "react";

export function useAppInjector<T>(id: string): T {
  const context = useContext(AppInjectorContext);
  if (context === null) {
    throw new Error("useAppInjector must be used within a AppInjectorProvider");
  }
  return context.get<T>(id);
}
