/* NOTE:
 variables 'soil' and 'plants' imported from plants.js

*/

/**
 * The Service Worker
 * local - with a different url to register - comment when pubhlishing
 

if ('serviceWorker' in navigator) {
  // Check if the service worker feature is available in the browser in use
  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('Service Worker registered');
  });
}*/

/**
 * The Service Worker
 * online - with a different url to register - uncomment when publishing
 */

if ('serviceWorker' in navigator) {
  // Check if the service worker feature is available in the browser in use
  navigator.serviceWorker.register('/zeigerpflanzen/sw.js').then(function() {
    console.log('Service Worker registered');
  });
}

/**
 * The application section
 */
function removePlantFilter() {
  document
    .querySelectorAll('.plant')
    .forEach(plant => plant.classList.remove('hide'));
  document
    .querySelectorAll('.soil-info')
    .forEach(span => span.classList.remove('darker'));
  document.getElementById('header').innerHTML = `Zeigerpflanzen`;
  document.getElementById('btn-show-all').classList.add('hide');
}

function filterPlants(soilCondition) {
  let conditionId = soil.filter(x => x.condition === soilCondition)[0].id;
  let filteredPlants = plants
    .filter(x => x.soil.includes(conditionId))
    .map(plant => plant.latin);

  /* Hide the plants without the respective soil condition */
  document.querySelectorAll('.plant').forEach(plant => {
    filteredPlants.includes(plant.id)
      ? plant.classList.remove('hide')
      : plant.classList.add('hide');
  });

  /* Darken the background of the selected condition */
  document.querySelectorAll('.soil-info').forEach(span => {
    span.innerText === soilCondition
      ? span.classList.add('darker')
      : span.classList.remove('darker');
  });

  /* Hide the title Jumbotron as not needed anymore - so only the plants are visible */
  document.getElementById('title').classList.add('hide');

  const headerText = soil.find(x => x.condition === soilCondition).header;
  document.getElementById(
    'header'
  ).innerHTML = `Zeigerpflanzen für ${headerText}`;
  document.getElementById('header').classList.remove('hide');
  document.getElementById(
    'btn-show-all'
  ).innerHTML = `${soilCondition}    <i class="fas fa-times"></i>`;
  document.getElementById('btn-show-all').classList.remove('hide');
  document.getElementById('btn-show-all').addEventListener('click', function() {
    removePlantFilter();
  });

  document.getElementById('text-search').value = ''; // clear the search

  window.scrollTo(0, 1);
  window.scrollTo(0, 0);
}

function showPlants() {
  const plantsList = document.getElementById('plants-list');

  /* add one card per entry in plants object */
  for (let i = 0; i < plants.length; i++) {
    const card = document.createElement('div');
    card.setAttribute('class', 'plant');
    card.setAttribute('id', `${plants[i].latin}`);
    card.innerHTML = `
            <div class="card">
              <a href="${plants[i].url}" target="_blank" rel="noopener">
                <img class="card-img-top lazy" data-src="img/500x500/${
                  plants[i].img
                }" alt="${plants[i].name}">
              </a>
              <div class="card-body" id="${plants[i].name}">
                <h5 class="card-title">${plants[i].name}</h5>
                <h6 class="card-latin"><em>${plants[i].latin}</em></h6>
                <p class="card-text">${plants[i].desc}</p>
              </div>
            </div>`;
    plantsList.appendChild(card);

    /* add respective soil conditions accordingly to plant info in
       plants object soil condition array */
    const cardBody = document.getElementById(plants[i].name);

    const hr = document.createElement('hr');
    cardBody.appendChild(hr);
    const soilCondHeader = document.createElement('h6');
    soilCondHeader.innerHTML = 'Bodenbeschaffenheit:';
    cardBody.appendChild(soilCondHeader);

    for (let j = 0; j < plants[i].soil.length; j++) {
      const span = document.createElement('span');
      span.setAttribute('class', 'soil-info');
      span.addEventListener('click', function() {
        filterPlants(this.innerText);
      });

      // the index is one less than reference in plants object
      span.innerHTML = `${soil[plants[i].soil[j] - 1].condition}`;
      cardBody.appendChild(span);
    }
  }
}

/* The Plant Search */

// Search by Button Click
document.getElementById('btn-search').addEventListener('click', function() {
  const searchText = document.getElementById('text-search').value;
  showSearchResults(searchText);
});

// Search by pressing the Enter key (by w3schools)
const searchInput = document.getElementById('text-search');

searchInput.addEventListener('keyup', function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the search button with a click
    document.getElementById('btn-search').click();
  }
});

function showSearchResults(plantName) {
  removePlantFilter();

  const regExp = new RegExp(plantName, 'gi');

  let filteredPlants = plants
    .filter(x => regExp.test(x.name))
    .map(plant => plant.latin);

  /* Hide the plants not matching */
  document.querySelectorAll('.plant').forEach(plant => {
    filteredPlants.includes(plant.id)
      ? plant.classList.remove('hide')
      : plant.classList.add('hide');
  });

  /* Show only header title without explanation of indicator plants */
  document.getElementById('title').classList.add('hide');

  document.getElementById('header').innerHTML = `Zeigerpflanzen`;
  document.getElementById('header').classList.remove('hide');

  /* Auto-scroll so the lazyload triggers image load */
  window.scrollTo(0, 1);
  window.scrollTo(0, 0);
}

showPlants();

const myLazyLoad = new LazyLoad({
  elements_selector: '.lazy',
  to_webp: true
});

window.scrollTo(0, 1);
