import React from 'react';
import {colors, feedTabNavigations} from '@/constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedStackNavigator from '@/navigations/stack/FeedStackNavigator.tsx';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen.tsx';
import {StyleSheet} from 'react-native';

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: undefined;
  [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

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
      })}>
      <Tab.Screen
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
      />
    </Tab.Navigator>
  );
}
export default FeedTabNavigator;
