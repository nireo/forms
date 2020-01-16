import { Question, QuestionToServer } from './../interfaces/Question';
import axios from 'axios';

const baseUrl: string = '/api/question';
let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token }
});

export const createQuestion = async (id: string, question: Question) => {
  const response = await axios.post(`${baseUrl}/${id}`, question, getConfig());
  return response.data;
};

export const deleteQuestion = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export const updateQuestion = async (
  id: string,
  question: QuestionToServer
) => {
  const response = await axios.patch(`${baseUrl}/${id}`, question, getConfig());
  return response.data;
};
