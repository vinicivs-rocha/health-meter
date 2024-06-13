import "reflect-metadata";
import { AppInjectorProvider } from "@/contexts/app-injector";
import { appInjector } from "@/main";
import { supabase } from "@/utils/supabase";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import { AppState, SafeAreaView, StatusBar } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Layout() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <AppInjectorProvider appInjector={appInjector}>
      <SafeAreaView
        style={{ flex: 1, paddingVertical: StatusBar.currentHeight }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </AppInjectorProvider>
  );
}
