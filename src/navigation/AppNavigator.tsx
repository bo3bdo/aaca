import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { CardListScreen } from '../screens/CardListScreen';
import { CardFormScreen } from '../screens/CardFormScreen';
import { CategoryManagementScreen } from '../screens/CategoryManagementScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamList = {
  Tabs: undefined;
  CardForm: { cardId?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarLabel: 'الرئيسية', tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }}
    />
    <Tab.Screen
      name="Cards"
      component={CardListScreen}
      options={{ tabBarLabel: 'البطاقات', tabBarIcon: ({ color, size }) => <Ionicons name="grid" color={color} size={size} /> }}
    />
    <Tab.Screen
      name="Categories"
      component={CategoryManagementScreen}
      options={{
        tabBarLabel: 'التصنيفات',
        tabBarIcon: ({ color, size }) => <Ionicons name="albums" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ tabBarLabel: 'الإعدادات', tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} /> }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer theme={DefaultTheme}>
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="CardForm" component={CardFormScreen} options={{ title: 'إضافة / تعديل بطاقة', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  </NavigationContainer>
);
