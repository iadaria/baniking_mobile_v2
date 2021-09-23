import { Dimensions, Platform, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window');
import { /* widthPercentageToDP as wp,  */ heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

const iphoneXSize = 812;
const iphoneXrAndXsMaxSize = 896;
export const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === iphoneXSize ||
    width === iphoneXSize ||
    height === iphoneXrAndXsMaxSize ||
    width === iphoneXrAndXsMaxSize);

export const minSize = 44;

export const windowWidth = width;
export const windowHeight = height;

let privateStatusBarHeight;
let privateappBarHeight;

if (isIos) {
  privateStatusBarHeight = isIphoneX ? 44 : 20;
  privateappBarHeight = minSize;
} else {
  privateStatusBarHeight = StatusBar.currentHeight || 0;
  privateappBarHeight = 56;
}

export const statusBarHeight = privateStatusBarHeight;
export const appBarHeight = privateappBarHeight;
export const headerHeight = statusBarHeight + appBarHeight;
export const bottomTabBarHeight = 56;
export const bottomSpace = isIphoneX ? 34 : 0;
export const bottomTabBarWithSpaceHeight = bottomTabBarHeight + bottomSpace;

export const screenHeight = windowHeight - headerHeight - bottomTabBarWithSpaceHeight;

export const designWidth = 375;
export const currentLanguage = 'ru-RU';
export const stickyHeaderIndices = [0];

export const heightScreen: number = Dimensions.get('window').height;

export const multiplier = heightScreen > 700 ? 1 : heightScreen > 600 ? 0.85 : 0.78;
export const logoMultiplier = heightScreen > 700 ? 1 : 0.75;
export const multiHeightLine = heightScreen > 700 ? 1 : 0.5;
export const appHeaderHeight = isAndroid ? hp(7) : hp(8);
