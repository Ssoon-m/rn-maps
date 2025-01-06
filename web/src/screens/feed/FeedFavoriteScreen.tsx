import {SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '@/constants';
import FeedFavoriteList from '@/screens/feed/components/FeedFavoriteList.tsx';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoriteList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedFavoriteScreen;
