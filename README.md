# PlezierigFit 🌿

Fitness-app voor **55-plussers en neurodiverse mensen**, Nederlandstalig. Draait als losse app op je website, bijvoorbeeld op `plezierigfit.nl/app/`.

## Wat zit erin

- **36 oefeningen** in 6 categorieën: kracht, cardio, souplesse, snelheid, balans en beweeg-snacks — elk met stap-voor-stap uitleg in het Nederlands
- **Geleide sessies**: aftellende timer met de stappen uitgelicht, optioneel met voorlezen (spraak) en geluidjes
- **5 fitnessprogramma's** van 4 weken (opbouwen, kracht, conditie, balans, soepelheid) — elke week in kleine stapjes, eigen tempo (rustig / normaal / snel)
- **Natuurlijke beweegwinst**: wandelen, fietsen, traplopen, tuinieren… vul in en zie direct hoeveel beweegminuten je vandaag hebt verdiend (t.o.v. de 150-minuten week-richtlijn)
- **Persoonlijke week**: korte intake (wat vind je leuk, wat gaat makkelijk af, alleen/samen, clublidmaatschap, aantal dagen, doel) → weekoverzicht op maat
- **Toegankelijkheid**: 4 tekstgroottes, hoog contrast, rustige modus (geen animaties), voorleesfunctie (NL), grote knoppen, ARIA-live meldingen, skip-link, toetsenbordtoegankelijk
- **Geen account, geen server, geen database**: alles staat lokaal in de browser (localStorage). Werkt offline na eerste bezoek (PWA).

## Installatie op plezierigfit.nl

De app is een **statische website** — geen build-stap nodig.

1. Upload de hele map `plezierigfit/` naar je webhosting, bijvoorbeeld in de map `/app/`, zodat de app bereikbaar is via `https://plezierigfit.nl/app/`
2. Zorg dat `index.html` served wordt als startpagina (op de meeste hosts automatisch)
3. Klaar. De app laadt via `https://plezierigfit.nl/app/`

### Let op bij uploaden

- Upload **alle bestanden en mappen** (`css/`, `js/`, `icons/`, `manifest.webmanifest`, `service-worker.js`)
- Zorg dat de server `.webmanifest` en `.js` bestanden met het juiste MIME-type serveert (bij de meeste hosts automatisch goed)
- Voor HTTPS (vereist voor de voorleesfunctie en offline-werking) moet je site SSL hebben — dat heb je als het slotje in de browser staat

### Als je de app op de hoofdpagina wilt (plezierigfit.nl zelf)

Upload de inhoud van de map naar de root van je site in plaats van `/app/`.

## Bestandsstructuur

```
plezierigfit/
├── index.html              # startpunt
├── manifest.webmanifest    # PWA (app installeren op telefoon)
├── service-worker.js       # offline cache
├── css/style.css           # styling + toegankelijkheidsthema's
├── js/
│   ├── data.js             # oefeningen, categorieën, intake-vragen
│   ├── programmas.js       # 5 vierweekse fitnessprogramma's
│   └── app.js              # router, schermen, timer, spraak, opslag
├── icons/                  # app-iconen (SVG + PNG 192/512)
└── test/smoke.mjs          # test: node test/smoke.mjs
```

## Testen

```
node test/smoke.mjs
```

Controleert alle schermen en de data-integriteit.

## Aanpassingen

- **Oefening toevoegen**: voeg een object toe aan `PF_DATA.oefeningen` in `js/data.js` (`id`, `categorie`, `titel`, `duur` in seconden, `niveau`, `beschrijving`, `stappen`)
- **Programma wijzigen**: bewerk `PF_PROGRAMMAS` in `js/programmas.js`
- **Kleuren aanpassen**: pas de `:root` variabelen aan in `css/style.css`

## Medische disclaimer

De app geeft algemene beweegadviezen. Bij pijn, duizeligheid of twijfel: stop en raadpleeg een huisarts. De disclaimer staat ook in de app zelf.
