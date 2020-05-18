import axios from 'axios';

const baseUrl: string = '/api/notification';
let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getConfig = () => ({
  headers: { Authorization: token },
});

export const getNotifications = async () => {
  const response = await axios.get(baseUrl, getConfig());
  console.log(token);
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export const updateReadStatus = async (id: string) => {
  const response = await axios.patch(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export const getSingleNotification = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`, getConfig());
  return response.data;
};
