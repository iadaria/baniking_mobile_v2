import React, { useRef, useState } from 'react';
import { Animated, FlatList, Image } from 'react-native';
import { styles } from './styles';
import { Block } from '~/src/app/common/components/UI';
import { windowWidth } from '~/src/app/common/constants';
import { Route } from '@react-navigation/native';
import Tabs from './Tabs';
import { BackButton } from '~/src/app/common/components/BackButton';
import { Blurhash } from 'react-native-blurhash';

interface IProps {
  route: Route<string, object | undefined>;
}

interface IParams {
  photos: string[];
  currentIndex: number;
}

export interface ITab {
  uri: string;
  ref: any;
}

export function BathesPhotosScreen({ route }: IProps) {
  const emptyParams = { photos: [], index: 0 };
  const { photos, currentIndex } = (route?.params || emptyParams) as IParams;
  const [newCurrentIndex, setCurrentIndex] = useState(currentIndex);
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef<FlatList<any>>();

  if (!photos.length) {
    return null;
  }

  let onScrollEnd = e => {
    let pageNumber = Math.min(
      Math.max(
        Math.floor(e.nativeEvent.contentOffset.x / windowWidth + 0.5),
        0,
      ),
      photos.length,
    );
    setCurrentIndex(pageNumber);
  };

  return (
    <Block full>
      <Block style={styles.backButton}>
        <BackButton />
      </Block>
      <Animated.FlatList
        ref={ref}
        data={photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index: number) => `item-${index}`}
        pagingEnabled
        bounces={false}
        contentOffset={{ x: windowWidth * currentIndex, y: 0 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }: { item: string }) => {
          return (
            <Block style={styles.image} center middle>
              <Image source={{ uri: item }} style={styles.blurImage} />
              <Blurhash
                style={styles.absolute}
                blurhash="p36kFrD%WBxaIooLWW~UM{WCofRkoLWC00xuofR*t8j?ay00xtt7R*s:WVj@%haKofWpnha}of?bofWBayoIoLkC"
              />
              <Image style={styles.photo} source={{ uri: item }} />
            </Block>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={photos} currentIndex={newCurrentIndex} />
    </Block>
  );
}
