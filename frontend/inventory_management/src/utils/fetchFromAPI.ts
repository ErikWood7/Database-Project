import axios from "axios";

const BASE_URL = "https://api.canfieldcollision.tech/";
const options = {
    url: BASE_URL,
};

export const fetchFromAPI = async (url:string) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};
