import { DefaultTheme } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';

const { width } = Dimensions.get('window');

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    //shadowColor: 'transparent', // delete the bottomBorder for IOS
  },
  headerTitleAlign: 'left', // for IOS to full widht
};

export const appDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: colors.primary,
    primary: colors.primary,
    background: colors.primary,
  },
};

export const appDrawerStyle = (multiMargin: number): StyleProp<ViewStyle> => ({
  width,
  paddingVertical: hp(sizes.offset.base / 3) * multiMargin, // TODO depend on android version
  paddingHorizontal: wp(sizes.offset.base - 3),
  backgroundColor: colors.primary,
});

export const appDrawerItemStyle: StyleProp<ViewStyle> = {
  marginBottom: hp(1.25),
};
