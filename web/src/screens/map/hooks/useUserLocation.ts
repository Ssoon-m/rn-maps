import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';
import usePermissions from '@/shared/hooks/usePermissions.ts';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComback} = usePermissions('LOCATION');

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return {userLocation, isUserLocationError};
};

export default useUserLocation;
