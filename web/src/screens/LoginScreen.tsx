import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthStackParamList} from '../navigations/stack/AuthStackNavigator';

type LoginScreenProps = StackScreenProps<AuthStackParamList>;

function LoginScreen({}: LoginScreenProps) {
  return (
    <View>
      <Text>로그인 스크린</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default LoginScreen;
