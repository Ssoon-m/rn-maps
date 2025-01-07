import React, {createContext, useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '@/constants';
import FeedSearchList from '@/screens/feed/components/FeedSearchList.tsx';
import FeedSearchBar from '@/screens/feed/components/FeedSearchBar.tsx';
import {SearchKeywordContext} from '@/screens/feed/context/searchKeywordContext.ts';

function FeedSearchScreen() {
  const [search, setSearch] = useState('');
  const value = useMemo(
    () => ({
      search,
      setSearch: (value: string) => setSearch(value),
    }),
    [search, setSearch],
  );
  return (
    <SafeAreaView style={styles.container}>
      <SearchKeywordContext.Provider value={value}>
        <FeedSearchBar />
        <FeedSearchList />
      </SearchKeywordContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedSearchScreen;
