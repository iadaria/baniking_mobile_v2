import React from 'react';
import {
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  VerifyScreen,
  RegisterCompleteScreen,
} from './screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Auth = createNativeStackNavigator();

export default function AuthNavigator(): JSX.Element {
  return (
    <Auth.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen
        name="RegisterCompleteScreen"
        component={RegisterCompleteScreen}
      />
      <Auth.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Auth.Screen name="VerifyScreen" component={VerifyScreen} />
    </Auth.Navigator>
  );
}
