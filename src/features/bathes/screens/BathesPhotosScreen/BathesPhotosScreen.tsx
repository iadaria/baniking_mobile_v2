import React, { useRef, useState } from 'react';
import { Animated, FlatList, Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { styles } from './styles';
import { Block } from '~/src/app/common/components/UI';
import { colors, isIos, windowWidth } from '~/src/app/common/constants';
import { Route } from '@react-navigation/native';
import Tabs from './Tabs';
import { BackButton } from '~/src/app/common/components/BackButton';

interface IProps {
  route: Route<string, object | undefined>;
  //navigation: StackNavigationProp<ParamListBase>;
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

  let onScrollEnd = (e) => {
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
              <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={isIos ? 1 : 3}
                reducedTransparencyFallbackColor={colors.title}
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
