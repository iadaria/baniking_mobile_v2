import React from 'react';
import TestTwoScreen from '../screens/TestTwoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Receipts = createNativeStackNavigator();

export default function ReceiptsNavigator(): JSX.Element {
  return (
    <Receipts.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Receipts.Screen name="TestScreen2" component={TestTwoScreen} />
    </Receipts.Navigator>
  );
}
