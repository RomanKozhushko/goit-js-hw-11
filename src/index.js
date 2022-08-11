// 1. Виклики імпортів
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImgApi } from "./js/fetchApi";
import { fetchImgApiNext } from "./js/fetchApiNext";
import { renderGallery } from "./js/renderGallery";

// 2. Достум до форм та галереї
const gallery = document.querySelector('.search__gallery');
const form = document.querySelector('.search__form');
const loadMore = document.querySelector('.search__loadmore');
// const hidden = document.querySelector('body.button')

// 3. Визначення змінних
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;
// let remainder = data.totalHits - perPage * (page - 1);
// console(remainder);

// 4. Прослуховування кнопок
form.addEventListener("submit",onSearchForm)
loadMore.addEventListener('click', onLoadMore)
// 5.
function onSearchForm (event) {
    event.preventDefault()
    window.scroll({top : 0})
    page = 1
    query =  event.currentTarget.searchQuery.value.trim()
    gallery.innerHTML = ""

    if(query === "") {
        return Notify.failure('The search string cannot be empty. Please specify your search query.')
    }

fetchImgApi(query, page, perPage).then(({data}) => {
    if(data.totalHits === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    else {
        renderGallery(data.hits)
        simpleLightBox = new SimpleLightbox('.search__gallery a').refresh()
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
    }
  }).catch(error => console.log(error))
}
function onLoadMore () {
    page += 1
    simpleLightBox.destroy()

    fetchImgApiNext(query, page, perPage).then(({data}) => {
        if(data.totalHits === 0) {
            return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        } else {
            renderGallery(data.hits)
            simpleLightBox = new SimpleLightbox('.search__gallery a').refresh()
            Notify.success(`Hooray! Left until the end ${data.totalHits - perPage * (page - 1)} images.`)
        }
    }).catch(error => console.log(error))
    }