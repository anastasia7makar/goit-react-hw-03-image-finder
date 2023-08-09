import axios from 'axios';

export function fetchGallery(query, currentPage = 1) {
  const fetchOptions = {
    method: 'GET',
    url: 'https://pixabay.com/api/',
    params: {
      key: '38235772-33311ad07fcdc3c53044fd6f6',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 12,
    },
  };
  return axios(fetchOptions);
}
