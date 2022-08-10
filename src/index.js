1//1. Імпорт бібліотек
import { fetchImgApi } from "./js/fetchApi";
import { renderGallery } from "./js/renderGalleru";
import debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import axios from 'axios';

//2. Доступ до ресурсів
const input = document.querySelector("#input");
const DEBOUNCE_DELAY = 300;
const btnSearch = document.querySelector("button[data-search]");

// 3. Прослуховування інпута із затримкою!
input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

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
function onInput() {
    const name = input.value.trim();
    if (name === "") {
        return (countryList.innerHTML = ""), (countryInfo.innerHTML = "");
    }
    //функція пошуку!!!
}

//7. Виведення  галереї яка задовільняють пошуку!!