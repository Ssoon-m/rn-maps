import React from 'react';
import {colors, feedNavigations, feedTabNavigations} from '@/constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedStackNavigator from '@/navigations/stack/FeedStackNavigator.tsx';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen.tsx';
import {StyleSheet} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import HeaderButton from '@/shared/components/HeaderButton.tsx';
import FeedSearchScreen from '@/screens/feed/FeedSearchScreen.tsx';

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: {
    screen: typeof feedNavigations.FEED_DETAIL;
    params: {
      id: number;
    };
    initial: false;
  };
  [feedTabNavigations.FEED_SEARCH]: undefined;
  [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(route: RouteProp<FeedTabParamList>, focused: boolean) {
  let iconName:
    | 'reader'
    | 'reader-outline'
    | 'star'
    | 'star-outline'
    | 'search'
    | 'search-outline' = 'reader';
  switch (route.name) {
    case feedTabNavigations.FEED_HOME:
      iconName = focused ? 'reader' : 'reader-outline';
      break;
    case feedTabNavigations.FEED_SEARCH:
      iconName = focused ? 'search' : 'search-outline';
      break;
    case feedTabNavigations.FEED_FAVORITE:
      iconName = focused ? 'star' : 'star-outline';
      break;
  }
  return (
    <Ionicons
      name={iconName}
      size={25}
      color={focused ? colors.PINK_700 : colors.GRAY_500}
    />
  );
}

function FeedTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.PINK_700,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          borderTopColor: colors.GRAY_200,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: (tabRoute => {
            const routeName = getFocusedRouteNameFromRoute(tabRoute);
            if (
              routeName === feedNavigations.FEED_DETAIL ||
              routeName === feedNavigations.EDIT_POST ||
              routeName === feedNavigations.IMAGE_ZOOM
            ) {
              return {display: 'none'};
            }
            return {
              backgroundColor: colors.WHITE,
              borderTopColor: colors.GRAY_200,
              borderTopWidth: StyleSheet.hairlineWidth,
            };
          })(route),
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_SEARCH}
        component={FeedSearchScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={({navigation}) => ({
          headerTitle: '즐겨찾기',
          headerLeft: () => (
            <HeaderButton
              icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
              onPress={() => (navigation as any).openDrawer()}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
export default FeedTabNavigator;
