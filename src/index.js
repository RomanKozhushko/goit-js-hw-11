1//1. Імпорт бібліотек
import debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import './css/styles.css';
import SimpleLightbox from "simplelightbox";

//2. Доступ до ресурсів
const input = document.querySelector("#search-box");
const DEBOUNCE_DELAY = 300;