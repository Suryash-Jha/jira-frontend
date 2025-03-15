import { jwtDecode } from 'jwt-decode';
import SecureStorage from './SecureStorage';
export const setLoginData = (accessToken: string) => {
  const decoded: any = jwtDecode(accessToken);

  SecureStorage.setItem('token', accessToken);
  SecureStorage.setItem('decoded', decoded);
  // SecureStorage.setItem('firstName', decoded && decoded?.firstName);
  // SecureStorage.setItem('lastName', decoded && decoded?.lastName);
  // SecureStorage.setItem('username', decoded && decoded?.username);
  // SecureStorage.setItem('refreshToken', refreshToken);
};

export const clearLoginData = () => {
  SecureStorage.removeItem('token');
  SecureStorage.removeItem('refreshToken');
};

export const getUserToken = () => {
  SecureStorage.getItem('token');
};
