import {useMutation, useQuery} from '@tanstack/react-query';
import {AuthService} from '../../apis/auth';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../../types/common';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';
import {queryClient} from '../../../providers/ReactQueryProvider';
import {numbers, queryKeys, storageKeys} from '../../../constants';

const useSignup = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: AuthService.postSignup,
    ...options,
  });
};

const useEmailLogin = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: AuthService.postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      // refetch
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...options,
  });
};

const useKaKaoLogin = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: AuthService.kakaoLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...options,
  });
};

const useGetRefreshToken = () => {
  const {isSuccess, data, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: AuthService.getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);
  return {isSuccess, isError};
};

const useGetProfile = (options?: UseQueryCustomOptions) => {
  return useQuery({
    queryFn: AuthService.getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...options,
  });
};

const useLogout = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...options,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKaKaoLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
};

export default useAuth;
