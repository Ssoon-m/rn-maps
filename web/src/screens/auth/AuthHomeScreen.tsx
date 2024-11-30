import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authNavigations} from '../../constants/navigations';
import Button from '../../shared/components/Button';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Button
          variant="filled"
          label="로그인하기"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <Button
          variant="outlined"
          label="회원가입하기"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
          회원가입으로 이동
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
