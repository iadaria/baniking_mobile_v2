import React from 'react';
import {
  SettingsMenuScreen,
  // BaseSettingsScreen,
  SafeScreen,
  NotificationsScreen,
  RulesScreen,
  ContractScreen,
  HelpScreen,
} from './screens';
import { ProfileScreen } from '../profiles/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Settings = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Settings.Navigator
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Settings.Screen
        name="SettingsMenuScreen"
        component={SettingsMenuScreen}
      />
      <Settings.Screen name="ProfileScreen" component={ProfileScreen} />
      <Settings.Screen name="SafeScreen" component={SafeScreen} />
      <Settings.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Settings.Screen name="RulesScreen" component={RulesScreen} />
      <Settings.Screen name="ContractScreen" component={ContractScreen} />
      <Settings.Screen name="HelpScreen" component={HelpScreen} />
    </Settings.Navigator>
  );
}
