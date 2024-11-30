import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import InputField from '../../shared/components/InputField';

type LoginScreenProps = StackScreenProps<AuthStackParamList>;

function LoginScreen({}: LoginScreenProps) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChangeText = (name: string, text: string) => {
    setInputs(prev => ({...prev, [name]: text}));
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  console.log('inputs', inputs);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error="이메일을 입력하세요"
          touched={touched.email}
          inputMode="email"
          value={inputs.email}
          onChangeText={text => handleChangeText('email', text)}
          onBlur={() => handleBlur('email')}
        />
        <InputField
          placeholder="비밀번호"
          error="비밀번호를 입력하세요"
          touched={touched.password}
          secureTextEntry
          value={inputs.password}
          onChangeText={text => handleChangeText('password', text)}
          onBlur={() => handleBlur('password')}
        />
      </View>
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
  },
});

export default LoginScreen;
