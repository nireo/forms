import { UserAction, User } from './../interfaces/User';
import BaseHttpService from './base.service';
import axios from 'axios';

const http = new BaseHttpService();
const baseUrl: string = '/api/auth';

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

export const login = (user: UserAction) => {
  return http.post(`${baseUrl}/login`, user);
};

export const register = (user: UserAction) => {
  return http.post(`${baseUrl}/register`, user);
};

export const remove = async () => {
  const response = await axios.delete(baseUrl, getConfig());
  return response.data;
};

export const update = async (user: User) => {
  const response = await axios.patch(`${baseUrl}/update`, user, getConfig());
  return response.data;
};

export const updatePassword = async (password: string) => {
  const response = await axios.patch(
    `${baseUrl}/update/password`,
    { password },
    getConfig()
  );
  return response.data;
};
