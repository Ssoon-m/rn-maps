import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import Button from '@/shared/components/Button';
import { authNavigations } from '@/constants';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/matzip.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    width: '100%',
  },
});

export default AuthHomeScreen;
