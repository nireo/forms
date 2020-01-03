import { Form } from './../interfaces/Question';
import axios from 'axios';

const baseUrl: string = '/api/forms';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

export const getForm = (id: string) => {
  return axios.get(`${baseUrl}/${id}`);
};

export const updateForm = (form: Form, id: string) => {
  return axios.patch(`${baseUrl}/${id}`, form, getConfig());
};

export const createForm = (form: Form) => {
  return axios.post(`${baseUrl}/create`, form, getConfig());
};
