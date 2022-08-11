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

// 4.2 Введення неіснуючої країни
function wrongAlert() {
    Notify.failure("Oops, there is no country with that name");
}

// 5. Функція trim для вирізки пробілів!
function onSearchForm() {
    const name = input.value.trim();
    if (name === "") {
        return (imgList.innerHTML = ""), (countryInfo.innerHTML = "");
    }

// 6. Пошук заданої країни!
 fetchCountries(name)
    .then(country => {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
      if (country.length === 1) {
        countryInfo.insertAdjacentHTML("beforeend", newCountryInfo(country));
      }else if (country.length >= 10) {
        infoAlert()
      }else {
        countryList.insertAdjacentHTML("beforeend", newCountryList(country));
      }
    })
    .catch(wrongAlert);
}
//7. Виведення переліку країн які задовільняють пошуку
function newCountryList(country) {
  const layoutList = country
    .map(({ name, flags }) => {
      const layout = `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="${name.official}">
              <h2 class="country-list__name">${name.official}</h2>
          </li>`;
      return layout;
    }).join("");
  return layoutList;
}



//7. Виведення  галереї яка задовільняють пошуку!!