import React, { useContext, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Stack, Tabs, useRouter } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/context/authContext';
import SafeAreaView from '@/components/SafeAreaView';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Alert, BackHandler } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export const unstable_settings = {
  initialRouteName: '(protected)',
};

export default function TabLayout() {
  const { token } = useAuth();

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

  if (!token) {
    return null;
  }

  return (
    <SafeAreaView noTop={true} style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarActiveTintColor: "teal",
          tabBarStyle: {
            paddingTop: 10,
            height: 70,
          },
          headerTitleStyle: {
            color: 'white', // 🎯 Ini ubah font header jadi putih
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#14B8A6',
            borderBottomWidth: 0,
          },
          // headerShadowVisible: false,
          // headerTintColor: 'white',
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="numeric-1-box-multiple" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="perjalanan"
          options={{
            title: 'Pemakaian',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="numeric-2-box-multiple" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: 'Data Kendaraan',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="numeric-3-box-multiple" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="numeric-4-box-multiple" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="kendaraan/detail"
          options={{
            href: null,
            title: 'Detail Kendaraan',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'teal',
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
