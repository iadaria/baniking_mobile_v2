import React, { useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { phoneRegister as phoneRegisterAction } from '~/src/features/auth/store/authActions';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AuthLogo } from '~/src/assets';
import RegisterForm from './RegisterForm';
import SoialLoginBlock from '../components/SocialLoginBlock';
import { styles } from './styles';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { IRootState } from '~/src/app/store/rootReducer';
import { IErrors } from '~/src/app/utils/error';
import { multiplier } from '~/src/app/common/constants';
import { RegisterPayload } from '../../store/saga/registerPhoneSaga';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  phoneRegister: (payload: RegisterPayload) => void;
  errors: IErrors | null;
}

function RegisterContainer({ navigation, phoneRegister, errors }: IProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState<number | undefined>();

  return (
    <KeyboardWrapper>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        scrollToOverflowEnabled
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
          setScrollPosition(event.nativeEvent.contentOffset.y)
        }
        scrollEventThrottle={16}
        alwaysBounceHorizontal
        keyboardDismissMode="interactive"
        contentContainerStyle={styles.scrollViewContainer}>
        <Block full>
          <Block center margin={[5 * multiplier, 0, 3 * multiplier]}>
            <AuthLogo width={wp(11) * multiplier} />
          </Block>
          <Block style={styles.list} full base white>
            <RegisterForm
              scrollViewRef={scrollViewRef}
              phoneRegister={phoneRegister}
              scrollPosition={scrollPosition}
              errors={errors}
            />
            {/* Social login block */}
            <SoialLoginBlock />
            {/* Sign in */}
            <Block row middle>
              <AppText primary center>
                Уже зарегистрированы?
              </AppText>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <AppText secondary> Войдите</AppText>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardWrapper>
  );
}

const RegisterConnected = connect(
  ({ auth }: IRootState) => ({
    errors: auth.errors,
  }),
  {
    phoneRegister: phoneRegisterAction,
  },
)(RegisterContainer);

export { RegisterConnected as RegisterScreen };
