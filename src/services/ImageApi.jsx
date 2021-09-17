const API_KEY = '21988624-a694c57feb3b9caad270c2fa0';
const BASE_URL = 'https://pixabay.com/api';

function fetchImage(imageName, page) {
  return fetch(
    `${BASE_URL}/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json().then(data => data.hits);
    }
  });
}

const imageAPI = { fetchImage };

export default imageAPI;
