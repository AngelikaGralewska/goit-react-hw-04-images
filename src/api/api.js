import axios from "axios";


const API_KEY = '31002352-08f9aee50f5995fc50a5ce26f';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchApi = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

