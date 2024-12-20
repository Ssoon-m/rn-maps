import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {
  checkPermission,
  type PermissionType,
} from '@/shared/lib/check-permission.ts';

// FIXME: 안드로이드 이슈 나중에 수정하자
function usePermissions(type: PermissionType) {
  const appState = useRef(AppState.currentState);
  const [isComback, setIsComback] = useState(false);

  const handlerAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      setIsComback(true);
      console.log('App has come to the foreground!');
    }
    // active -> background
    if (appState.current.match(/active/) && nextAppState === 'background') {
      console.log('background');
      setIsComback(false);
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    const fetchInitialPermission = async () => {
      await checkPermission(type);
    };
    fetchInitialPermission(); // 최초 실행 시 권한 확인
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handlerAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComback};
}
export default usePermissions;
