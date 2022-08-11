import axios from 'axios';
const KEY = '29184640-266ee5361b73d654bedf55260';

axios.defaults.baseURL = 'https://pixabay.com/api/'



async function fetchImgApi(query, page, perPage) {
  let query = '';
  let page = 1;
  const perPage = 40;
  const response = await axios.get(
      `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    )
    return response
  }
export { fetchImgApi }
  
