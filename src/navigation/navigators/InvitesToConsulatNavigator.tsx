import React from 'react';
import TestTwoScreen from '../screens/TestTwoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const InvitesToConsulat = createNativeStackNavigator();

export default function InvitesToConsulatNavigator(): JSX.Element {
  return (
    <InvitesToConsulat.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <InvitesToConsulat.Screen name="TestScreen2" component={TestTwoScreen} />
    </InvitesToConsulat.Navigator>
  );
}
