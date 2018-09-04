const soil = [
  { id: 1, condition: 'trocken' },
  { id: 2, condition: 'nass' },
  { id: 3, condition: 'komprimierter Boden' },
  { id: 4, condition: 'natürlicher/unkultivierter Boden' },
  { id: 5, condition: 'stickstoffarm' },
  { id: 6, condition: 'stickstoffreich' },
  { id: 7, condition: 'kaliumarm' },
  { id: 8, condition: 'kaliumreich' },
  { id: 9, condition: 'phosphorarm' },
  { id: 10, condition: 'phosphorreich' },
  { id: 11, condition: 'sandig' },
  { id: 12, condition: 'lehmig' },
  { id: 13, condition: 'tiefgreifende Mineralschicht' },
  { id: 14, condition: 'sauer' },
  { id: 15, condition: 'basisch' },
  { id: 16, condition: 'mager' },
  { id: 17, condition: 'nährstoffreich' },
  { id: 18, condition: 'salzig' },
];

const plants = [
  { name: 'Zurückgebogener Amaranth',
    latin: 'Amaranthus retroflexus',
    soil: [1, 3],
    img: 'AmaranthusRetroflexus.jpg',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Amaranthus_retroflexus_full1.jpg', },
  { name: 'Gemeiner Odermenning',
    latin: 'Agrimonia eupatoria',
    soil: [1],
    img: 'AgrimoniaEupatoria.jpg',
    imgSrc: 'https://de.wikipedia.org/wiki/Gemeiner_Odermennig#/media/File:Agrimonia_eupatoria_04.jpg',},
  { name: 'Acker-Gauchheil',
    latin: 'Anagallis arvensis',
    soil: [15],
    img: 'AnagallisArvensis.jpg',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/15/AnagallisArvensis.jpg', },
  { name: 'Salz-Aster', latin: 'Aster tripolium', soil: [18] },
  { name: 'Kanadisches Berufskraut', latin: 'Erigeron canadensis', soil: [2] },
  { name: 'Gewöhnliches Greiskraut', latin: 'Senecio vulgaris', soil: [3, 17] },
  { name: 'Adlerfarn', latin: 'Pteridium aquilinum', soil: [7, 9, 14] },
  { name: 'Schwarzes Bilsenkraut', latin: 'Hyoscvamus niger', soil: [15] },
  { name: 'Gemeiner Beifuß', latin: 'Artemisia vulgaris', soil: [4] },
  { name: 'Gemeine Wegwarte', latin: 'Cichorium intybus', soil: [3, 12, 17] },
  { name: 'Gewöhnliche Vogelmiere', latin: 'Stellaria media', soil: [3, 17] },
  { name: 'Huflattich', latin: 'Tussilago farfara', soil: [2, 12, 14] },
  { name: 'Wilde Karotte', latin: 'Daucus carotta', soil: [4, 11, 15, 16] },
  { name: 'Gewöhnliche Goldrute', latin: 'Solidago virgaaurea', soil: [2, 11] },
  { name: 'Weißer Gänsefuß', latin: 'Chenopodium album', soil: [3, 17] },
  { name: 'Acker-Hundskamille', latin: 'Anthemis arvensis', soil: [2, 7, 13, 15] },
  { name: 'Gewöhnlicher Hirtentäschen', latin: 'Capsella bursa pastoris', soil: [11, 18] },
  { name: 'Gewöhnlicher Erdrauch', latin: 'Fumaria officinalis', soil: [8] },
  { name: 'Strahlenlose Kamille', latin: 'Matricaria matricarioides', soil: [13] },
  { name: 'Acker-Rettich', latin: 'Raphanus raphanistrum', soil: [4, 14, 16] },
  { name: 'Hasen-Klee', latin: 'Trifolium arvense', soil: [1, 8, 14] },
  { name: 'Weiß-Klee', latin: 'Trifolium repens', soil: [1, 4] },
  { name: 'Wiesen-Klee', latin: 'Trifolium pratense', soil: [8] },
  { name: 'Einjähriger Knäuel', latin: 'Scleranthus anuus', soil: [14] },
  { name: 'Kornblume', latin: 'Centaurea cyanus', soil: [11] },
  { name: 'Kriech-Quecke', latin: 'Elymus repens', soil: [13] },
  { name: 'Lupinen', latin: 'Lupinus sp.', soil: [5] },
  { name: 'Wermuth', latin: 'Artemisia absinthium', soil: [18] },
  { name: 'Melde sp.', latin: 'Atriplex sp.', soil: [17] },
  { name: 'Löwenzahn', latin: 'Taraxacum officinale', soil: [3, 12, 14] },
  { name: 'Kleine Brennnessel', latin: 'Urtica urens', soil: [2, 3, 14] },
  { name: 'Magerwiesen Margerite', latin: 'Chrysanthemum leucanthemum', soil: [2, 4] },
  { name: 'Acker-Schachtelhalm', latin: 'Euisetum arvense', soil: [2, 11] },
  { name: 'Acker-Hellerkraut', latin: 'Thlaspi arvense', soil: [13, 15] },
  { name: 'Floh-Knöterich', latin: 'Polygonum persicaria', soil: [2, 14] },
  { name: 'Vogelknöterich', latin: 'Polygonum aviculare', soil: [3, 14] },
  { name: 'Silber-Fingerkraut', latin: 'Potentilla argentea', soil: [1, 14] },
  { name: 'Scharfer Hahnenfuß', latin: 'Ranunculus acris', soil: [2, 3, 12] },
  { name: 'Kriechender Hahnenfuß', latin: 'Ranunculus repens', soil: [2, 12] },
  { name: 'Raps', latin: 'Brassica napus', soil: [5] },
  { name: 'Kleiner Sauerampfer', latin: 'Rumex acetosella', soil: [11, 14] },
  { name: 'Gemeine Schafgarbe', latin: 'Achillea millefolium', soil: [7] },
  { name: 'Kompass-Lattich', latin: 'Lactuca serriola', soil: [3] },
  { name: 'Gefleckter Schierling', latin: 'Conium maculatum', soil: [2] },
  { name: 'Stumpfblättriger Ampfer', latin: 'Rumex obtusifolius', soil: [2, 12] },
  { name: 'Hopfenklee', latin: 'Medicago lupulina', soil: [5, 15] },
  { name: 'Acker-Winde', latin: 'Convolvulus arvensis', soil: [11, 13] },
  { name: 'Echte Zaunwinde', latin: 'Convovulus sepium', soil: [2] },
  { name: 'Acker-Spark', latin: 'Spergula arvensis', soil: [11, 14] },
  { name: 'Acker-Gänsedistel', latin: 'Sonchus arvensis', soil: [12, 14] },
  { name: 'Acker-Kratzdistel', latin: 'Cirsium arvensis', soil: [12] },
  { name: 'Gänseblümchen', latin: 'Bellis perennis', soil: [12, 14] },
  { name: 'Echtes Leinkraut', latin: 'Linaria vulgaris', soil: [12] },
];

function showPlants() {
  const plantsList = document.getElementById('plants-list');

  /* add one card per entry in plants object */
  for (let i = 0; i < 3; i++) {
    const card = document.createElement('div');
    card.setAttribute('class', 'col-md-6 col-lg-4');
    card.innerHTML = `
            <div class="card">
              <img class="card-img-top"
                   src="img/500x666/${plants[i].img}"
                   alt="${plants[i].name}">
              <div class="card-body" id="${plants[i].name}">
                <h5 class="card-title">${plants[i].name}</h5>
                <p class="card-text"><em>${plants[i].latin}</em></p>
              </div>
            </div>`;
    plantsList.appendChild(card);

    /* add respective soil conditions accordingly to plant info in
       plants object soil array */
    const cardBody = document.getElementById(plants[i].name);
    for (let j = 0; j < plants[i].soil.length; j++) {
      const span = document.createElement('span');
      span.setAttribute('class', 'soil-info');

      // the index is one less than reference in plants object
      span.innerHTML = `${soil[plants[i].soil[j] - 1].condition}`;
      cardBody.appendChild(span);
    }
  }
}

showPlants();
