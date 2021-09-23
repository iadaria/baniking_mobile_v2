import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { IBather } from '~/src/app/models/bath';
//import { ICachedImage } from '~/src/app/models/persist';
//import { isCachedImage } from '~/src/app/utils/bathUtility';
import { defaultUserMaleImg } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  bathers: IBather[];
}

export default function BathBathers({ bathers }: IProps) {
  //const [cachedPhotos, setCachedPhotos] = useState<Map<number, ICachedImage>>(new Map());

  return (
    <>
      {bathers.map((bather: IBather, index: number) => (
        <Block key={`item-${index}`} margin={[0, 0, 1.5]} row center>
          <Block style={styles.avatarBorder}>
            <Image
              style={styles.avatar}
              source={{ uri: bather.avatar } || defaultUserMaleImg}
            />
          </Block>
          <Block margin={[0, 0, 0, 3.5]} column>
            <AppText trajan>{bather.name}</AppText>
            <AppText golder lightItalic>
              {bather.position}
            </AppText>
          </Block>
        </Block>
      ))}
    </>
  );
}

// useEffect(() => {
//   const countCached = cachedPhotos.size;
//   if (bathers && bathers.length > countCached) {
//     const newCachedPhotos = new Map<number, ICachedImage>();
//     for (let i = 0; i < bathers.length; i++) {
//       const [isCached, indexOf] = isCachedImage(bathers[i].avatar, persistImages.set);
//       if (isCached) {
//         newCachedPhotos.set(i, { uri: persistImages.images[indexOf].path });
//       }
//     }
//     // Проверяем добавилось ли хоть одно изображение
//     newCachedPhotos.size > countCached && setCachedPhotos(newCachedPhotos);
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [bathers, persistImages]);
