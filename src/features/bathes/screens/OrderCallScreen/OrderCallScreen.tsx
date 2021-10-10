import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { LayoutChangeEvent, ScrollView, TouchableOpacity } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { getProfileSettings as getProfileSettingsAction } from '~/src/features/profiles/store/profileActions';
import {
  initOrderCallInputs as initOrderCallInputsAction,
  orderCall as orderCallAction,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IProfile } from '~/src/app/models/profile';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { AppText, Block } from '~/src/app/common/components/UI';
import { multiplier } from '~/src/app/common/constants';
import { formatPhoneNumber } from '~/src/app/utils/system';
import OrderCallForm from './OrderCallForm';
import { OrderCallInputs } from '../../contracts/orderCallInputs';
import { IBathDetailed, OrderCall } from '~/src/app/models/bath';
import { routes } from '~/src/navigation/helpers/routes';
import { CloseWhiteIcon } from '~/src/assets';
import { styles } from './styles';
import { logline } from '~/src/app/utils/debug';
import { OrderCallPayload } from '../../store/saga/orderCallSaga';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Blurhash } from 'react-native-blurhash';

interface IProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  selectedBath: IBathDetailed | null;
  currentProfile: IProfile | null;
  defaultOrderCallInputs: OrderCallInputs;
  getProfile: () => void;
  initOrderCallInputs: (orderCall: OrderCall) => void;
  orderCall: (orderCallPayload: OrderCallPayload) => void;
}

function OrderCallScreenContainer({
  //route,
  selectedBath,
  navigation,
  currentProfile,
  getProfile,
  initOrderCallInputs,
  defaultOrderCallInputs,
  orderCall,
}: IProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [blockPosition, setBlockPosition] = useState<number>(0);

  /*   const params: OrderCallParams | undefined = (route?.params ||
    {}) as OrderCallParams; */
  const {
    id: bathId,
    name: bathName,
    short_description,
    phone: bathPhone,
  } = selectedBath!;

  useEffect(() => {
    if (currentProfile) {
      logline('[OrderCallScreen/useEffect] getProfileSettings()', '');
      initOrderCallInputs({
        name: currentProfile.name || '',
        phone: currentProfile.phone,
      });
    } else {
      getProfile();
    }
  }, [currentProfile, getProfile, initOrderCallInputs]);

  return (
    <Block safe full>
      <Blurhash
        style={styles.t1}
        blurhash="p36kFrD%WBxaIooLWW~UM{WCofRkoLWC00xuofR*t8j?ay00xtt7R*s:WVj@%haKofWpnha}of?bofWBayoIoLkC"
      />
      {/* <Image source={bathOneImg} style={styles.blurImage} /> */}
      <KeyboardWrapper>
        <ScrollView
          alwaysBounceVertical
          ref={scrollViewRef}
          style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate(routes.bathesTab.Bath);
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
    selectedBath: bath.selectedBath,
  }),
  {
    initOrderCallInputs: initOrderCallInputsAction,
    getProfile: getProfileSettingsAction,
    orderCall: orderCallAction,
  },
)(OrderCallScreenContainer);

export { OrderCallConnected as OrderCallScreen };
