import { SplashScreen, Stack } from "expo-router";
import './global.css';
import { useFonts } from 'expo-font';
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Quicksand_400: require("../assets/fonts/Quicksand-Regular.ttf"),
    Quicksand_500: require("../assets/fonts/Quicksand-Medium.ttf"),
    Quicksand_600: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    Quicksand_700: require("../assets/fonts/Quicksand-Bold.ttf"),
    Quicksand_800: require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error])
  

  return <Stack
    screenOptions={{
      headerShown: false,
    }}
  />;
}
