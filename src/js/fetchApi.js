import axios from 'axios';
const KEY = '29133647-3d8509d2cb813d5d67d4bc82b';

axios.defaults.baseURL = 'https://pixabay.com/api/'

async function fetchImgApi (query, page, perPage) {
    const response = await axios.get(
      `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    )
    return response
  }
  export {fetchImgApi}