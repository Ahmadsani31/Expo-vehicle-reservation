import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  SafeAreaProvider,

} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "./../global.css"
import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { Alert, BackHandler, Platform } from 'react-native';
import { AuthProvider, useAuth } from '@/context/authContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        // Kalau masih bisa mundur (ada history), cukup back saja
        router.back();
      } else {
        // Kalau tidak bisa mundur (sudah di root), tampilkan alert keluar
        Alert.alert(
          'Konfirmasi Keluar',
          'Apakah Anda yakin ingin keluar dari aplikasi?',
          [
            {
              text: 'Tidak',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Ya',
              onPress: () => BackHandler.exitApp(),
            },
          ]
        );
      }

      return true; // <- Wajib! Supaya sistem back tidak langsung nutup
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [router]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
          <MainLayout />
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="(protected)" options={{
        headerShown: false,
      }} />
    </Stack>
  );
}
