import AXIOS from '../config/Axios';
import Prefix from '../config/ApiPrefix';

export const createTaskApi = async (body: any) => {
  const response = await AXIOS.post(`${Prefix.api}/tasks`, body);
  return response.data;
};
export const getAllTaskApi = async (url: any) => {
  const response = await AXIOS.get(`${Prefix.api}/tasks/${url? url: ''}`);
  return response.data;
};


