import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';
import {useForm} from '../../shared/hooks/useForm';
import {validateLogin} from '../../shared/utils';
import useAuth from '../../shared/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';

type LoginScreenProps = StackScreenProps<AuthStackParamList>;

function LoginScreen({}: LoginScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });
  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error =>
        Toast.show({
          type: 'error',
          text1: error.message,
          position: 'bottom',
        }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          blurOnSubmit={false}
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <Button
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
