import {Category, Profile} from '../../types/domain';
import {httpClient} from '../lib/http-client';
import {getEncryptStorage} from '../utils';

type UserParams = {
  email: string;
  password: string;
};

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};
type ProfileResponse = Profile & Category;

export type {UserParams, TokenResponse, ProfileResponse};

export class AuthService {
  static async postSignup({email, password}: UserParams) {
    return httpClient
      .post('/auth/signup', {email, password})
      .then(res => res.data);
  }
  static async postLogin({email, password}: UserParams) {
    return httpClient
      .post<TokenResponse>('/auth/signin', {email, password})
      .then(res => res.data);
  }
  static async getProfile() {
    return httpClient.get<ProfileResponse>('/auth/me').then(res => res.data);
  }
  static async getAccessToken() {
    const refreshToken = await getEncryptStorage('refreshToken');
    return httpClient
      .get<TokenResponse>('/auth/refresh', {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then(res => res.data);
  }
  static async logout() {
    await httpClient.post('/auth/logout').then(res => res.data);
  }
}
