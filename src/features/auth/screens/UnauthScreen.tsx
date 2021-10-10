import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { IAuthState } from '~/src/features/auth/store/authReducer';
import { useSelector } from 'react-redux';
import { routes } from '~/src/navigation/helpers/routes';
import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const UnauthScreen: React.FC<IProps> = ({ navigation }) => {
  const authenticated = useSelector((state: IAuthState) => state.authenticated);
  if (authenticated) {
    navigation.navigate(routes.navigators.AuthNavigator);
  } else {
    navigation.navigate(routes.navigators.DrawerNavigator);
  }

  return (
    <View>
      <Text>You are not authorized</Text>
    </View>
  );
};
