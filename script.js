/**
 * The Service Worker
 
if ('serviceWorker' in navigator) {
  // Check if the service worker feature is available in the browser in use
  navigator.serviceWorker.register('/zeigerpflanzen/sw.js').then(function() {
    console.log('Service Worker registered');
  });
}*/

/**
 * The Plant and soil info objects
 */
const soil = [
  /* !! Don't change the order of this list !! */
  { id: 1, condition: 'trocken', header: 'trockenen Boden' },
  { id: 2, condition: 'nass', header: 'nassen Boden' },
  { id: 3, condition: 'komprimiert', header: 'komprimierten Boden' },
  {
    id: 4,
    condition: 'natürlich/unkultiviert',
    header: 'natürlichen- / unkultivierten Boden'
  },
  { id: 5, condition: 'stickstoffarm', header: 'stickstoffarmen Boden' },
  { id: 6, condition: 'stickstoffreich', header: 'stickstoffreichen Boden' },
  { id: 7, condition: 'kaliumarm', header: 'kaliumarmen Boden' },
  { id: 8, condition: 'kaliumreich', header: 'kaliumreichen Boden' },
  { id: 9, condition: 'phosphorarm', header: 'phosphorarmen Boden' },
  { id: 10, condition: 'phosphorreich', header: 'phosphorreichen Boden' },
  { id: 11, condition: 'sandig', header: 'sandigen Boden' },
  { id: 12, condition: 'lehmig', header: 'lehmigen Boden' },
  {
    id: 13,
    condition: 'tiefgreifende Mineralschicht',
    header: 'Boden mit tiefgreifender Mineralschicht'
  },
  { id: 14, condition: 'sauer', header: 'sauren Boden' },
  { id: 15, condition: 'basisch', header: 'basischen Boden' },
  { id: 16, condition: 'mager', header: 'mageren Boden' },
  { id: 17, condition: 'nährstoffreich', header: 'nährstoffreichen Boden' },
  { id: 18, condition: 'salzig', header: 'salzigen Boden' }
];

