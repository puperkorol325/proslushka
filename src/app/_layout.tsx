import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { YamapInstance } from 'react-native-yamap-plus';

const YANDEX_MAP_API_KEY: string = process.env.EXPO_PUBLIC_YANDEX_MAP_KEY || "";

YamapInstance.init(YANDEX_MAP_API_KEY);

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgotPassword" />
        <Stack.Screen name='/index' />
      </Stack>
    </ThemeProvider>
  );
}
