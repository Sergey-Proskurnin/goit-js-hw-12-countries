
import debounce from 'lodash.debounce'
import API from './fetchCountries';
import countriesCards from '../templates/markup-card.hbs';
import countrieslist from '../templates/markup-list.hbs';



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

input.addEventListener('input', debounce(onSearch, 1000));

function render(form) {
  if (form !== '') {
    console.log(form);
    API.fetchCountries(form)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form ='');
   
    }
}
function onFetchError(error) {
  alert('Not this country!');
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
    alert("Enter correct country name")
  }
}

