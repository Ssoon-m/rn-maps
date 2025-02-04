import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CalendarPost} from '@/shared/apis/post.ts';
import {
  colors,
  feedNavigations,
  feedTabNavigations,
  mainNavigations,
} from '@/constants';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator.tsx';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {FeedTabParamList} from '@/navigations/tab/FeedTabNavigator.tsx';

interface EventListProps {
  posts?: CalendarPost[];
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

function EventList({posts}: EventListProps) {
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();
  const handlePressItem = (id: number) => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: {id},
        initial: false,
      },
    });
  };
  return (
    <ScrollView style={styles.container} scrollIndicatorInsets={{right: 1}}>
      <View style={[styles.innerContainer, {marginBottom: insets.bottom + 30}]}>
        {posts?.map(post => (
          <Pressable
            key={post.id}
            style={styles.itemContainer}
            onPress={() => handlePressItem(post.id)}>
            <View style={styles.itemHeader}></View>
            <View style={styles.infoConatiner}>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {post.address}
              </Text>
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  innerContainer: {
    gap: 20,
  },
  itemContainer: {flexDirection: 'row'},
  itemHeader: {
    backgroundColor: colors.PINK_700,
    width: 6,
    height: 50,
    marginRight: 8,
    borderRadius: 20,
  },
  infoConatiner: {
    justifyContent: 'space-evenly',
  },
  addressText: {color: colors.GRAY_500, fontSize: 13},
  titleText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventList;
