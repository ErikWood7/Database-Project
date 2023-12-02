import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";
export const postToAPI = async (url:string, params: any) => {
    const apiClient = axios.create({
      baseURL: BASE_URL, 
    });
    const { data } = await apiClient.post(`/${url}`, params);
    return data;
};
