import React from 'react';
import { CabinetScreen } from './screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Cabinet = createNativeStackNavigator();

export default function CabinetNavigator() {
  return (
    <Cabinet.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Cabinet.Screen name="CabinetScreen" component={CabinetScreen} />
    </Cabinet.Navigator>
  );
}
