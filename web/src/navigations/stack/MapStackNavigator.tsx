import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {mapNavigations} from '@/constants/navigations';
import MapHomeScreen from '@/screens/map/MapHomeScreen.tsx';
import AddPostScreen from '@/screens/map/AddPostScreen.tsx';
import {LatLng} from 'react-native-maps';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_POST]: {location: LatLng};
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
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
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{headerTitle: '', headerShown: false}}
      />
      <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{headerTitle: '장소추가'}}
      />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
