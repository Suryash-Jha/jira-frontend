import AXIOS from "@/config/Axios";
import Prefix from '../config/ApiPrefix';

export const createProjectApi = async (data: any) => {
    const response = await AXIOS.post(`${Prefix.api}/projects/`, data);
    return response.data;
  };
export const getProjectListApi = async (url: any,) => {
    const response = await AXIOS.get(`${Prefix.api}/projects/${url? url: ''}`);
    return response.data;
  };

  
