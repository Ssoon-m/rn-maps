import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import InputField from '../../shared/components/InputField';
import Button from '../../shared/components/Button';
import {useForm} from '../../shared/hooks/useForm';
import {validateLogin} from '../../shared/utils';

type LoginScreenProps = StackScreenProps<AuthStackParamList>;

function LoginScreen({}: LoginScreenProps) {
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });
  const handleSubmit = () => {
    console.log('inputs', login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
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
