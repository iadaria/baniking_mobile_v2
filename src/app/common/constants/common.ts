import { Image } from 'react-native';
import { defaultUserMaleImg } from '~/src/assets';

// export const USER_IMAGE_PATH = Image.resolveAssetSource('~/src/assets/images/png/user.png';
export const USER_IMAGE_PATH = Image.resolveAssetSource(defaultUserMaleImg).uri;

export const appPatterns = {
  filename: /^.*[\\\/]/,
};

export const WIDTH_EYE_BUTTON = 13;

export const MAX_DISTANCE = 200000;
