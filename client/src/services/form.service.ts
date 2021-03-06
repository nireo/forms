import { Form } from './../interfaces/Question';
import { FormSettingsStringFormat } from '../interfaces/Form';
import axios from 'axios';

const baseUrl: string = '/api/form';

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token },
});

export const getForm = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const updateForm = async (form: any, id: string) => {
  const response = await axios.patch(
    `${baseUrl}/update/${id}`,
    form,
    getConfig()
  );
  return response.data;
};

export const createForm = async (form: Form) => {
  const response = await axios.post(`${baseUrl}/create`, form, getConfig());
  return response.data;
};

export const deleteForm = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export const getUserForms = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

export const updateFormSettings = async (
  newSettings: FormSettingsStringFormat,
  id: string
) => {
  const response = await axios.patch(
    `${baseUrl}/settings/${id}`,
    newSettings,
    getConfig()
  );
  return response.data;
};
