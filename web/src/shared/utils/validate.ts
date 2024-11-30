type UserInfo = {
  email: string;
  password: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordValidate = (text: string) => text.length >= 8 && text.length < 20;

const validateLogin = (values: UserInfo) => {
  const errors = {
    email: '',
    password: '',
  };
  if (!emailRegex.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!passwordValidate(values.password)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }
  return errors;
};

const validateSignup = (values: UserInfo & {passwordConfirm: string}) => {
  const errors = {
    email: '',
    password: '',
    passwordConfirm: '',
  };
  if (!emailRegex.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!passwordValidate(values.password)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }
  return errors;
};

export {validateLogin, validateSignup};
