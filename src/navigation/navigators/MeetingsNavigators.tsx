import React from 'react';
import TestTwoScreen from '../screens/TestTwoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Meetings = createNativeStackNavigator();

export default function MeetingsNavigator(): JSX.Element {
  return (
    <Meetings.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Meetings.Screen name="TestScreen2" component={TestTwoScreen} />
    </Meetings.Navigator>
  );
}
