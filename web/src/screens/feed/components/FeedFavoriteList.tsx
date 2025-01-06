import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FeedItem from '@/screens/feed/components/FeedItem.tsx';
import useGetInfiniteFavoritePosts from '@/shared/hooks/queries/useInfiniteFavoritePosts.ts';

const FeedFavoriteList = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      ListEmptyComponent={
        <View>
          <Text style={{textAlign: 'center'}}>즐겨찾기한 장소가 없습니다.</Text>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing} // pull to refresh 기능
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}} // ios 스크롤바 위치 버그 방지
      indicatorStyle="black"
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedFavoriteList;
