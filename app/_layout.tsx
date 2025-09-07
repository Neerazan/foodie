import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from 'react-native';

import useAuthStore from "@/store/auth.store";
import './global.css';

export default function RootLayout() {
  const { isLoading, isAuthenticated, fetchAuthenticatedUser } = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/(auth)/sign-in');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, isLoading]);

  if(!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" redirect={isAuthenticated} />
      <Stack.Screen name="(tabs)" redirect={!isAuthenticated} />
    </Stack>
  );
};
