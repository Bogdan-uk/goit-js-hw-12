import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScroll,
} from './js/render-functions.js';

import { getImagesByQuery } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-btn');

let query = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Увага',
      message: 'Введіть пошуковий запит!',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();

    const data = await getImagesByQuery(query, page, perPage);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Немає результатів',
        message: 'Зображення за цим запитом не знайдено.',
      });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити зображення.',
    });
    console.error(error);
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();

  try {
    showLoader();

    const data = await getImagesByQuery(query, page, perPage);

    createGallery(data.hits);
    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Кінець результатів',
        message: 'Were sorry, but you ve reached the end of search results',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити більше зображень.',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});
