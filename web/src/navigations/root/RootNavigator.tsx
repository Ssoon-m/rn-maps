import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import useAuth from '../../shared/hooks/queries/useAuth';

const RootNavigator = () => {
  const {isLogin} = useAuth();
  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
};

export default RootNavigator;
