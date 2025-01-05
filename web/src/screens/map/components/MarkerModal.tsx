import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useGetPost from '@/shared/hooks/queries/useGetPost.ts';
import {
  colors,
  feedNavigations,
  mainNavigations,
  SERVICE_URL,
} from '@/constants';
import Octicons from '@react-native-vector-icons/octicons';
import CustomMarker from '@/screens/map/components/CustomMarker.tsx';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {getDateWithSeparator} from '@/shared/utils/date.ts';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator.tsx';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator.tsx';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  StackNavigationProp<FeedStackParamList>
>;

const MarkerModal = ({markerId, isVisible, hide}: MarkerModalProps) => {
  const {data: post, isPending, isError} = useGetPost(markerId);
  const navigation = useNavigation<Navigation>();

  if (isPending || isError) {
    return <></>;
  }

  /**
   * NOTE:
   * MainDrawer navigation에서
   * MapStackNavigator에 있는 MapHomeScreen에서
   * 다른 Stack navigator에 있는 곳으로 이동하는 것이므로
   * 아래와 같이 작성을 해줘야 한다.
   */
  const handlePressModal = () => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedNavigations.FEED_DETAIL,
      params: {
        id: post.id,
      },
      /**
       * false일 경우
       * MapHomeScreen 스택이 초기 스택이 안되게 도와줌
       * 피드 상세로 이동하고 뒤로가기 시에
       * 피드 리스트로 이동이 된다.
       */
      initial: false,
    });
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <SafeAreaView style={styles.optionBackground} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {post.images.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${SERVICE_URL}/${post.images[0].uri}`,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
              {post.images.length === 0 && (
                <View
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <CustomMarker color={post.color} score={post.score} />
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <Octicons name="location" size={16} color={colors.GRAY_500} />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.addressText}>
                    {post.address}
                  </Text>
                </View>
                <Text style={styles.titleText}>{post.title}</Text>
                <Text style={styles.dateText}>
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color={colors.BLACK}
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    elevation: 1,
    borderColor: colors.GRAY_500,
    borderWidth: 1.5,
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 35,
    borderWidth: 1,
  },
  infoContainer: {
    width: Dimensions.get('screen').width / 2,
    marginLeft: 15,
    gap: 5,
  },
  addressContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 10,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
});

export default MarkerModal;
