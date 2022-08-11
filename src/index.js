1//1. Імпорт бібліотек
import { fetchImgApi } from "./js/fetchApi";
import { renderGallery } from "./js/renderGallery";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

//2. Доступ до ресурсів
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreImg = document.querySelector('.load-more');

// 3. Прослуховування ФОРМИ!
form.addEventListener("submit",onSearchForm)

// 4. Прослуховування кнопки LoadMore!
loadMoreImg.addEventListener('click', onLoadMore)

// 4. Функції виведення помилок
// 4.1 Введення недостатньої кількості символів
function infoAlert() {
    Notify.info("Too many matches found. Please enter a more specific name.");
}

// 4.2 Введення неіснуючого критерію
function wrongAlert() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

// 5. Функція trim для вирізки пробілів!
function onSearchForm(event) {
    event.preventDefault()
    const name = input.value.trim();
    if (name === "") {
        return (imgList.innerHTML = ""), (Info.innerHTML = "");
    }

// 6. Пошук заданої групи картинок!
 fetchImgApi(name)
    .then(img => {
      imgList.innerHTML = "";
      imgInfo.innerHTML = "";
      if (img.length === 1) {
        imgInfo.insertAdjacentHTML("beforeend", newimgInfo(img));
      }else if (img.length >= 10) {
        infoAlert()
      }else {
        imgList.insertAdjacentHTML("beforeend", newCountryList(img));
      }
    })
    .catch(wrongAlert);
}
//7. Виведення переліку країн які задовільняють пошуку
function newImgList(img) {
  const layoutList = img.map(({name}) => {
      const layout = `
          <div class="photo-card">
  <img src="${name.pageURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes "${name.likes}"</b>
    </p>
    <p class="info-item">
      <b>Views "${name.views}"</b>
    </p>
    <p class="info-item">
      <b>Comments "${name.comments}"</b>
    </p>
    <p class="info-item">
      <b>Downloads "${name.downloads}"</b>
    </p>
  </div>
</div>`;
      return layout;
    }).join("");
  return layoutList;
}



//7. Виведення  галереї яка задовільняють пошуку!!