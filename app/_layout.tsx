import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './(tabs)';

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="(tabs)" component={Tabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
