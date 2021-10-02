import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: wp(5),
    left: wp(3),
    zIndex: 3,
    backgroundColor: 'rgba(126, 126, 126, 0.8)',
    padding: wp(3),
  },
});
