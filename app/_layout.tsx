import { SplashScreen, Stack } from "expo-router";
import './global.css';
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Quicksand_400: require("../assets/fonts/Quicksand-Regular.ttf"),
    Quicksand_500: require("../assets/fonts/Quicksand-Medium.ttf"),
    Quicksand_600: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    Quicksand_700: require("../assets/fonts/Quicksand-Bold.ttf"),
    Quicksand_800: require("../assets/fonts/Quicksand-Light.ttf"),
  });

  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error])
  
  useEffect(() => {
    fetchAuthenticatedUser();
  }, [])

  if(!fontsLoaded || isLoading) return null;

  return <Stack
    screenOptions={{
      headerShown: false,
    }}
  />;
}
