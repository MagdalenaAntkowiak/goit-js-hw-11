import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '45147118-3a4bc08e8d7fb4b6ec64761bc';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(query) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  const data = await response.json();
  return data.hits;
}

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = event.target.elements.query.value;
  gallery.innerHTML = '';
  loader.style.display = 'block';

  fetchImages(query)
    .then(images => {
      loader.style.display = 'none';
      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'center',
        });
        return;
      }

      const markup = images
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => `
        <li>
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="image-info">
            <div class="info-item"><span class="label">Likes:</span> ${likes}</div>
            <div class="info-item"><span class="label">Views:</span> ${views}</div>
            <div class="info-item"><span class="label">Comments:</span>${comments}</div>
            <div class="info-item"><span class="label">Downloads:</span>${downloads}</div>
          </div>
        </li>
      `
        )
        .join('');
      gallery.insertAdjacentHTML('beforeend', markup);

      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      }).refresh();
    })
    .catch(error => {
      loader.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      console.error(error);
    });
});
