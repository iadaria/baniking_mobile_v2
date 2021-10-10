import React from 'react';
import { CabinetScreen } from '~/src/features/profiles/screens';
import { NotificationsScreen } from '../settings/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Profile = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Profile.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Profile.Screen name="CabinetScreen" component={CabinetScreen} />
      <Profile.Screen name="ProfileScreen" component={NotificationsScreen} />
    </Profile.Navigator>
  );
}
