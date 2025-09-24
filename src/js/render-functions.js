import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallerySelector = '.gallery';
const loaderSelector = '.loader';

const lightbox = new SimpleLightbox(`${gallerySelector} a`, {
  captionsData: 'alt',
  captionDelay: 250,
});
export function createGallery(images) {
  const galleryEl = document.querySelector('.gallery');
  if (!galleryEl) return;

  const markup = images
    .map(
      img => `
<li class="gallery-item">
<a class="gallery-link" href="${img.largeImageURL}" >
<img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" width="300" />
</a>
<div class="info">
<p class="info-item"><b>Likes</b><span class="info-item-current">${img.likes}</span></p>
<p class="info-item"><b>Views</b><span class="info-item-current">${img.views}</span></p>
<p class="info-item"><b>Comments</b><span class="info-item-current">${img.comments}</span></p>
<p class="info-item"><b>Downloads</b><span class="info-item-current">${img.downloads}</span></p>
</div>
</li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  const galleryEl = document.querySelector(gallerySelector);
  if (!galleryEl) return;
  galleryEl.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector(loaderSelector);
  if (!loader) return;
  loader.classList.remove('is-active');
}

export function hideLoader() {
  const loader = document.querySelector(loaderSelector);
  if (!loader) return;
  loader.classList.add('is-active');
}
