import React from 'react';
import { QrScreen } from '~/src/features/profiles/screens/QrScreen/QrScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Qr = createNativeStackNavigator();

export default function QrNavigator(): JSX.Element {
  return (
    <Qr.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Qr.Screen name="QrScreen" component={QrScreen} />
    </Qr.Navigator>
  );
}
