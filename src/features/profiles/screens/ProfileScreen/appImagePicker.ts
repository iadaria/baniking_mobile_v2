import { Dispatch, SetStateAction } from 'react';
import { Image as RNImage } from 'react-native';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import { getImageExtension } from '~/src/app/utils/system';
import { IUploadAvatar, TAcceptTypeAvatar } from '~/src/app/models/profile';

export const imageOptions: Options = {
  width: 400,
  height: 400,
  compressImageMaxWidth: 400,
  compressImageMaxHeight: 400,
  avoidEmptySpaceAroundImage: true,
  cropping: true,
  cropperCircleOverlay: true,
  mediaType: 'photo',
  cropperCancelText: 'Отмена',
  cropperChooseText: 'Выбрать',
};

interface IProps {
  setAvatarImage: Dispatch<SetStateAction<string>>;
}

export const takePhotoFromCamera = () => ImagePicker.openCamera(imageOptions);

export const choosePhotoFromLibrary = () => ImagePicker.openPicker(imageOptions);

export const getImageInfo = async (imagePath: string): Promise<IUploadAvatar | null> => {
  __DEV__ && console.log('imagePath', imagePath);
  let avatarInfo: IUploadAvatar | null = null;
  await RNImage.getSize(
    imagePath,
    (width: number, height: number) => {
      __DEV__ && console.log(width, height);
      avatarInfo = {
        file: imagePath,
        width,
        height,
        top: 0,
        left: 0,
        mime: getImageExtension(imagePath) as TAcceptTypeAvatar,
        size: 100000,
      };
    },
    (error) => {
      __DEV__ && console.log(error);
      avatarInfo = null;
    },
  );
  return avatarInfo;
};
