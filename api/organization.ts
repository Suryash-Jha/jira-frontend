import AXIOS from "@/config/Axios";
import Prefix from '../config/ApiPrefix';

export const createOrganizationApi = async (data: any) => {
    const response = await AXIOS.post(`${Prefix.api}/organization/`, data);
    return response.data;
  };
export const getOrganizationListApi = async (url: any,) => {
    const response = await AXIOS.get(`${Prefix.api}/organization/${url? url: ''}`);
    return response.data;
  };

  
