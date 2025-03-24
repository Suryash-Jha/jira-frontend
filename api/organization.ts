import AXIOS from "@/config/Axios";
import Prefix from '../config/ApiPrefix';

export const createOrganizationApi = async (data: any) => {
    const response = await AXIOS.post(`${Prefix.api}/organizations/`, data);
    return response.data;
  };
export const getOrganizationListApi = async (url: any,) => {
    const response = await AXIOS.get(`${Prefix.api}/organizations/${url? url: ''}`);
    return response.data;
  };

  
