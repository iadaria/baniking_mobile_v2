import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CloseMenu, MenuHumberger, Notify } from '~/src/assets';
import { AppHeaderTitle } from '~/src/navigation/components/AppHeaderTitle';
import { colors, multiplier } from '../constants';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { Block } from './UI';
import { BackButton } from '~/src/app/common/components/BackButton';
import { styles as s } from './styles';

const HeaderIconOpen = () => {
  return (
    <TouchableOpacity
      style={s.padding}
      onPress={() => {
        RootNavigation.openDrawer();
      }}>
      <MenuHumberger />
    </TouchableOpacity>
  );
};

const HeaderIconClose = () => {
  return (
    <TouchableOpacity
      style={s.padding}
      onPress={() => {
        RootNavigation.closeDrawer();
      }}>
      <CloseMenu />
    </TouchableOpacity>
  );
};

const HeaderRightButton = () => (
  <TouchableOpacity onPress={() => {}}>
    <Notify fill={colors.disable} opacity={0.25} width={wp(10) * multiplier} />
  </TouchableOpacity>
);

type IconKinds = {
  open: ReactNode;
  close: ReactNode;
  backward: ReactNode;
};

const iconKinds: IconKinds = {
  open: <HeaderIconOpen />,
  close: <HeaderIconClose />,
  backward: <BackButton />,
};

interface IHeader {
  iconKind?: keyof IconKinds;
  screen?: string;
}

export function Header({ iconKind = 'open' }: IHeader) {
  const headerIcon = iconKinds[iconKind] as React.ElementType;
  return (
    <Block row center space="between">
      {headerIcon}
      <Block center row>
        <AppHeaderTitle />
        <HeaderRightButton />
      </Block>
    </Block>
  );
}
