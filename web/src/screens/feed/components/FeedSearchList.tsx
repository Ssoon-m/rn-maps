import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import useInfiniteSearchMyPosts from '@/shared/hooks/queries/useInfiniteSearchMyPosts.ts';
import FeedItem from '@/screens/feed/components/FeedItem.tsx';
import {useSearchKeywordContext} from '@/screens/feed/context/searchKeywordContext.ts';

function FeedSearchList() {
  const {search} = useSearchKeywordContext();
  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteSearchMyPosts(search);
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
      contentContainerStyle={styles.contentContainer}
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      ListEmptyComponent={
        <View>
          <Text style={{textAlign: 'center'}}>검색 목록이 없습니다.</Text>
        </View>
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing} // pull to refresh 기능
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}} // ios 스크롤바 위치 버그 방지
      indicatorStyle="black"
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
});

export default FeedSearchList;
