import { AppInjectorProvider } from "@/contexts/app-injector";
import { appInjector } from "@/main";
import { supabase } from "@/utils/supabase";
import { Stack } from "expo-router/stack";
import { AppState } from "react-native";
import "reflect-metadata";

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
