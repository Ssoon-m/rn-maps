import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../shared/components/Button';
import useAuth from '../../shared/hooks/queries/useAuth';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  return (
    <View>
      <Text>맵 스크린</Text>
      <Button label="로그아웃" onPress={() => logoutMutation.mutate(null)} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
