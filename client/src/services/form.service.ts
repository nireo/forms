import { Form } from './../interfaces/Question';
import BaseHttpService from './base.service';

const http = new BaseHttpService();
const baseUrl: string = '/api/forms';

export const getForm = (id: string) => {
  return http.get(`${baseUrl}/${id}`);
};

export const updateForm = (form: Form, id: string) => {
  return http.patch(`${baseUrl}/${id}`, form);
};

export const createForm = (form: Form) => {
  return http.post(`${baseUrl}/create`, form);
};
