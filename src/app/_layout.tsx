import "reflect-metadata";
import { AppInjectorProvider } from "@/contexts/app-injector";
import { appInjector } from "@/main";
import { supabase } from "@/utils/supabase";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import { AppState, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export default function Layout() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <AppInjectorProvider appInjector={appInjector}>
      <StatusBar backgroundColor="transparent" translucent style="dark"></StatusBar>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "white" },
              }}
            />
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AppInjectorProvider>
  );
}
