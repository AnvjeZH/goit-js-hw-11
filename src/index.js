import axios, { all } from 'axios'
import Notiflix from 'notiflix';
import {fetchQuery} from './api-service/api'

const form = document.querySelector('form')
const gallery = document.querySelector('.gallery')
const searchBtn = document.querySelector('[type="submit"]')
const loadMore = document.querySelector('.load-more')

const perPage = 40
let pageNumber = 1
let querySearch = ''

loadMore.classList.add('unvisible')

function getImages(keyword, page) {
    fetchQuery(keyword, page).then((data) => {
      console.log(data.hits.length)
      if(data.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        return
      }
        const imgArr = data.hits
        renderMarkupImg(imgArr)
        if (data.totalHits > 1 && data.totalHits > page * perPage) {
          loadMore.classList.remove('unvisible')
        } else {
          loadMore.classList.add('unvisible')
          Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        }
        
    })
    .catch(error => console.log(error))
    .finally(() => {
      // loadMore.classList.add('unvisible')
    })
}



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
    gallery.insertAdjacentHTML('beforeend', markup)
}

form.addEventListener('submit', onSearchImages)

function onSearchImages(event) {
  event.preventDefault()
  inputValue = event.target.elements.searchQuery.value
  if(!inputValue.trim() || inputValue === querySearch) {
return
  }
  querySearch = inputValue
  pageNumber = 1
  gallery.innerHTML = ''
  loadMore.classList.add('unvisible')
  getImages(querySearch, pageNumber)
}

loadMore.addEventListener('click', onLoadMore)

function onLoadMore() {
  loadMore.classList.add('unvisible')
  pageNumber += 1
  getImages(querySearch, pageNumber)
}