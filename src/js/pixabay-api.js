import axios from 'axios';

const API_KEY = '52352644-c897e22e6be43ef28cf6cdead';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, per_page = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
