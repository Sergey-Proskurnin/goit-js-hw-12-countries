import API from './fetchCountries';
import countriesCards from '../templates/markup-card.hbs';
import countrieslist from '../templates/markup-list.hbs';

const articleCards = document.querySelector('.body-card');
const list = document.querySelector('.list-country');

function render() {
  const obj = API.fetchCountries('ua').then(renderCountryCard);
}

function renderCountryCard(country) {
  const markupCard = countriesCards(country);
  const markupList = countrieslist(country);
  articleCards.innerHTML = markupCard;
  list.innerHTML = markupList;
}
render();
