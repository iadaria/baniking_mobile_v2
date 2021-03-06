import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  Input,
  AppText,
  Block,
  AppInput,
} from '~/src/app/common/components/UI';
import DeviceInfo from 'react-native-device-info';
import { ParamListBase } from '@react-navigation/native';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { loginPhone as loginPhoneAction } from '~/src/features/auth/store/authActions';
import { LoginPhonePayload } from '~/src/features/auth/store/saga/loginPhoneSaga';
import { AuthLogoLeft, AuthLogoRight, SwitcherIcon } from '~/src/assets';
import { defaultLoginInputs } from '../contracts/loginInputs';
import { colors, multiplier, sizes } from '~/src/app/common/constants';
import { phoneFormat } from '~/src/app/utils/common';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  loginPhone: (payload: LoginPhonePayload) => void;
}

const LoginFormContainer = ({
  navigation,
  scrollViewRef,
  loginPhone,
}: IProps): JSX.Element => {
  const [remember, setRemember] = useState<boolean>(true);
  const [recreate, setRecreate] = useState<boolean>(true);
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<LoginPhonePayload>();

  const handleEmailLogin = async () => {
    if (valuesRef.current) {
      const device_name = await DeviceInfo.getDeviceName();
      const formatedPhone = phoneFormat(valuesRef.current.phone);
      const data = {
        ...valuesRef.current,
        phone: formatedPhone,
        device_name,
        remember,
      };
      loginPhone(data);
      setRecreate(!recreate);
    }
  };

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultLoginInputs}
      scrollView={scrollViewRef}
      valuesRef={valuesRef}>
      <Block margin={[0, 0, 3]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          ??????????????????????
        </AppText>
        <AuthLogoRight />
      </Block>
      {/* Telephone Input */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          ??????????????
        </AppText>
      </Block>
      <Input
        style={{ borderRadius: 10 }}
        id="phone"
        placeholder="+7(___)___-__-__"
        center
        phone
        keyboardType="phone-pad"
        //isScrollToFocused
      />
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          ????????????
        </AppText>
        <TouchableOpacity
          style={{ position: 'absolute', right: 0 }}
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <AppText secondary medium size={sizes.text.label}>
            ???????????? ?????????????
          </AppText>
        </TouchableOpacity>
      </Block>
      <AppInput
        style={{ borderRadius: 10 }}
        id="password"
        placeholder="?????????????? ????????????"
        maxLength={50}
        secure
        center
      />
      <Block margin={[2, 0, 3]} row center middle>
        <TouchableOpacity onPress={setRemember.bind(null, !remember)}>
          <SwitcherIcon
            width={23 * multiplier}
            fill={remember ? colors.secondary : colors.caption}
          />
        </TouchableOpacity>
        {/* Gelroy medium 14 */}
        <Block row wrap margin={[0, 0, 0, 2]}>
          <AppText primary medium size={sizes.text.label}>
            ?????????????????? ???????? ?? ??????????????
          </AppText>
        </Block>
      </Block>
      {/* Button */}
      <AppButton onPress={handleEmailLogin}>
        <AppText center medium>
          ????????????????????????????????
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
};

const LoginFormConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    loginPhone: loginPhoneAction,
  },
)(LoginFormContainer);

export { LoginFormConnected as LoginForm };