const plants = [
  {
    name: 'Zurückgebogener Amaranth',
    latin: 'Amaranthus retroflexus',
    soil: [1, 3],
    img: 'AmaranthusRetroflexus.jpg',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Amaranthus_retroflexus_full1.jpg',
    url: 'https://de.wikipedia.org/wiki/Zur%C3%BCckgebogener_Amarant',
    desc:
      'Der Zurückgebogene Amarant (Amaranthus retroflexus), auch Zurückgekrümmter Fuchsschwanz oder Rauhaariger Amarant genannt, ist eine Pflanzenart innerhalb der Familie der Fuchsschwanzgewächse (Amaranthaceae). Er ist in Mitteleuropa ein häufiges, wärmeliebendes „Unkraut“ in Mais- und Zuckerrübenfeldern, in Haus- und Gemüsegärten sowie in Weinbergen.'
  },
  {
    name: 'Gemeiner Odermenning',
    latin: 'Agrimonia eupatoria',
    soil: [1],
    img: 'AgrimoniaEupatoria.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gemeiner_Odermennig#/media/File:Agrimonia_eupatoria_04.jpg',
    url: 'https://de.wikipedia.org/wiki/Gemeiner_Odermennig',
    desc:
      'Der Gewöhnliche Odermennig (Agrimonia eupatoria), auch Gemeiner Odermennig, Ackerkraut oder Kleiner Odermennig genannt, ist eine Pflanzenart in der Unterfamilie der Rosoideae innerhalb der Familie der Rosengewächse (Rosaceae). Sie ist in Eurasien weitverbreitet.'
  },
  {
    name: 'Acker-Gauchheil',
    latin: 'Anagallis arvensis',
    soil: [15],
    img: 'AnagallisArvensis.jpg',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/1/15/AnagallisArvensis.jpg',
    url: 'https://de.wikipedia.org/wiki/Acker-Gauchheil',
    desc:
      'Der Acker-Gauchheil (Anagallis arvensis), auch Roter Gauchheil, Nebelpflanze, Weinbergsstern oder Wetterkraut genannt, ist eine Pflanzenart aus der Gattung Gauchheil (Anagallis) in der Unterfamilie der Myrsinengewächse (Myrsinaoideae) innerhalb der Familie der Primelgewächse (Primulaceae). Er gilt im Ackerbau als Unkraut, weil er schwach giftig in all seinen Teilen ist, vor allem in der Wurzel.'
  },
  {
    name: 'Salz-Aster',
    latin: 'Aster tripolium',
    soil: [18],
    img: 'AsterTripolium.jpg',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/d/d1/Strandasters.jpg',
    url: 'https://de.wikipedia.org/wiki/Strand-Aster',
    desc:
      'Die Strand-Aster (Tripolium pannonicum, Syn.: Aster tripolium L.), auch Salz-Aster und Pannonien-Salzaster genannt, ist eine Pflanzenart in der Familie der Korbblütler (Asteraceae). Sie gehört zu den sehr auffälligen Pflanzenarten auf Salzböden.'
  },
  {
    name: 'Kanadisches Berufskraut',
    latin: 'Erigeron canadensis',
    soil: [2],
    img: 'ErigeronCanadensis.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Kanadisches_Berufkraut#/media/File:Conyza_canadense_002.JPG',
    url: 'https://de.wikipedia.org/wiki/Kanadisches_Berufkraut',
    desc:
      'Das Kanadische Berufkraut (Conyza canadensis), auch Katzenschweif und Weiße Dürrwurz genannt, ist eine Pflanzenart aus der Familie der Korbblütler (Asteraceae). Es wird auch oft unter dem wissenschaftlichen Namen Erigeron canadensis der Gattung Erigeron geführt.'
  },
  {
    name: 'Gewöhnliches Greiskraut',
    latin: 'Senecio vulgaris',
    soil: [3, 17],
    img: 'SenecioVulgaris.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gew%C3%B6hnliches_Greiskraut#/media/File:20150418Senecio_vulgaris6.jpg',
    url: 'https://de.wikipedia.org/wiki/Gew%C3%B6hnliches_Greiskraut',
    desc:
      'Das Gewöhnliche Greiskraut (Senecio vulgaris), auch Gemeines Greiskraut oder Gemeines Kreuzkraut genannt, ist eine der häufigsten Arten aus der Gattung der Greiskräuter (Senecio) innerhalb der Familie der Korbblütler (Asteraceae).'
  },
  {
    name: 'Adlerfarn',
    latin: 'Pteridium aquilinum',
    soil: [7, 9, 14],
    img: 'PteridiumAquilinum.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Adlerfarn#/media/File:Pteridium_aquilinum_(habitus).jpg',
    url: 'https://de.wikipedia.org/wiki/Adlerfarn',
    desc:
      'Der Adlerfarn (Pteridium aquilinum) ist ein weltweit verbreiteter, auffälliger Farn. Die Farne sind eine Gruppe von Gefäßsporenpflanzen, die die Schwestergruppe der Samenpflanzen bilden.',
    photographer: 'Hans Hillewaert'
  },
  {
    name: 'Schwarzes Bilsenkraut',
    latin: 'Hyoscyamus niger',
    soil: [15],
    img: 'HyoscyamusNiger.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Schwarzes_Bilsenkraut#/media/File:Hyoscyamus_niger_0003.JPG',
    url: 'https://de.wikipedia.org/wiki/Schwarzes_Bilsenkraut',
    desc:
      'Das Schwarze Bilsenkraut (Hyoscyamus niger) ist eine Pflanze aus der Gattung der Bilsenkräuter aus der Familie der Nachtschattengewächse (Solanaceae). Schwarzes Bilsenkraut wächst in Schuttunkrautgesellschaften, an Wegrändern, Mauern usw. Es bevorzugt frische, nährstoff- und stickstoffreiche Sand- oder Lehmböden.',
    photographer: 'H. Zell'
  },
  {
    name: 'Gemeiner Beifuß',
    latin: 'Artemisia vulgaris',
    soil: [4],
    img: 'ArtemisiaVulgaris.jpg',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/6/6f/ArtemisiaVulgaris.jpg',
    url: 'https://de.wikipedia.org/wiki/Beifu%C3%9F',
    desc:
      'Der Beifuß oder Gemeine Beifuß (Artemisia vulgaris), auch Gewürzbeifuß oder Gewöhnlicher Beifuß genannt, ist eine Pflanzenart aus der Gattung Artemisia in der Familie der Korbblütler (Asteraceae, veraltet Compositae). Auf nährstoffreichen Böden, vor allem Ruderalfluren kommt der Beifuß wild vor.',
    photographer: 'Christian Fischer'
  },
  {
    name: 'Gemeine Wegwarte',
    latin: 'Cichorium intybus',
    soil: [3, 12, 17],
    img: 'CichoriumIntybus.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gemeine_Wegwarte#/media/File:Cichorium_Intybus.jpg',
    url: 'https://de.wikipedia.org/wiki/Gemeine_Wegwarte',
    desc:
      'Die Gemeine oder Gewöhnliche Wegwarte (Cichorium intybus), auch Zichorie (von lateinisch cichorea) genannt, ist eine Pflanzenart aus der Familie der Korbblütler (Asteraceae). Sie wächst in Mitteleuropa häufig an Wegrändern. Kulturformen sind Chicorée, Zuckerhut (Fleischkraut), Radicchio, Schnittzichorie und die Wurzelzichorie. Sie kommt vorwiegend auf frischen bis eher trockenen, nährstoffreichen Böden vor und erträgt auch einen gewissen Salzgehalt.',
    photographer: 'Christian Fischer'
  },
  {
    name: 'Gewöhnliche Vogelmiere',
    latin: 'Stellaria media',
    soil: [3, 17],
    img: 'StellariaMedia.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gew%C3%B6hnliche_Vogelmiere#/media/File:Chickweed_(aka).jpg',
    url: 'https://de.wikipedia.org/wiki/Gew%C3%B6hnliche_Vogelmiere',
    desc:
      'Die Gewöhnliche Vogelmiere (Stellaria media), auch Vogel-Sternmiere, Hühnerdarm, Hühnerscherbe oder Hustdarm genannt, ist eine Pflanzenart der Familie der Nelkengewächse (Caryophyllaceae). Das weit verbreitete „Unkraut“ kann als Wildgemüse und Heilpflanze verwendet werden. Sie bevorzugt feuchte, nährstoffreiche Böden, die auch im Schatten liegen können. Verbreitet ist sie von der Ebene bis ins Gebirge. Nach Ellenberg ist sie ein Schwachsäure- bis Schwachbasenzeiger, ein ausgesprochener Stickstoffzeiger und eine Ordnungscharakterart nährstoffreicher Acker- und Garten-Beikrautfluren (Polygono-Chenopodietalia)',
    photographer: 'André Karwath'
  },
  {
    name: 'Huflattich',
    latin: 'Tussilago farfara',
    soil: [2, 12, 14],
    img: 'TussilagoFarfara.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Huflattich#/media/File:Coltsfoot.jpg',
    url: 'https://de.wikipedia.org/wiki/Huflattich',
    desc:
      'Der Huflattich (Tussilago farfara) ist die einzige Pflanzenart der Gattung Tussilago aus der Familie der Korbblütler (Asteraceae). Er gehört zu den ersten Frühjahrsblumen, deren Blüten vor der Entwicklung der Laubblätter erscheinen. Der Huflattich war in Deutschland die Heilpflanze des Jahres 1994. Er ist auch bekannt unter den Namen Breit-, Brust- oder Eselslattich, Latten, Lette, Ackerlatsche, Kuhfladen, Esels- oder Rosshuf, Eselstappe, Fohlenfuß und Hufblatt. Er besiedelt trocken-warme Standorte auf durchlässigen Böden. Daher tritt der Huflattich oft auf Dämmen, in Steinbrüchen und an unbefestigten Wegen auf.',
    photographer: 'Andreas Trepte'
  },
  {
    name: 'Wilde Möhre',
    latin: 'Daucus carota',
    soil: [4, 11, 15, 16],
    img: 'DaucusCarota.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Wilde_M%C3%B6hre#/media/File:Daucus_carotaA.jpg',
    url: 'https://de.wikipedia.org/wiki/Wilde_M%C3%B6hre',
    desc:
      'Die in Mitteleuropa heimische Wilde Möhre (Daucus carota subsp. carota) ist ein Elternteil der Gartenmöhre oder Karotte. Sie gehört zur Familie der Doldenblütler (Apiaceae). Im Gegensatz zur Gartenmöhre ist die Speicherwurzel der Wilden Möhre bleich. Die Wilde Möhre besitzt ihr Hauptvorkommen in nährstoffreichen Stauden- und ausdauernden Unkrautfluren, halbruderalen Queckenrasen trockenwarmer Standorte. Frischwiesen und -weiden zählen ebenso zu den oft besiedelten Standorten. Sie gedeiht hauptsächlich im Offenland, aber auch im Wald. Oft findet man sie auch auf Ruderalflächen.',
    photographer: 'Christian Fischer'
  },
  {
    name: 'Gewöhnliche Goldrute',
    latin: 'Solidago virgaurea',
    soil: [2, 11],
    img: 'SolidagoVirgaurea.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gew%C3%B6hnliche_Goldrute#/media/File:Solidago_virgaurea09.jpg',
    url: 'https://de.wikipedia.org/wiki/Gew%C3%B6hnliche_Goldrute',
    desc:
      'Die Gewöhnliche Goldrute (Solidago virgaurea), auch Gemeine Goldrute oder Echte Goldrute genannt, ist eine Pflanzenart aus der Gattung der Goldruten (Solidago) innerhalb der Familie der Korbblütler (Asteraceae).',
    photographer: 'Stéphane TASSON'
  },
  {
    name: 'Weißer Gänsefuß',
    latin: 'Chenopodium album',
    soil: [3, 17],
    img: 'ChenopodiumAlbum.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Wei%C3%9Fer_G%C3%A4nsefu%C3%9F#/media/File:Melganzenvoet_bloeiwijze_Chenopodium_album.jpg',
    url: 'https://de.wikipedia.org/wiki/Wei%C3%9Fer_G%C3%A4nsefu%C3%9F',
    desc:
      'Der Weiße Gänsefuß (Chenopodium album), auch Weiß-Gänsefuß genannt,[1] ist eine Pflanzenart aus der Gattung Gänsefuß (Chenopodium) in der Familie der Fuchsschwanzgewächse (Amaranthaceae). In Mitteleuropa meist als landwirtschaftliches Unkraut betrachtet, dient er in anderen Regionen als Gemüse, Pseudogetreide oder Futterpflanze. Man findet ihn in Mitteleuropa verbreitet in Ruderalvegetation und Unkrautfluren, vor allem als Erstbesiedler auf Schuttplätzen, an Wegen, in Äckern und Gärten, auch an Ufern und in Schlägen. Er gedeiht auf allen ausreichend nährstoffreichen Böden.',
    photographer: 'Rasbak'
  },
  {
    name: 'Acker-Hundskamille',
    latin: 'Anthemis arvensis',
    soil: [2, 7, 13, 15],
    img: 'AnthemisArvensis.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Acker-Hundskamille#/media/File:Anthemis_arvensis_(subsp._arvensis)_sl5.jpg',
    url: 'https://de.wikipedia.org/wiki/Acker-Hundskamille',
    desc:
      'Die Acker-Hundskamille (Anthemis arvensis) ist eine Pflanzenart innerhalb der Familie der Korbblütler (Asteraceae). Die Acker-Hundskamille ist ein Ackerwildkraut, ein Archäophyt, ein Kulturbegleiter und ein Versauerungszeiger. Als Standorte werden Äcker, Brachflächen und Wegränder, besonders auf kalkfreien, sauren Böden bevorzugt. Diese Pflanzenart ist in ganz Europa häufig.',
    photographer: 'Stefan.lefnaer'
  },
  {
    name: 'Gewöhnlicher Hirtentäschen',
    latin: 'Capsella bursa pastoris',
    soil: [11, 18],
    img: 'CapsellaBursaPastoris.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gew%C3%B6hnliches_Hirtent%C3%A4schel#/media/File:Hirtent%C3%A4schel_in_Trebus_2007.JPG',
    url: 'https://de.wikipedia.org/wiki/Gew%C3%B6hnliches_Hirtent%C3%A4schel',
    desc:
      'Das Gewöhnliche Hirtentäschel (Capsella bursa-pastoris), auch Hirtentäschelkraut genannt, ist eine Pflanzenart in der Familie der Kreuzblütengewächse (Brassicaceae). Der wissenschaftliche Name Capsella bursa-pastoris kommt von lat. capsa = Kapsel, bursa = Tasche und pastor = Hirt, da die Schötchen der Pflanze wie die Taschen früherer Hirten geformt sind. Diese Art kommt in ganz Europa vor und ist in Mitteleuropa sehr häufig. Als Standorte werden Ruderalstellen, Äcker und Gärten bevorzugt. Die Pflanze ist stickstoff- und lichtliebend und gedeiht auf nährstoffreichen Böden. Das Hirtentäschelkraut kommt bis in die subalpine Höhenstufe vor.',
    photographer: 'Conrad Nutschan'
  },
  {
    name: 'Gewöhnlicher Erdrauch',
    latin: 'Fumaria officinalis',
    soil: [8],
    img: 'FumariaOfficinalis.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gew%C3%B6hnlicher_Erdrauch#/media/File:Fumaria_officinalis_003.JPG',
    url: 'https://de.wikipedia.org/wiki/Gew%C3%B6hnlicher_Erdrauch',
    desc:
      'Der Gewöhnliche Erdrauch (Fumaria officinalis), auch Gemeiner Erdrauch genannt, ist die in Mitteleuropa häufigste Pflanzenart der Gattung Erdrauch (Fumaria). Diese Art gilt als Nährstoffanzeiger. Sie wächst auf bearbeitetem Boden wie in Gärten, auf Äckern oder Weinbergen oder an Ruderalstellen, wo sie überall häufig ist. Dabei tritt sie in kleinen Gruppen oder als Einzelexemplar auf. Sie gedeiht auf frischen, basenreichen, milden bis mäßig sauren, humosen lockeren Lehmböden.',
    photographer: 'H. Zell'
  },
  {
    name: 'Strahlenlose Kamille',
    latin: 'Matricaria matricarioides',
    soil: [13],
    img: 'MatricariaMatricarioides.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Strahlenlose_Kamille#/media/File:Plant_on_puddle.jpg',
    url: 'https://de.wikipedia.org/wiki/Strahlenlose_Kamille',
    desc:
      'Die Strahlenlose Kamille (Matricaria discoidea), auch Strahllose Kamille genannt, ist eine Pflanzenart aus der Gattung der Kamillen (Matricaria); sie gehört zur Unterfamilie der Asteroideae innerhalb der Familie der Korbblütler (Asteraceae). Sie tritt in gemäßigten Zonen weltweit als Neophyt auf. Sie kommt in Trittrasen, vor allem in Siedlungsnähe vor; sie wächst dort oft in größeren Gruppen. Sie bevorzugt offenen, nährstoffreichen, dichten Lehm- und Tonboden. Nach Ellenberg ist sie eine Lichtpflanze, ein Mäßigwärmezeiger, ein Frischezeiger, ein Schwachsäure- bis Schwachbasezeiger, ein ausgesprochener Stickstoffzeiger und eine Verbandscharakterart der Vogelknöterich-Trittrasen-Gesellschaften (Polygonion avicularis).',
    photographer: 'Tiia Monto'
  },
  {
    name: 'Acker-Rettich',
    latin: 'Raphanus raphanistrum',
    soil: [4, 14, 16],
    img: 'RaphanusRaphanistrum.jpg',
    imgSrc:
      'https://en.wikipedia.org/wiki/Raphanus_raphanistrum#/media/File:Wild_Radish.jpg',
    url: 'https://de.wikipedia.org/wiki/Acker-Rettich',
    desc:
      'Acker-Rettich (Raphanus raphanistrum), auch Hederich oder Wilder Rettich genannt, ist eine Pflanzenart aus der Gattung Rettiche (Raphanus) innerhalb der Familie der Kreuzblütengewächse (Brassicaceae). Trotz seines Namens bildet er keine verdickte Wurzel und ist kein Vorfahre des Garten-Rettichs (Raphanus sativus), sondern lediglich mit ihm verwandt. Der Acker-Hederich kommt häufig in Unkrautfluren der Äcker und besonders der Getreidefelder, auch an Schuttplätzen vor. Er bevorzugt kalkarme Böden und zeigt Bodenversauerung an. Er wird auch als Gründüngung gesät.',
    photographer: 'Joanna Voulgaraki'
  },
  {
    name: 'Hasen-Klee',
    latin: 'Trifolium arvense',
    soil: [1, 8, 14],
    img: 'TrifoliumArvense.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Hasen-Klee#/media/File:20140728Trifolium_arvense2.jpg',
    url: 'https://de.wikipedia.org/wiki/Hasen-Klee',
    desc:
      'Der Hasen-Klee (Trifolium arvense) ist eine Pflanzenart aus der Gattung Klee (Trifolium) innerhalb der Familie der Hülsenfrüchtler (Fabaceae). Der Hasen-Klee besiedelt in Mitteleuropa ziemlich häufig lückige Magerrasen, Sandfelder und Felsköpfe, Wegränder, Sandwege und Dämme, in Brachland und Äcker (beispielsweise Hackfruchtäcker).[4] Der Hasen-Klee gedeiht am besten auf lockeren feinerdearmen, ziemlich trockenen, kalkarmen und daher etwas bis mäßig sauren, rohen, sandigen oder steinig-grusigen Böden. Nach Ellenberg ist er eine Lichtpflanze, ein Trockniszeiger, stickstoffärmste Standorte anzeigend und in Mitteleuropa eine Klassencharakterart lockerer Sand- und Felsrasen (Sedo-Scleranthetea).',
    photographer: 'AnRo0002'
  },
  {
    name: 'Weiß-Klee',
    latin: 'Trifolium repens',
    soil: [1, 4],
    img: 'TrifoliumRepens.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Wei%C3%9Fklee#/media/File:TrifoliumRepensFlowers.jpg',
    url: 'https://de.wikipedia.org/wiki/Wei%C3%9Fklee',
    desc:
      'Der Weißklee (Trifolium repens), auch Kriechklee genannt, ist eine Pflanzenart, die zur Unterfamilie der Schmetterlingsblütler (Faboideae) innerhalb der Familie der Hülsenfrüchtler (Fabaceae oder Leguminosae) gehört. Der Weißklee besiedelt hauptsächlich Wiesen und Weideland. Da er sehr trittresistent ist, ist er oft auch an Wegrändern und in Sportanlagen zu finden. Er bevorzugt nährstoffreiche, leicht kalkhaltige, lehmige, feuchte Böden und wächst auch in Sandboden, welcher noch Hafer trägt.',
    photographer: 'Fanghong'
  },
  {
    name: 'Wiesen-Klee',
    latin: 'Trifolium pratense',
    soil: [8],
    img: 'TrifoliumPratense.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Wiesenklee#/media/File:Trifolium_pratense_-_Keila2.jpg',
    url: 'https://de.wikipedia.org/wiki/Wiesenklee',
    desc:
      'Der Wiesenklee (Trifolium pratense), auch Rotklee genannt,[1] ist eine Pflanzenart aus der Gattung Klee (Trifolium) in der Unterfamilie der Schmetterlingsblütler (Faboideae) innerhalb der Familie der Hülsenfrüchtler (Fabaceae oder Leguminosae). Man findet den Wiesenklee in Fettwiesen, auf Feldern und in lichten Wäldern, auch als Kulturpflanze wird er angebaut. Er bevorzugt frische, nährstoffreiche, tiefgründige Ton- und Lehmböden und ist kalk- und sulfatliebend.',
    photographer: 'Ivar Leidus'
  },
  {
    name: 'Einjähriger Knäuel',
    latin: 'Scleranthus annuus',
    soil: [14],
    img: 'ScleranthusAnnuus.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Einj%C3%A4hriger_Kn%C3%A4uel#/media/File:Scleranthus_annuus_eF.jpg',
    url: 'https://de.wikipedia.org/wiki/Einj%C3%A4hriger_Kn%C3%A4uel',
    desc:
      'Der Einjährige Knäuel (Scleranthus annuus), auch Einjahrs-Knäuelkraut genannt, ist ein Angehöriger der Nelkengewächse (Caryophyllaceae). Er blüht von Mai bis Oktober. Der Einjährige Knäuel wächst in Ackerunkrautfluren, seltener auch an Wegen oder Schuttplätzen. Er bevorzugt mäßig trockenen bis frischen, mehr oder weniger nährstoffreichen, kalkarmen, mäßig sauren Sandboden oder sandigen Lehmboden. Es ist ein bis zu 20 cm tief wurzelnder Versauerungszeiger.',
    photographer: 'Fornax'
  },
  {
    name: 'Kornblume',
    latin: 'Centaurea cyanus',
    soil: [11],
    img: 'CentaureaCyanus.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Kornblume#/media/File:Kornblume02.JPG',
    url: 'https://de.wikipedia.org/wiki/Kornblume',
    desc:
      'Die Kornblume (Cyanus segetum Hill, Syn.: Centaurea cyanus L.), auch Zyane genannt, ist eine Pflanzenart aus der Gattung Cyanus innerhalb der Familie der Korbblütler (Asteraceae). Seitdem der Mensch Ackerbau betreibt, ist die Kornblume eine ständige Begleiterin von Getreidefeldern. Doch auch an Schuttplätzen und recht trockenen Standorten ist die Kornblume stellenweise zu finden. Lange Zeit war sie durch Überdüngung der Felder selten geworden. Sie ist ein Bioindikator, der anzeigt, wie stark die Felder in vergangenen Jahren gedüngt wurden. Heutzutage ist sie wieder häufiger anzutreffen.',
    photographer: 'böhringer friedrich'
  },
  {
    name: 'Kriech-Quecke',
    latin: 'Elymus repens',
    soil: [13],
    img: 'ElymusRepens.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Kriech-Quecke#/media/File:Kweek_Elytrigia_repens.jpg',
    url: 'https://de.wikipedia.org/wiki/Kriech-Quecke',
    desc:
      'Die Kriech-Quecke (Elymus repens), auch Gemeine Quecke, Gewöhnliche Quecke oder einfach Quecke genannt, ist eine Pflanzenart aus der Gattung Quecken (Elymus) innerhalb der Familie der Süßgräser (Poaceae). Der Trivialname Quecke ist aus queck, quick = „zählebig“ entstanden. Dieses Gras ist nahezu weltweit verbreitet und stellt eine Pionierpflanze auf fast allen Böden dar. Die Kriech-Quecke kommt auf Ackerflächen, nährstoffreichen Wiesen („Jauchewiesen“), überweideten Weiden, an Wegen, in Ufersäumen und in Unkrautgesellschaften vor, etwa an Dämmen oder Schuttplätzen. Es handelt sich um eine Halblichtpflanze, die vor allem an stickstoffreichen Standorten wächst. Sie gedeiht auf frischen bis mäßig trockenen, nährstoff- und basenreichen, humosen oder rohen, oft dichten Lehm- oder Tonböden.',
    photographer: 'Rasbak'
  },
  {
    name: 'Lupinen',
    latin: 'Lupinus sp.',
    soil: [5],
    img: 'Lupinus.jpg',
    imgSrc: 'https://de.wikipedia.org/wiki/Lupinen#/media/File:Lupinen.jpg',
    url: 'https://de.wikipedia.org/wiki/Lupinen',
    desc:
      'Die Lupinen (Lupinus; von althochdeutsch luvina, zu lateinisch lupus, deutsch ‚Wolf‘), selten auch Wolfsbohne oder Feigbohne genannt, sind eine Pflanzengattung in der Unterfamilie der Schmetterlingsblütler (Faboideae) innerhalb der Familie der Hülsenfrüchtler (Fabaceae oder Leguminosae). Zur gleichen Familie gehören beispielsweise Erbse, Kichererbse und Erdnuss. Die Samen insbesondere wilder und Gartenlupinen enthalten Lupinin, einen giftigen Bitterstoff, der den Tod durch Atemlähmung verursachen kann. Bestimmte Zuchtformen hingegen sind ungiftig und nicht bitter. Lupinen reichern den Boden mit bis zu 100 kg Stickstoff pro Hektar an, was in der Landwirtschaft zur Gründüngung erwünscht sein kann. Die kräftigen Wurzeln können auch verdichteten Boden durchdringen und so die Durchwurzelbarkeit des Bodens für Folgekulturen verbessern. Die Symbionten binden den Stickstoff aus der Luft und lösen zudem einen Teil des Phosphats im Boden.',
    photographer: 'Hedi Schäfer'
  },
  {
    name: 'Wermuth',
    latin: 'Artemisia absinthium',
    soil: [18],
    img: 'ArtemisiaAbsinthium.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Wermutkraut#/media/File:Artemisia_absinthium_0002.JPG',
    url: 'https://de.wikipedia.org/wiki/Wermutkraut',
    desc:
      '(Gemeiner) Wermut, Echt-Wermut[1] oder Wermutkraut (Artemisia absinthium L.), auch Bitterer Beifuß oder Alsem, ist eine Pflanzenart in der Gattung Artemisia aus der Familie der Korbblütler (Asteraceae). Wermut wird seit der Antike als Heilpflanze eingesetzt. Er wächst bevorzugt auf trockenen oder auf sandig-tonigen Böden in der Nähe von Wasserläufen in Höhen bis zu 3500 Meter.',
    photographer: 'H. Zell'
  },
  // { name: 'Melde sp.',
  //   latin: 'Atriplex sp.',
  //   soil: [17],
  //   img: '',
  //   imgSrc: '',
  //   url: '',
  //   desc: '',
  //   photographer: '', },
  {
    name: 'Löwenzahn',
    latin: 'Taraxacum officinale',
    soil: [3, 12, 14],
    img: 'TaraxacumOfficinale.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gew%C3%B6hnlicher_L%C3%B6wenzahn#/media/File:Taraxacum-officinalis-plant.jpg',
    url: 'https://de.wikipedia.org/wiki/Gew%C3%B6hnlicher_L%C3%B6wenzahn',
    desc:
      'Der Gewöhnliche Löwenzahn (Taraxacum sect. Ruderalia) stellt eine Gruppe sehr ähnlicher und nah verwandter Pflanzenarten in der Gattung Löwenzahn (Taraxacum) aus der Familie der Korbblütler (Asteraceae) dar. Meist werden diese Pflanzen einfach als Löwenzahn bezeichnet, wodurch Verwechslungsgefahr mit der Gattung Löwenzahn (Leontodon) besteht. In Mitteleuropa ist er ein häufiges Wildkraut auf Wiesen, an Wegrändern und in Gärten. Als Ruderalpflanze besiedelt er schnell Brachflächen, Schutthalden und Mauerritzen. Er wächst in Gebieten mit einer jährlichen Durchschnittstemperatur von 5 bis 26 °C und einem jährlichen Durchschnittsniederschlag von 0,3 bis 2,7 m auf Böden mit einem pH-Wert von 4,2 bis 8,3.',
    photographer: 'FoeNyx'
  },
  {
    name: 'Kleine Brennnessel',
    latin: 'Urtica urens',
    soil: [2, 3, 14],
    img: 'UrticaUrens.jpg',
    imgSrc:
      'https://en.wikipedia.org/wiki/Urtica_urens#/media/File:Urtica_urens_002.JPG',
    url: 'https://de.wikipedia.org/wiki/Kleine_Brennnessel',
    desc:
      'Die Kleine Brennnessel (Urtica urens), auch Eiternessel genannt, ist eine Pflanzenart aus der Gattung der Brennnesseln (Urtica). Sie ist in Eurasien weit verbreitet und in einigen Gebieten der Welt ein Neophyt. Die Kleine Brennnessel kommt zerstreut in Unkrautfluren von Schuttplätzen oder in Gärten, in Gemüsekulturen, an Mistplätzen, vor allem in Dörfern vor. Sie bevorzugt nährstoffreiche, extrem stickstoffreiche Böden. Nach Ellenberg ist sie eine Halblichtpflanze, ein Frischezeiger, ein ausgesprochener Stickstoffzeiger und eine Klassencharakterart der Ruderalgesellschaften und verwandter Acker- und Garten-Beikrautgesellschaften (Chenopodietea).',
    photographer: 'H. Zell'
  },
  {
    name: 'Magerwiesen Margerite',
    latin: 'Chrysanthemum leucanthemum',
    soil: [2, 4],
    img: 'ChrysanthemumLeucanthemum.jpg',
    imgSrc:
      'https://en.wikipedia.org/wiki/Leucanthemum_vulgare#/media/File:Leucanthemum_vulgare_%27Filigran%27_Flower_2200px.jpg',
    url: 'https://de.wikipedia.org/wiki/Magerwiesen-Margerite',
    desc:
      'Die Magerwiesen-Margerite (Leucanthemum vulgare) ist eine Art der Gattung der Margeriten in der Familie der Korbblütengewächse (Asteraceae). Sie bildet mit mehreren anderen ähnlichen Arten, etwa mit Leucanthemum ircutianum zusammen die Artengruppe der Wiesen-Margeriten (Leucanthemum vulgare agg.). Die Magerwiesen-Margerite im engeren Sinne wächst überwiegend auf stickstoffarmen, sonnigen bis halbschattigen, frischen bis halbtrockenen Wiesen, Weiden und Ruderalstandorten. Sie ist eine Charakterart des Verbands Mesobromion. ',
    photographer: 'Derek Ramsey'
  },
  {
    name: 'Acker-Schachtelhalm',
    latin: 'Equisetum arvense',
    soil: [2, 11],
    img: 'EquisetumArvense.jpg',
    imgSrc:
      'https://en.wikipedia.org/wiki/Equisetum_arvense#/media/File:Equisetum_arvense_foliage.jpg',
    url: 'https://de.wikipedia.org/wiki/Acker-Schachtelhalm',
    desc:
      'Der Acker-Schachtelhalm (Equisetum arvense), auch Zinnkraut, Acker-Zinnkraut, Katzenwedel, Pferdeschwanz, Schaftheu, Pfannebutzer oder Scheuerkraut genannt, ist eine Pflanzenart aus der Klasse der Schachtelhalme (Equisetopsida). Der Acker-Schachtelhalm besiedelt Äcker, lehmige feuchte Wiesenränder, Gräben und Böschungen und hat eine sehr weite, circumpolare Verbreitung auf der Nordhalbkugel. Es besteht an feuchten Standorten Verwechslungsgefahr mit dem Sumpf-Schachtelhalm (Equisetum palustre), der wegen seines Alkaloidgehaltes giftig sein soll.[9] Die Unterscheidung der beiden Arten ist von Laien etwas schwierig, zumal beide Arten an ähnlichen Standorten auftreten und sich auch vergesellschaften. Ein relativ sicheres Unterscheidungsmerkmal ist der Stängelquerschnitt.',
    photographer: 'MPF'
  },
  {
    name: 'Acker-Hellerkraut',
    latin: 'Thlaspi arvense',
    soil: [13, 15],
    img: 'ThlaspiArvense.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Acker-Hellerkraut#/media/File:Acker-Hellerkraut_Thlaspi_arvense_5_11.jpg',
    url: 'https://de.wikipedia.org/wiki/Acker-Hellerkraut',
    desc:
      'Das Acker-Hellerkraut (Thlaspi arvense), auch als Acker-Täschelkraut, Acker-Pfennigkraut oder Ackertäschel bezeichnet, ist ein in Mitteleuropa verbreiteter und häufig vorkommender Angehöriger der Kreuzblütengewächse (Brassicaceae). Thlaspi arvense ist praktisch in ganz Europa und von Westasien bis Ostasien und auf dem indischen Subkontinent verbreitet. Das Acker-Hellerkraut wächst in Ackerunkrautgesellschaften, aber auch in Ruderalfluren und auf Schuttplätzen. Es bevorzugt nährstoffreiche, humose, insbesondere lehmige Böden. ',
    photographer: 'Hajotthu'
  },
  {
    name: 'Floh-Knöterich',
    latin: 'Polygonum persicaria',
    soil: [2, 14],
    img: 'PolygonumPersicaria.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Floh-Kn%C3%B6terich#/media/File:Polygonum_persicaria.jpg',
    url: 'https://de.wikipedia.org/wiki/Floh-Kn%C3%B6terich',
    desc:
      'Der Floh-Knöterich (Persicaria maculosa Gray, Syn.: Polygonum persicaria L., Persicaria maculata (Raf.) Fourr.), auch Pfirsichblättriger Knöterich genannt, ist eine Pflanzenart aus der Familie der Knöterichgewächse (Polygonaceae). Der Floh-Knöterich ist circumpolar verbreitet. Er kommt ursprünglich in den gemäßigten Zonen Asiens, in Nepal und Indonesien und im europäischen Russland vor. In weiteren Ländern ist er ein Neophyt. Er ist eine nährstoffsanspruchsvolle Pflanze (starker Stickstoffzeiger) und ist daher meist an vom Menschen beeinflussten Ruderalstellen zu finden. So kommt er auf feuchten Äckern, an Schuttplätzen, Halden, Wegrändern, oder Flussufern in ganz Mitteleuropa außer den Alpen häufig vor. Er ist in Mitteleuropa eine Charakterart der Ordnung Polygono-Chenopodietalia, kommt aber auch in Gesellschaften der Ordnung Bidentetalia oder des Verbands Sisymbrion vor.',
    photographer: 'Bouba'
  },
  {
    name: 'Vogelknöterich',
    latin: 'Polygonum aviculare',
    soil: [3, 14],
    img: 'PolygonumAviculare.jpg',
    imgSrc:
      'https://en.wikipedia.org/wiki/Polygonum_aviculare#/media/File:Polygonum_aviculare_4.JPG',
    url: 'https://de.wikipedia.org/wiki/Vogelkn%C3%B6terich',
    desc:
      'Der Vogelknöterich (Polygonum aviculare) ist eine Pflanzenart aus der Familie der Knöterichgewächse (Polygonaceae). Er ist eine Sammelart mit mehreren Kleinarten. Der Vogelknöterich ist in Mitteleuropa sehr häufig. Er gedeiht von der Ebene bis ins Gebirge, in den Alpen bis in eine Höhenlage von 1200 Meter. Der Vogelknöterich, früher auch Weggras und Proserpinata genannt, ist eine Pionierpflanze und wächst vor allem auf Wegen, Schutt, Gräben, Kiesplätzen, Trittstellen, Äckern. Er gedeiht auf trockenen bis mäßig trockenen, nährstoffreichen, humosen oder rohen Stein-, Sand- und Lehmböden. Er ist ein Stickstoffzeiger.',
    photographer: 'Dalgial'
  },
  {
    name: 'Silber-Fingerkraut',
    latin: 'Potentilla argentea',
    soil: [1, 14],
    img: 'PotentillaArgentea.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Silber-Fingerkraut#/media/File:Potentilla_argentea1_eF.jpg',
    url: 'https://de.wikipedia.org/wiki/Silber-Fingerkraut',
    desc:
      'Das Silber-Fingerkraut (Potentilla argentea) ist eine Pflanzenart aus der Familie der Rosengewächse (Rosaceae). Das Silber-Fingerkraut kommt nicht nur in Europa vor, sondern auch in Teilen Westasiens und Nordamerikas. In ganz Deutschland tritt es gebietsweise häufig auf. Das Silbrige Fingerkraut gedeiht an Wegrändern, Bahnanlagen, Kiesgruben und Felsfluren. Bevorzugt werden trockene, mäßig frische, sandige bis kiesige Ruderalstellen.',
    photographer: 'Fornax'
  },
  {
    name: 'Scharfer Hahnenfuß',
    latin: 'Ranunculus acris',
    soil: [2, 3, 12],
    img: 'RanunculusAcris.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Scharfer_Hahnenfu%C3%9F#/media/File:RanunculusAcris.jpg',
    url: 'https://de.wikipedia.org/wiki/Scharfer_Hahnenfu%C3%9F',
    desc:
      'Der Scharfe Hahnenfuß (Ranunculus acris) ist eine Pflanzenart aus der Gattung (Ranunculus) Hahnenfuß innerhalb der Familie der Hahnenfußgewächse (Ranunculaceae). In einigen Regionen Deutschlands und in der deutschsprachigen Schweiz wird sie – wie allerdings manche anderen gelbblühenden Wiesenblumen auch – manchmal als Butterblume bezeichnet (vergleiche beispielsweise auch Kriechender Hahnenfuß). Giftig sind alle Pflanzenteile, besonders die Wurzeln. Er gedeiht in Höhenlagen zwischen 0 und 2300 Metern, stellenweise bis zu 2757 Metern. Ranunculus acris wächst auf Wiesen und in Gebüschen. Der Scharfe Hahnenfuß gedeiht am besten auf nährstoff- und stickstoffreichen Lehmböden, die feucht, aber nicht ausgesprochen nass sein sollten.',
    photographer: 'Christian Fischer'
  },
  {
    name: 'Kriechender Hahnenfuß',
    latin: 'Ranunculus repens',
    soil: [2, 12],
    img: 'RanunculusRepens.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Kriechender_Hahnenfu%C3%9F#/media/File:Ranunculus_repens_LC0036.jpg',
    url: 'https://de.wikipedia.org/wiki/Kriechender_Hahnenfu%C3%9F',
    desc:
      'Der Kriechende Hahnenfuß (Ranunculus repens) ist eine Art aus der Gattung Hahnenfuß (Ranunculus) in der Familie der Hahnenfußgewächse (Ranunculaceae). Man findet den Kriechenden Hahnenfuß verbreitet in Pioniergesellschaften, auf Äckern, in Brachen und Gärten, an Ufern, Gräben und Wegen, in Wiesen und Auenwäldern. Er bevorzugt zumindest zeitweise feuchten, steinigen, humushaltigen oder rohen Lehm- und Tonboden; er geht auch auf verdichteten Boden und erträgt auch Überflutungen. Nach Ellenberg ist er ein Feuchtezeiger und eine Ordnungscharakterart der Gänsefingerkraut-Weißstraußgras-Kriechrasen (Agrostietalia stoloniferae).',
    photographer: 'Jörg Hempel'
  },
  {
    name: 'Raps',
    latin: 'Brassica napus',
    soil: [5],
    img: 'BrassicaNapus.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Raps#/media/File:Blossom_of_Rapeseed_plant_-_geograph.org.uk_-_11303.jpg',
    url: 'https://de.wikipedia.org/wiki/Raps',
    desc:
      'Raps (Brassica napus), auch Reps oder Lewat genannt, ist eine Pflanzenart aus der Familie der Kreuzblütengewächse (Brassicaceae). Es ist eine wirtschaftlich bedeutende Nutzpflanze. Die Ansprüche von Raps an den Boden sind denen des Weizens vergleichbar. Raps benötigt tiefgründigen Boden, der eine ungehinderte Wurzelentwicklung bis unterhalb des Bearbeitungshorizonts ermöglicht. Tiefgründige Lehmböden mit pH-Werten um 6,5 sind für den Anbau besonders geeignet. Ungeeignete Standorte für Raps sind sehr tonige Böden mit starker Neigung zu Staunässe wegen Einschränkungen bei der Bodenbearbeitung sowie extrem leichte oder flachgründige Böden, bei denen Trockenperioden die Ertragssicherheit verringern.',
    photographer: 'Peter Kochut'
  },
  {
    name: 'Kleiner Sauerampfer',
    latin: 'Rumex acetosella',
    soil: [11, 14],
    img: 'RumexAcetosella.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Kleiner_Sauerampfer#/media/File:Ahosuolahein%C3%A4_(Rumex_acetosella).jpg',
    url: 'https://de.wikipedia.org/wiki/Kleiner_Sauerampfer',
    desc:
      'Der Kleine Sauerampfer (Rumex acetosella), auch Zwerg-Sauerampfer oder Kleiner Ampfer genannt, ist eine Pflanzenart aus der Gattung der Ampfer (Rumex). Der Kleine Sauerampfer ist in fast ganz Europa beheimatet. Der Kleine Sauerampfer braucht nährstoffarme, am besten leicht saure Böden, die optimalerweise eher locker als fest sind. Am häufigsten gedeiht der Kleine Sauerampfer in Heiden, auf sandigen Wiesen, Schotterflächen, sauren Matten, sauren Äckern oder Mauerritzen. In den Alpen steigt der Kleine Sauerampfer meist bis in Höhenlagen von etwa 1500 Metern auf.',
    photographer: 'Henripekka Kallio'
  },
  {
    name: 'Gemeine Schafgarbe',
    latin: 'Achillea millefolium',
    soil: [7],
    img: 'AchilleaMillefolium.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Gemeine_Schafgarbe#/media/File:Gemeine_Schafgarbe.jpg',
    url: 'https://de.wikipedia.org/wiki/Gemeine_Schafgarbe',
    desc:
      'Die Gemeine Schafgarbe oder Gewöhnliche Schafgarbe (Achillea millefolium) ist eine Pflanzenart aus der Familie der Korbblütler (Asteraceae). Die Gewöhnliche Schafgarbe kommt ursprünglich in Eurasien, in Nord- und Mittelamerika vor. Als Standort werden Wiesen, (Schaf-)Weiden, Halbtrockenrasen, Acker- und Wegränder bevorzugt. In den Alpen steigt sie auf Höhenlagen von etwa 1900 Metern. Die Gemeine Schafgarbe gehört zu den Wurzelkriechern und Pionierpflanzen. Sie gilt als Bodenfestiger und Nährstoffzeiger vor allem für stickstoffhaltige Böden.',
    photographer: 'MarkusHagenlocher'
  },
  {
    name: 'Kompass-Lattich',
    latin: 'Lactuca serriola',
    soil: [3],
    img: 'LactucaSerriola.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Stachel-Lattich#/media/File:L-_serriola_Raupe.jpg',
    url: 'https://de.wikipedia.org/wiki/Stachel-Lattich',
    desc:
      'Der Stachel-Lattich (Lactuca serriola), auch Kompass-Lattich oder Zaun-Lattich genannt, gehört zur Familie der Korbblütler (Asteraceae). Die Pflanze hat am Stängel wechselständig verteilte Laubblätter, die mit ihrer Blattspreite oft senkrecht stehen und häufig Nord-Süd weisen. Sie gilt daher als eine Kompasspflanze. Das Verbreitungsgebiet des Stachel-Lattichs reicht in Süd-Nord-Richtung von Äthiopien und dem Mittelmeergebiet nach Norden bis in die Gemäßigte Zone; dort konzentrieren sich die Vorkommen auf Tieflagen und Wärmegebiete. Der Stachel-Lattich kommt häufig in sonnigen, lückigen Unkrautfluren, an Wegrändern, Schutt- und Trümmerplätzen, in Bahn- und Verladungsanlagen, an Mauern, Dämmen und in Hecken vor. Nach Ellenberg ist er eine Volllichtpflanze, ein Wärmezeiger, und eine Verbandscharakterart annueller Ruderalgesellschaften in gemäßigt warmem Klima (Sisymbrion).',
    photographer: 'R. Burkard'
  },
  {
    name: 'Gefleckter Schierling',
    latin: 'Conium maculatum',
    soil: [2],
    img: 'ConiumMaculatum.jpg',
    imgSrc:
      'https://en.wikipedia.org/wiki/Conium_maculatum#/media/File:Conium.jpg',
    url: 'https://de.wikipedia.org/wiki/Gefleckter_Schierling',
    desc:
      'Der Gefleckte Schierling (Conium maculatum) ist eine Pflanzenart aus der Familie der Doldenblütler (Apiaceae). Er gehört mit dem Wasserschierling (Cicuta virosa) und der Hundspetersilie (Aethusa cynapium) zu den giftigsten Arten der Doldengewächse. Mit einem Trank aus seinen Früchten oder Wurzeln wurden im Altertum Verurteilte hingerichtet, so zum Beispiel der griechische Philosoph Sokrates. Der Gefleckte Schierling findet sich auf typischen Ruderalflächen wie Schuttplätzen oder Brachen, an Ackerrainen, an Straßenrändern, manchmal auch auf Rübenäckern. Er bevorzugt tiefgründigere nährstoffreiche Lehmböden und gilt als Stickstoffanzeiger.',
    photographer: 'William & Wilma Follette'
  },
  {
    name: 'Stumpfblättriger Ampfer',
    latin: 'Rumex obtusifolius',
    soil: [2, 12],
    img: 'RumexObtusifolius.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Stumpfbl%C3%A4ttriger_Ampfer#/media/File:Rumex_obtusifolius_001.JPG',
    url: 'https://de.wikipedia.org/wiki/Stumpfbl%C3%A4ttriger_Ampfer',
    desc:
      'Der Stumpfblättrige Ampfer (Rumex obtusifolius) ist eine Pflanzenart aus der Gattung der Ampfer (Rumex). Er kommt ursprünglich in weiten Teilen Eurasiens und in Nordafrika vor. Er wird als Speise- und Heilpflanze verwendet, in Landwirtschaft und Gartenbau heute aber eher als Unkraut angesehen und gilt wegen seines eher hohen Oxalsäure-Gehalts auch als giftig. Der Stumpfblättrige Ampfer ist von der borealen bis zur submediterranen Zone Europas weit verbreitet. Der Stumpfblättrige Ampfer besiedelt ruderale Standorte an Graben- und Wegrändern und auf Schuttplätzen und Äckern, an Flussufern, auf Waldschlägen und als Überdüngungs- und Störzeiger auf Schnittwiesen und Weiden. Dabei bevorzugt er frische humusreiche oder rohe, nährstoffreiche Lehm- und Tonböden in hellen bis halbschattigen, luftfeuchten Lagen.',
    photographer: 'H. Zell'
  },
  {
    name: 'Hopfenklee',
    latin: 'Medicago lupulina',
    soil: [5, 15],
    img: 'MedicagoLupulina.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Hopfenklee#/media/File:MedicagoLupulina.jpg',
    url: 'https://de.wikipedia.org/wiki/Hopfenklee',
    desc:
      'Der Hopfenklee (Medicago lupulina), auch Hopfen-Luzerne[1], Zetterklee oder Gelbklee genannt, ist eine Pflanzenart aus der Gattung Schneckenklee (Medicago). Er ist in Eurasien und Afrika weitverbreitet. Der Hopfenklee wird selten als Futterpflanze kultiviert und als Wildgemüse genutzt. Medicago lupulina kommt in ganz Eurasien vor, besonders in den mittleren und südlichen Regionen. Der Hopfenklee fehlt nur im mitteleuropäischen Tiefland und in Gegenden mit kalkarmem Gestein in kleineren Gebieten; sonst kommt er in Mitteleuropa sehr häufig vor. Der Hopfenklee besiedelt in Mitteleuropa Wegränder, Dämme, Erdanrisse, Raine, trockene Fettwiesen, Kalk-Magerrasen (Halbtrockenrasen), und Äckern. Er wird gelegentlich zur Begrünung zusammen mit ausgesprochenen Pionierpflanzen auf rohen Böden ausgesät. Der Hopfenklee gedeiht am besten auf sommerwarmen, mäßig trockenen, basenreichen, kalkhaltigen, nicht allzu nährstoffarmen Lehm- oder Lößböden.',
    photographer: 'Tigerente'
  },
  {
    name: 'Acker-Winde',
    latin: 'Convolvulus arvensis',
    soil: [11, 13],
    img: 'ConvolvulusArvensis.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Acker-Winde#/media/File:Convolvulus_arvensis_001.JPG',
    url: 'https://de.wikipedia.org/wiki/Acker-Winde',
    desc:
      'Die Acker-Winde (Convolvulus arvensis) ist eine in Europa weit verbreitete Pflanze aus der Familie der Windengewächse (Convolvulaceae). Außer auf Äckern findet man die Acker-Winde auf Wegen, Wiesen und Schuttplätzen. Sie gedeiht in Mitteleuropa auf frischen bis mäßig trockenen, nährstoff- und basenreichen, meist humusarmen Lehm- oder Tonböden.',
    photographer: 'H. Zell'
  },
  {
    name: 'Echte Zaunwinde',
    latin: 'Convolvulus sepium',
    soil: [2],
    img: 'CalystegiaSepium.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Echte_Zaunwinde#/media/File:Calystegia_sepium_sepium_(aka).jpg',
    url: 'https://de.wikipedia.org/wiki/Echte_Zaunwinde',
    desc:
      'Die Echte Zaunwinde (Calystegia sepium - früher Convolvulus sepium) ist eine Pflanzenart aus der Gattung Zaunwinden (Calystegia) innerhalb der Familie der Windengewächse (Convolvulaceae). Die Echte Zaunwinde ist ein Hemikryptophyt und eine windende Kletterpflanze. Sie ist in den gemäßigten bis subtropischen Gebieten der Erde weit verbreitet. Die Echte Zaunwinde kann fast überall in Deutschland, Österreich und der Schweiz gefunden werden. Hier wächst sie zumeist in Hecken oder dichtem Gestrüpp.',
    photographer: 'André Karwath'
  },
  {
    name: 'Acker-Spark',
    latin: 'Spergula arvensis',
    soil: [11, 14],
    img: 'SpergulaArvensis.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Acker-Spark#/media/File:20170802Spergula_arvensis2.jpg',
    url: 'https://de.wikipedia.org/wiki/Acker-Spark',
    desc:
      'Der Acker-Spark (Spergula arvensis), auch Acker-Spörgel und Feld-Spark genannt, ist eine Pflanzenart innerhalb der Familie der Nelkengewächse (Caryophyllaceae). Spergula arvensis ist in den kühlgemäßigten Gebieten praktisch weltweit verbreitet. Der Acker-Spark wächst in Ackerunkraut-Fluren, gehackten Äckern, aber auch an Ruderalstellen oder in Waldschlägen. Er bevorzugt frische, nährstoffreiche, kalk- und basenarme, mäßig saure, humose, lockere Sandböden. Der Acker-Spark ist ein Versauerungsanzeiger.',
    photographer: 'AnRo0002'
  },
  {
    name: 'Acker-Gänsedistel',
    latin: 'Sonchus arvensis',
    soil: [12, 14],
    img: 'SonchusArvensis.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Acker-G%C3%A4nsedistel#/media/File:Sonchus_arvensis_Helgoland.JPG',
    url: 'https://de.wikipedia.org/wiki/Acker-G%C3%A4nsedistel',
    desc:
      'Die Acker-Gänsedistel (Sonchus arvensis) ist eine Pflanzenart aus der Familie der Korbblütler (Asteraceae). Diese Art ist ursprünglich in der gemäßigten Zone der Nordhalbkugel und fast in ganz Europa verbreitet. Als Standort bevorzugt die Ruderalpflanze Wegränder, Gärten, Weinberge und Äcker, aber auch Sanddünen und Salzsümpfe. Generell ist die Acker-Gänsedistel etwas salzertragend und gilt als Lehmzeiger.',
    photographer: 'Gabriele Kothe-Heinrich'
  },
  {
    name: 'Acker-Kratzdistel',
    latin: 'Cirsium arvense',
    soil: [12],
    img: 'CirsiumArvense.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Acker-Kratzdistel#/media/File:Cirsium_arvense_-_p%C3%B5ldohakas.jpg',
    url: 'https://de.wikipedia.org/wiki/Acker-Kratzdistel',
    desc:
      'Die Acker-Kratzdistel (Cirsium arvense) oder Ackerdistel ist eine Pflanzenart aus der Gattung der Kratzdisteln (Cirsium) innerhalb Familie der Korbblütler (Asteraceae). Sie fällt vor allem wegen ihrer bedornten Blätter und ihrer violett gefärbten Blüten auf. Man findet sie an Weg- und Feldrändern, deshalb wird sie auch oft als "Ackerunkraut" bezeichnet. Die Acker-Kratzdistel kommt vor allem an Wegrändern und Ruderalstellen in ganz Mitteleuropa vor. Selten wächst sie in Höhenlagen oberhalb 2000 Metern. Sie gedeiht am besten auf trockenen Standorten, gelegentlich findet man sie aber auch an feuchteren, halbschattigen Plätzen sowie häufig in Gebüschen und Hecken.',
    photographer: 'Ivar Leidus'
  },
  {
    name: 'Gänseblümchen',
    latin: 'Bellis perennis',
    soil: [12, 14],
    img: 'BellisPerennis.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/G%C3%A4nsebl%C3%BCmchen#/media/File:Daisies-Focus.jpg',
    url: 'https://de.wikipedia.org/wiki/G%C3%A4nsebl%C3%BCmchen',
    desc:
      'Das Gänseblümchen (Bellis perennis), auch Ausdauerndes Gänseblümchen, Mehrjähriges Gänseblümchen, Maßliebchen, Tausendschön, Monatsröserl oder schweizerisch Margritli ("Kleine Margerite") genannt, ist eine Pflanzenart innerhalb der Familie der Korbblütler (Asteraceae). Da es auf fast jeder Wiesenfläche wächst, zählt es zu den bekanntesten Pflanzenarten Mitteleuropas. Bellis perennis wird in Mitteleuropa als ein Archäophyt betrachtet, der durch Schaffung von weiträumigen Wiesen und Weiden in vorgeschichtlicher Zeit zu einer weiten Ausbreitung nach Norden kam. Zum so häufigen Auftreten dieser Pflanze kam es jedoch erst mit der Einführung von Rasenflächen in Gärten und Parks. Bevorzugte Standorte sind Weiden, Parkrasen und Gärten auf nährstoffreichem Untergrund, bewachsene Bahndämme; ein regelmäßiger Schnitt ist erforderlich, da die Gräser und Wildblumen sonst die niedrig wachsenden Gänseblümchen überwuchern. Da Bellis perennis eine Speicherpflanze ist, überlebt sie den Winter im Schnee. Auf landwirtschaftlich genutzten Wiesen ist sie auch Zeiger für verdichtete Böden und übernutzte Wiesen und Weiden.',
    photographer: 'Alexmenk'
  },
  {
    name: 'Echtes Leinkraut',
    latin: 'Linaria vulgaris',
    soil: [12],
    img: 'LinariaVulgaris.jpg',
    imgSrc:
      'https://de.wikipedia.org/wiki/Echtes_Leinkraut#/media/File:Common_Toadflax_-_Linaria_vulgaris_-_geograph.org.uk_-_215978.jpg',
    url: 'https://de.wikipedia.org/wiki/Echtes_Leinkraut',
    desc:
      'Das Echte Leinkraut (Linaria vulgaris) ist eine Pflanzenart aus der Gattung der Leinkräuter (Linaria). Andere deutschsprachige Trivialnamen sind Gemeines Leinkraut, Gewöhnliches Leinkraut[1], Kleines Löwenmaul sowie Frauenflachs. Das Echte Leinkraut ist in Mitteleuropa ein sogenannter Apophyt, da die ursprünglich in der Küstenvegetation heimische Art auf anthropogene Standorte wechselte, als in Mitteleuropa vor etwa 7.000 Jahren Wälder durch Menschen gerodet wurden, um Platz für Äcker zu schaffen. Diese Standorte waren offener als die meisten natürlichen, wurden regelmäßig gestört und boten damit dem Echten Leinkraut optimale Lebensbedingungen. Das Echte Leinkraut ist häufig an warmen Böschungen zu finden. Es handelt sich bei dieser Art um eine typische Schuttpflanze, sie liebt lockeren, steinigen und sandigen Boden.',
    photographer: 'Tony Atkin'
  }
];

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
              <a href="${plants[i].url}" target="_blank">
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
  elements_selector: '.lazy'
});
