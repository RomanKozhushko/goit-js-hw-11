//1. Імпорт бібліотек
import debounce from 'lodash.debounce'
import { fetchCountries } from "./fetchCountries";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
 
//2. Доступ до ресурсів
const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

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
// 8. Виведення інформації про знайдену країну
function newCountryInfo(country) {
  const layoutInfo = country
    .map(({ name, flags, capital, population, languages }) => {
      const layout = `
        <ul class="country__list">
            <li class="country__item">
              <img class="country__flag" src="${flags.svg}" alt=" ${name.official}">
                <h2 class="country__item--name">${name.official}</h2>
            </li>
            <li class="country__item">
                <span class="country__categories">Capital: </span>${capital}
            </li>
            <li class="country__item">
                <span class="country__categories">Population: </span>${population}
            </li>
            <li class="country__item">
                 <span class="country__categories">Languages: </span>${Object.values(
              languages,
            ).join(", ")}
            </li>
        </ul>`;
      return layout;
    })
    .join("");
  return layoutInfo;
}

