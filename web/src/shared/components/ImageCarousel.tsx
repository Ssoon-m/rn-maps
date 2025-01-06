import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {ImageUri} from '@/types/domain.ts';
import {colors, SERVICE_URL} from '@/constants';
import Octicons from '@react-native-vector-icons/octicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images, pressedIndex = 0}: ImageCarouselProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  // const [page,setPage] = useState(pressedIndex);
  const [page, setPage] = useState(pressedIndex);
  const [initialPage, setInitialPage] = useState(pressedIndex);
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // 절반정도 넘어갔을때 다음페이지 인디케이터 선택되게 구현
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);
    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, {marginTop: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Octicons name="arrow-left" size={30} color={colors.WHITE} />
      </Pressable>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              style={styles.image}
              source={{uri: `${SERVICE_URL}/${item.uri}`}}
              resizeMode={'contain'}
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal // 가로 스크롤
        pagingEnabled // snap 동작을 수행한다.
        showsHorizontalScrollIndicator={false} // 스크롤 바
        initialScrollIndex={initialPage}
        onScrollToIndexFailed={() => {
          setInitialPage(pressedIndex);
        }}
        onScroll={handleScroll}
        // 이미지가 깜빡거리거나 순서가 뒤바뀌는걸 방지해주는 최적화 옵션
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
      <View style={[styles.pageContainer, {bottom: insets.bottom + 10}]}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[styles.pageDot, index === page && styles.currentPageDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  pageDot: {
    margin: 4,
    backgroundColor: colors.GRAY_200,
    width: 8,
    height: 8,
    borderRadius: 8,
  },
  currentPageDot: {
    backgroundColor: colors.PINK_700,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    backgroundColor: colors.PINK_700,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default ImageCarousel;
