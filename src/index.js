import {fetchQuery} from './api-service/api'

const gallery = document.querySelector('.gallery')


function getImages(keyword) {
    fetchQuery(keyword).then((data) => {
        const imgArr = data.hits
        renderMarkupImg(imgArr)
    })
}

getImages('cat')

function renderMarkupImg(imgArr) {
    const markup = imgArr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`
    })
    .join('')
    gallery.innerHTML = markup
}