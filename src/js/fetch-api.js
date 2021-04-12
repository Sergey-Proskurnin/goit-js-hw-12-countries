
import debounce from 'lodash.debounce'
import API from './fetchCountries';
import countriesCards from '../templates/markup-card.hbs';
import countrieslist from '../templates/markup-list.hbs';
import {error} from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css'

const articleCards = document.querySelector('.body-card');
const list = document.querySelector('.list-country');
const input = document.querySelector('.form-control')

console.log(input);
let form = ''

function onSearch(e) {
  e.preventDefault()
  list.innerHTML = ''
  articleCards.innerHTML = ''
  form = e.target.value;
  
  
console.log(form);
  render(form)
}

input.addEventListener('input', debounce(onSearch, 500));

function render(form) {
  if (form !== '') {
     API.fetchCountries(form)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form ='');
   
    }
}
console.log(alert.text);
function onFetchError() {
 error ({
    text: 'Not this country!'
  });
}

function renderCountryCard(country) {
  console.log(country.length);
  if(country.length === 1) {
        const markupCard = countriesCards(country);
     articleCards.innerHTML = markupCard;
  }
  if (country.length > 1 &&country.length < 10){
    const markupList = countrieslist(country);
    list.innerHTML = markupList;
  }
  if (country.length < 1 || country.length > 9){
    error ({
      text: 'Too many matches found. Please enter a more specific query!'
    });
    
  }
}

