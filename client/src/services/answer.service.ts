import { AnswerFull } from './../interfaces/Answer';
import axios from 'axios';

const baseUrl: string = '/api/answer';
let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

export const createAnswer = async (answer: AnswerFull) => {
  const response = await axios.post(
    `${baseUrl}/${answer.toForm}`,
    answer,
    getConfig()
  );
  return response.data;
};

export const getAnswer = async (id: string) => {
  const response = await axios.get(`${baseUrl}/form/${id}`);
  return response.data;
};

export const getAnswerData = async (id: string) => {
  const response = await axios.get(`${baseUrl}/content/${id}`);
  return response.data;
};
