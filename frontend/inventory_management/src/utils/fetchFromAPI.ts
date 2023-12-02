import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";
const options = {
    url: BASE_URL,
    params: {
        maxResults: "50",
    },
};

export const fetchFromAPI = async (url:string) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};
