import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalReducer';
import { isIos, windowHeight } from '../constants';
import { colors } from '~/src/app/common/constants';
import { Blurhash } from 'react-native-blurhash';

export default function ModalWrapper({ children, header }: any) {
  const dispatch = useDispatch();

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => dispatch(closeModal())}>
      <Blurhash
        style={styles.absolute}
        blurhash="p36kFrD%WBxaIooLWW~UM{WCofRkoLWC00xuofR*t8j?ay00xtt7R*s:WVj@%haKofWpnha}of?bofWBayoIoLkC"
      />
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  blur: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    opacity: isIos ? 0.95 : 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: windowHeight + 20,
    //height: windowHeight,
  },
});
