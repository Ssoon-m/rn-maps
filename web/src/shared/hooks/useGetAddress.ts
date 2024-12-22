import {LatLng} from 'react-native-maps';
import axios from 'axios';
import Config from 'react-native-config';
import {useEffect, useState} from 'react';
import {errorMessages} from '@/constants';

function useGetAddress(location: LatLng) {
  const [result, setResult] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&result_type=street_address|route|political&key=${Config.GOOGLE_MAPS_API_KEY}&language=ko`,
        );
        const address = data.results.length
          ? data.results[0].formatted_address
          : `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
        setResult(address);
      } catch (e) {
        setResult(errorMessages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [location]);
  return result;
}

export default useGetAddress;
