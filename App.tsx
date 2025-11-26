import 'react-native-gesture-handler';
import React from 'react';
import { I18nManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AppDataProvider } from './src/context/AppDataContext';
import { StatusBar } from 'expo-status-bar';

I18nManager.allowRTL(true);

export default function App() {
  return (
    <SafeAreaProvider>
      <AppDataProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </AppDataProvider>
    </SafeAreaProvider>
  );
}
