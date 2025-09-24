import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52352644-c897e22e6be43ef28cf6cdead';
export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
