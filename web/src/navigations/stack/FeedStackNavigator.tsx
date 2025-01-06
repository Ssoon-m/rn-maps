import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import {feedNavigations} from '../../constants/navigations';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen.tsx';
import HeaderButton from '@/shared/components/HeaderButton.tsx';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator.tsx';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen.tsx';
import {LatLng} from 'react-native-maps';
import EditPostScreen from '@/screens/feed/EditPostScreen.tsx';

// main drawer와 feed stack이 함께 사용되는 스크린이여서 Composite로 타입 생성
type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_POST]: {location: LatLng};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  const navigation = useNavigation<FeedHomeHeaderLeftProps>();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={{
          headerTitle: '피드',
          headerLeft: () => (
            <HeaderButton
              icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          headerTitle: '',
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
        }}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
