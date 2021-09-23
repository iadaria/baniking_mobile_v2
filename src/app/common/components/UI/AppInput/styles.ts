import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';
import { IInputStyleProps } from '~/src/app/models/ui';

export const styles = StyleSheet.create<IInputStyleProps>({
  block: {
    borderWidth: 0.8,
    borderRadius: sizes.radius,
    borderColor: colors.input.border,
  },
  input: {
    fontSize: wp(sizes.font.base),
    color: colors.input.text,
    height: hp(sizes.input.big.height),
    paddingHorizontal: wp(sizes.input.paddingHorizontal),
  },
  /* toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: sizes.offset.base * 2,
    height: sizes.offset.base * 2,
    top: sizes.offset.base,
    right: 0,
  }, */
  labelWrapper: {
    position: 'absolute',
    left: 0,
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderWidth: 0.5,
    // borderColor: 'red',
    paddingHorizontal: wp(1),
  },
  label: {},
  center: {
    /* textAlign: 'center' */
  },
  secure: {
    /* paddingHorizontal: 50,  marginLeft: wp(WIDTH_EYE_BUTTON) */
  },
});
