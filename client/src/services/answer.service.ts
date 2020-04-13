import axios from 'axios';

const baseUrl: string = '/api/answer';
let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token },
});

export const createAnswer = async (answer: any, id: string) => {
  const response = await axios.post(`${baseUrl}/answer/${id}`, answer);
  return response.data;
};

export const getAnswer = async (id: string) => {
  const response = await axios.get(`${baseUrl}/form/${id}`, getConfig());
  return response.data;
};

export const getAnswerData = async (id: string) => {
  const response = await axios.get(`${baseUrl}/content/${id}`, getConfig());
  return response.data;
};

export const removeAnswer = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export const allAnswers = async (id: string) => {
  const response = await axios.get(`${baseUrl}/all/${id}`, getConfig());
  console.log(response.data);
  return response.data;
};

export const removeAllAnswers = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/form/${id}`, getConfig());
  return response.data;
};
