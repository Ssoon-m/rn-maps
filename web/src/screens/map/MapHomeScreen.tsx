import React, {useEffect, useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import useAuth from '../../shared/hooks/queries/useAuth';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {alerts, colors, mapNavigations} from '@/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator.tsx';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator.tsx';
import useUserLocation from '@/screens/map/hooks/useUserLocation.ts';
import Ionicons from '@react-native-vector-icons/ionicons';
import MeterialIcons from '@react-native-vector-icons/material-icons';
import {mapStyle} from '@/style/mapStyle.ts';
import CustomMarker from '@/screens/map/components/CustomMarker.tsx';
import useGetMarkers from '@/shared/hooks/queries/useGetMarkers.ts';
import MarkerModal from '@/screens/map/components/MarkerModal.tsx';
import {useModal} from '@/shared/hooks/useModal.ts';
import useMoveMapView from '@/screens/map/hooks/useMoveMapView.ts';
import Toast from 'react-native-toast-message';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const {logoutMutation} = useAuth();
  const navigation = useNavigation<Navigation>();
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng>();
  const [markerId, setMarkerId] = useState<number | null>(null);
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const markerModal = useModal();
  const {data: markers = []} = useGetMarkers();

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  };

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      // 에러 표기
      return;
    }
    moveMapView(userLocation);
  };

  const handlePressSearch = () => {
    navigation.navigate(mapNavigations.SEARCH_LOCATION);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleChangeDelta} // 위치 OR 확대 정보 변경시
        region={{
          ...userLocation,
          longitudeDelta: 0.0421,
          latitudeDelta: 0.0922,
        }}>
        {markers.map(marker => (
          <CustomMarker
            key={marker.id}
            score={marker.score}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            color={marker.color}
            onPress={() =>
              handlePressMarker(marker.id, {
                latitude: marker.latitude,
                longitude: marker.longitude,
              })
            }
          />
        ))}
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>
      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MeterialIcons name={'add'} color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressSearch}>
          <Ionicons name="search" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MeterialIcons name={'my-location'} color={colors.WHITE} size={25} />
        </Pressable>
      </View>
      <MarkerModal
        markerId={markerId}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4, // android에선 shadowOpacity적용이 안된다.
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;
