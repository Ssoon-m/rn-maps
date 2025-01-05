import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator.tsx';
import {colorHex, colors, feedNavigations, SERVICE_URL} from '@/constants';
import useGetPost from '@/shared/hooks/queries/useGetPost.ts';
import Ionicons from '@react-native-vector-icons/ionicons';
import Octicons from '@react-native-vector-icons/octicons';
import {getDateLocaleFormat} from '@/shared/utils/date.ts';
import PreviewImageList from '@/screens/map/components/PreviewImageList.tsx';
import {useNavigation} from '@react-navigation/native';

type FeedDetailScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.FEED_DETAIL
>;

const FeedDetailScreen = ({route}: FeedDetailScreenProps) => {
  const {id} = route.params;
  const {data: post, isPending, isError} = useGetPost(id);
  const navigation = useNavigation();

  if (isPending || isError) return <></>;

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <Octicons
            name="arrow-left"
            size={30}
            color={colors.WHITE}
            onPress={() => navigation.goBack()}
          />
          <Ionicons name="ellipsis-vertical" size={30} color={colors.WHITE} />
        </View>
      </SafeAreaView>
      <View style={styles.imageContainer}>
        {post?.images.length && (
          <Image
            style={styles.image}
            source={{uri: `${SERVICE_URL}/${post.images[0]?.uri}`}}
            resizeMode="cover"
          />
        )}

        {post.images.length === 0 && (
          <View style={styles.emptyImageContainer}>
            <Text>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.contentsContainer}>
        <View style={styles.addressContainer}>
          <Octicons name="location" size={10} color={colors.GRAY_500} />
          <Text
            style={styles.addressText}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {post.address}
          </Text>
        </View>
        <Text style={styles.titleText}>{post.title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoColumnKeyText}>방문날짜</Text>
              <Text style={styles.infoColumnValueText}>
                {getDateLocaleFormat(post.date)}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoColumnKeyText}>평점</Text>
              <Text style={styles.infoColumnValueText}>{post.score}점</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoColumnKeyText}>마커색상</Text>
              <View
                style={[
                  styles.markerColor,
                  {backgroundColor: colorHex[post.color]},
                ]}
              />
            </View>
          </View>
        </View>
        <Text style={styles.descriptionText}>{post.description}</Text>
      </View>
      {post.images.length && (
        <View style={styles.imageContentsContainer}>
          <PreviewImageList imageUris={post.images} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyImageContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  contentsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoColumnKeyText: {
    color: colors.BLACK,
  },
  infoColumnValueText: {
    color: colors.PINK_700,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  addressContainer: {
    gap: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
});

export default FeedDetailScreen;
