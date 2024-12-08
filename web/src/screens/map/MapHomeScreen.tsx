import React from 'react';
import {StyleSheet, View} from 'react-native';
// import Button from '../../shared/components/Button';
import useAuth from '../../shared/hooks/queries/useAuth';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  return <MapView style={styles.container} provider={PROVIDER_GOOGLE} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
