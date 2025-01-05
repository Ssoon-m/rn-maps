import {useEffect, useRef, useState} from 'react';
import useLocationStore from '@/store/useLocationStore.ts';
import MapView, {LatLng, Region} from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;
const useMoveMapView = () => {
  const {moveLocation} = useLocationStore();
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>({
    longitudeDelta: 0.0421,
    latitudeDelta: 0.0922,
  });

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...(delta ?? regionDelta),
    });
  };

  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation]);
  return {mapRef, moveMapView, handleChangeDelta};
};

export default useMoveMapView;
