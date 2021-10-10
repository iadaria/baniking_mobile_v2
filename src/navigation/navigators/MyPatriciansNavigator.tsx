import React from 'react';
import TestTwoScreen from '../screens/TestTwoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MyPatricians = createNativeStackNavigator();

export default function MyPatriciansNavigator(): JSX.Element {
  return (
    <MyPatricians.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <MyPatricians.Screen name="TestScreen2" component={TestTwoScreen} />
    </MyPatricians.Navigator>
  );
}
