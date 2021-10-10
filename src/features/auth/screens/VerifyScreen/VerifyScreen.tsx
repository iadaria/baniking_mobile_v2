import React from 'react';
import { ParamListBase, Route } from '@react-navigation/native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { VerifyForm } from './VerifyForm';
import { routes } from '~/src/navigation/helpers/routes';
import { BackButton } from '~/src/app/common/components/BackButton';
import { Action } from '~/src/app/common/constants';
import { logline } from '~/src/app/utils/debug';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: Route<string, { action: Action } | undefined>;
}

export function VerifyScreen({ navigation, route }: IProps) {
  const action = route?.params?.action!;

  logline('VerifyScreen **', route);

  return (
    <Block full base>
      <Block margin={[4, 0]}>
        <BackButton screen={routes.authNavigator.RegisterScreen} />
      </Block>
      <AppText h1>Подтверждение</AppText>
      <VerifyForm navigation={navigation} action={action} />
    </Block>
  );
}
