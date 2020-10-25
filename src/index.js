import './styles.css';
import countriesTmpl from './templates/countries.hbs';
import countriesOnConditionTmpl from './templates/countriesOnCondition.hbs';
import refs from './js-blocks/refs.js';
import fetchCountries from './js-blocks/fetch-countries';

import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const inputCountryHeandler = event => {
  refs.countriesList.innerHTML = ' ';
  const inputValue = event.target.value;
  fetchCountries(inputValue).then(data => countriesMarkup(data));
};

refs.inputCountry.addEventListener(
  'input',
  debounce(inputCountryHeandler, 500),
);

function countriesMarkup(countries) {
  if (countries === undefined) {
    return;
  } else if (countries.length <= 10 && countries.length >= 2) {
    refs.countriesList.insertAdjacentHTML(
      'beforeend',
      countriesOnConditionTmpl(countries),
    );
  } else if (countries.length === 1) {
    refs.countriesList.insertAdjacentHTML(
      'beforeend',
      countriesTmpl(countries),
    );
  } else {
    const myError = error({
      title: 'ПРЕДУПРЕЖДЕНИЕ',
      text: 'Слишком много вариантов. Уточните, пожалуйста, запрос',
    });
  }
}
