import axios from "axios";

const BASE_URL = "https://api.canfieldcollision.tech/";
export const postToAPI = async (url:string, params: any) => {
    const apiClient = axios.create({
      baseURL: BASE_URL, 
    });
    const { data } = await apiClient.post(`/${url}`, params);
    return data;
};
