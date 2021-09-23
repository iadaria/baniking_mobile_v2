import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  LayoutChangeEvent,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ParamListBase, Route, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur';
import { transparentHeader as transparentHeaderAction } from '~/src/app/store/system/systemActions';
import { getProfileSettings as getProfileSettingsAction } from '~/src/features/profiles/store/profileActions';
import {
  initOrderCallInputs as initOrderCallInputsAction,
  orderCall as orderCallAction,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IProfile } from '~/src/app/models/profile';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors, isIos, multiplier } from '~/src/app/common/constants';
import { formatPhoneNumber } from '~/src/app/utils/system';
import OrderCallForm from './OrderCallForm';
import { IOrderCallInputs } from '../../contracts/orderCallInputs';
import { IOrderCall } from '~/src/app/models/bath';
import { routes } from '~/src/navigation/helpers/routes';
import { bathOneImg, CloseWhiteIcon } from '~/src/assets';
import { styles } from './styles';
import { logline } from '~/src/app/utils/debug';

interface IOrderCallParams {
  bathId: number;
  bathName: string;
  short_description: string;
  bathPhone: string;
}

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
  currentProfile: IProfile | null;
  defaultOrderCallInputs: IOrderCallInputs;
  getProfile: () => void;
  initOrderCallInputs: (orderCall: IOrderCall) => void;
  orderCall: (orderCallParams: IOrderCallParams) => void;
}

function OrderCallScreenContainer({
  route,
  navigation,
  currentProfile,
  getProfile,
  initOrderCallInputs,
  defaultOrderCallInputs,
  orderCall,
}: IProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [blockPosition, setBlockPosition] = useState<number>(0);

  const params: IOrderCallParams | undefined = (route?.params ||
    {}) as IOrderCallParams;
  const { bathId, bathName, short_description, bathPhone } = params;

  useEffect(() => {
    if (currentProfile) {
      logline('[OrderCallScreen/useEffect] getProfileSettings()', '');
      initOrderCallInputs({
        name: currentProfile.name,
        phone: currentProfile.phone,
      });
    } else {
      getProfile();
    }
  }, [currentProfile, getProfile, initOrderCallInputs]);

  return (
    <Block safe full>
      <Image source={bathOneImg} style={styles.blurImage} />
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={isIos ? 1 : 3}
        reducedTransparencyFallbackColor={colors.title}
      />
      <KeyboardWrapper>
        <ScrollView
          alwaysBounceVertical
          ref={scrollViewRef}
          style={styles.modalView}>
          {/* <Block safe full> */}
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate(routes.bathesTab.BathScreen);
              }
            }}>
            <CloseWhiteIcon />
          </TouchableOpacity>
          <AppText
            margin={[6 * multiplier, 0, 0]}
            transform="uppercase"
            height={28 * multiplier}
            trajan
            center
            h1>
            {bathName}
          </AppText>
          <AppText margin={[1, 0, 1.5]} secondary center tag>
            {short_description && `${short_description.substring(0, 25)} ...`}
          </AppText>
          <AppText margin={[2, 0, 1]} center>
            Вы можете позвонить по номеру
          </AppText>
          <AppText margin={[0, 0, 3.5 * multiplier]} center golder h2>
            {formatPhoneNumber(bathPhone)}
          </AppText>
          <AppText center>или</AppText>
          {/* Форма */}
          <Block
            onLayout={({ nativeEvent }: LayoutChangeEvent) =>
              setBlockPosition(nativeEvent.layout.y)
            }
            safe
            style={styles.modal}>
            <OrderCallForm
              navigation={navigation}
              bathId={bathId}
              orderCall={orderCall}
              scrollViewRef={scrollViewRef}
              blockPosition={blockPosition}
              defaultInputs={defaultOrderCallInputs}
            />
          </Block>
          <Block margin={[5, 0]} />
        </ScrollView>
      </KeyboardWrapper>
    </Block>
  );
}

const OrderCallConnected = connect(
  ({ profile, bath }: IRootState) => ({
    defaultOrderCallInputs: bath.inputs.orderCall,
    currentProfile: profile.currentUserProfile,
  }),
  {
    initOrderCallInputs: initOrderCallInputsAction,
    getProfile: getProfileSettingsAction,
    orderCall: orderCallAction,
  },
)(OrderCallScreenContainer);

export { OrderCallConnected as OrderCallScreen };
