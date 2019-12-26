import { UserAction } from './../interfaces/User';
import BaseHttpService from './base.service';

const http = new BaseHttpService();
const baseUrl: string = '/api/auth';

export const login = (user: UserAction) => {
  return http.post(`${baseUrl}/login`, user);
};

export const register = (user: UserAction) => {
  return http.post(`${baseUrl}/register`, user);
};
