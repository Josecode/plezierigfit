/* PlezierigFit - fitnessprogramma's: week-op-week opgebouwd, in kleine stapjes.
   Elk programma heeft 4 weken. Elke week bouwt iets bij op.
   Tempo is instelbaar: 'rustig' = week herhalen, 'normaal' = doorgaan. */
"use strict";

const PF_PROGRAMMAS = [
  {
    id: "opbouw",
    titel: "Langzaam opbouwen",
    icoon: "🌱",
    lestijd: "10-15 minuten",
    beschrijving: "Voor als je (weer) begint met bewegen. Elke week een klein stapje verder.",
    niveau: "beginner",
    weken: [
      { nr: 1, focus: "Kennismaken met bewegen", sessies: [
        { dag: "Ma", naam: "Wandelen of marcheren", duurMin: 10, tip: "Rustig tempo, je mag praten." },
        { dag: "Wo", naam: "Kracht licht (stoel)", duurMin: 10, tip: "Opstaan uit stoel + kuitheffen." },
        { dag: "Do", naam: "Soepelheid", duurMin: 10, tip: "Nek, schouders, enkels losmaken." },
        { dag: "Vr", naam: "Wandelen of marcheren", duurMin: 10, tip: "Iets vlotter dan maandag." },
        { dag: "Za", naam: "Balans", duurMin: 5, tip: "Op één been aan het aanrecht." }
      ]},
      { nr: 2, focus: "Iets langer volhouden", sessies: [
        { dag: "Ma", naam: "Wandelen of marcheren", duurMin: 12, tip: "Zelfde route, iets vlotter." },
        { dag: "Wo", naam: "Kracht licht (stoel)", duurMin: 12, tip: "Voeg muur-push-ups toe." },
        { dag: "Do", naam: "Soepelheid + ademhaling", duurMin: 10, tip: "Eindig met 4-7-8 ademhaling." },
        { dag: "Vr", naam: "Wandelen of marcheren", duurMin: 12, tip: "Probeer 1 minuut vlotter." },
        { dag: "Za", naam: "Balans", duurMin: 8, tip: "Probeer zonder handen." }
      ]},
      { nr: 3, focus: "Ritme vinden", sessies: [
        { dag: "Ma", naam: "Interval wandelen", duurMin: 15, tip: "1 min vlot, 1 min rustig." },
        { dag: "Wo", naam: "Kracht (licht tot gemiddeld)", duurMin: 15, tip: "Alle stoel-oefeningen." },
        { dag: "Do", naam: "Soepelheid", duurMin: 12, tip: "Voeg hamstring-stretch toe." },
        { dag: "Vr", naam: "Wandelen of fietsen", duurMin: 15, tip: "Kies wat je leuk vindt." },
        { dag: "Za", naam: "Balans + snelheid", duurMin: 10, tip: "Balans-oefeningen + voetentik." }
      ]},
      { nr: 4, focus: "Vertrouwen groeien", sessies: [
        { dag: "Ma", naam: "Interval wandelen", duurMin: 20, tip: "2 min vlot, 1 min rustig." },
        { dag: "Wo", naam: "Kracht", duurMin: 15, tip: "Kies 4 oefeningen, 2 rondes." },
        { dag: "Do", naam: "Soepelheid + ademhaling", duurMin: 15, tip: "Heel programma soepelheid." },
        { dag: "Vr", naam: "Wandelen, fietsen of zwemmen", duurMin: 20, tip: "Kies je favoriete." },
        { dag: "Za", naam: "Balans + snack", duurMin: 10, tip: "Balans + een beweeg-snack." }
      ]}
    ]
  },
  {
    id: "kracht",
    titel: "Sterker worden",
    icoon: "💪",
    lestijd: "15-20 minuten",
    beschrijving: "Krachttraining op maat van 55+: stoel-oefeningen, muur-push-ups en lichte gewichten.",
    niveau: "licht_actief",
    weken: [
      { nr: 1, focus: "Techniek leren", sessies: [
        { dag: "Ma", naam: "Kracht basis", duurMin: 15, tip: "Opstaan uit stoel, kuitheffen, muur-push-ups." },
        { dag: "Wo", naam: "10 min wandelen", duurMin: 10, tip: "Loslopen." },
        { dag: "Do", naam: "Kracht basis + armen", duurMin: 15, tip: "Voeg flesjes toe." },
        { dag: "Vr", naam: "Soepelheid", duurMin: 10, tip: "Na krachttraining rekken." },
        { dag: "Za", naam: "Kracht rondje 2", duurMin: 15, tip: "Alle oefeningen, 1 ronde." }
      ]},
      { nr: 2, focus: "Herhalingen omhoog", sessies: [
        { dag: "Ma", naam: "Kracht", duurMin: 15, tip: "2 rondes van de basis." },
        { dag: "Wo", naam: "10-12 min wandelen", duurMin: 12, tip: "Rustig." },
        { dag: "Do", naam: "Kracht + plank muur", duurMin: 18, tip: "Voeg plank tegen muur toe." },
        { dag: "Vr", naam: "Soepelheid + balans", duurMin: 12, tip: "Rekken en evenwicht." },
        { dag: "Za", naam: "Kracht rondje 3", duurMin: 18, tip: "2 rondes, of 3 als het lukt." }
      ]},
      { nr: 3, focus: "Zwaarder (licht)", sessies: [
        { dag: "Ma", naam: "Kracht", duurMin: 20, tip: "Zwaardere flesjes of 2 rondes." },
        { dag: "Wo", naam: "Interval wandelen", duurMin: 15, tip: "Wissel tempo af." },
        { dag: "Do", naam: "Kracht + zit-naar-sta", duurMin: 20, tip: "Alle oefeningen." },
        { dag: "Vr", naam: "Soepelheid", duurMin: 15, tip: "Extra aandacht voor schouders." },
        { dag: "Za", naam: "Kracht + balans", duurMin: 20, tip: "Kracht afgewisseld met balans." }
      ]},
      { nr: 4, focus: "Eigen schema", sessies: [
        { dag: "Ma", naam: "Kracht", duurMin: 20, tip: "Jouw favoriete 4 oefeningen, 2-3 rondes." },
        { dag: "Wo", naam: "Wandelen of fietsen", duurMin: 20, tip: "Kies zelf." },
        { dag: "Do", naam: "Kracht", duurMin: 20, tip: "Probeer 1 nieuwe oefening." },
        { dag: "Vr", naam: "Soepelheid + ademhaling", duurMin: 15, tip: "Goed afsluiten." },
        { dag: "Za", naam: "Vrije keus", duurMin: 20, tip: "Doe wat jij het fijnst vindt." }
      ]}
    ]
  },
  {
    id: "conditie",
    titel: "Conditie opbouwen",
    icoon: "🫁",
    lestijd: "15-25 minuten",
    beschrijving: "Cardio in je eigen tempo: wandelen, fietsen, intervalletjes. Praat-test: kun je nog praten? Dan zit je goed.",
    niveau: "licht_actief",
    weken: [
      { nr: 1, focus: "Ritme vinden", sessies: [
        { dag: "Ma", naam: "Wandelen", duurMin: 15, tip: "Comfortabel tempo." },
        { dag: "Wo", naam: "Fietsen of wandelen", duurMin: 15, tip: "Kies zelf." },
        { dag: "Do", naam: "Marcheren op de plaats", duurMin: 10, tip: "Thuis, als het regent." },
        { dag: "Vr", naam: "Wandelen", duurMin: 20, tip: "Iets langer dan maandag." },
        { dag: "Za", naam: "Dansen of zwemmen", duurMin: 15, tip: "Wat jij leuk vindt." }
      ]},
      { nr: 2, focus: "Eerste interval", sessies: [
        { dag: "Ma", naam: "Interval wandelen", duurMin: 20, tip: "1 min vlot, 1 min rustig, 10x." },
        { dag: "Wo", naam: "Fietsen", duurMin: 20, tip: "Lichte weerstand." },
        { dag: "Do", naam: "Wandelen", duurMin: 20, tip: "Probeer 2 minuten vlot." },
        { dag: "Vr", naam: "Marcheren in huis", duurMin: 15, tip: "Met muziek." },
        { dag: "Za", naam: "Lange wandeling", duurMin: 30, tip: "Rustig, geniet ervan." }
      ]},
      { nr: 3, focus: "Duur verlengen", sessies: [
        { dag: "Ma", naam: "Interval wandelen", duurMin: 25, tip: "2 min vlot, 1 min rustig." },
        { dag: "Wo", naam: "Fietsen of zwemmen", duurMin: 25, tip: "Kies zelf." },
        { dag: "Do", naam: "Traplopen (veilig)", duurMin: 10, tip: "Met leuning, daarna wandelen." },
        { dag: "Vr", naam: "Wandelen", duurMin: 25, tip: "Route met heuveltje." },
        { dag: "Za", naam: "Vrije cardio", duurMin: 30, tip: "Dansen, wandelen, fietsen: jij kiest." }
      ]},
      { nr: 4, focus: "Eigen cardio", sessies: [
        { dag: "Ma", naam: "Interval", duurMin: 30, tip: "3 min vlot, 1 min rustig." },
        { dag: "Wo", naam: "Fietsen of zwemmen", duurMin: 30, tip: "Lekker uitlopen." },
        { dag: "Do", naam: "Wandelen", duurMin: 30, tip: "Nieuwe route proberen." },
        { dag: "Vr", naam: "Dansen op muziek", duurMin: 20, tip: "Energiek afsluiten." },
        { dag: "Za", naam: "Lange activiteit", duurMin: 45, tip: "Wandeling, fietstocht of zwembad." }
      ]}
    ]
  },
  {
    id: "balans",
    titel: "Balans & valpreventie",
    icoon: "⚖️",
    lestijd: "10-15 minuten",
    beschrijving: "Veilig staan en lopen. Altijd iets stevigs in de buurt houden. Bij duizeligheid: stop.",
    niveau: "beginner",
    weken: [
      { nr: 1, focus: "Veilig beginnen", sessies: [
        { dag: "Ma", naam: "Balans met steun", duurMin: 10, tip: "Aanrecht: op één been, tenen, zijwaarts." },
        { dag: "Wo", naam: "Wandelen", duurMin: 15, tip: "Rechtop, armen mee." },
        { dag: "Do", naam: "Balans met steun", duurMin: 10, tip: "Hiel-tegen-teen." },
        { dag: "Vr", naam: "Kracht licht", duurMin: 10, tip: "Ondersteunt je balans." },
        { dag: "Za", naam: "Balans-oefeningen", duurMin: 12, tip: "Alle oefeningen met steun." }
      ]},
      { nr: 2, focus: "Minder steun", sessies: [
        { dag: "Ma", naam: "Balans", duurMin: 12, tip: "Alleen vingertoppen aan de muur." },
        { dag: "Wo", naam: "Wandelen", duurMin: 15, tip: "Let op je houding." },
        { dag: "Do", naam: "Balans + snelheid", duurMin: 12, tip: "Voetentik tussendoor." },
        { dag: "Vr", naam: "Kracht", duurMin: 12, tip: "Benen en enkels." },
        { dag: "Za", naam: "Balans", duurMin: 15, tip: "Probeer één oefening zonder steun." }
      ]},
      { nr: 3, focus: "Zonder handen", sessies: [
        { dag: "Ma", naam: "Balans vrijstaand", duurMin: 15, tip: " Dicht bij een stoel." },
        { dag: "Wo", naam: "Hiel-tegen-teen lopen", duurMin: 15, tip: "In een rechte lijn." },
        { dag: "Do", naam: "Balans + kracht", duurMin: 15, tip: "Gecombineerd." },
        { dag: "Vr", naam: "Wandelen", duurMin: 20, tip: "Let op oneffenheden." },
        { dag: "Za", naam: "Balans circuit", duurMin: 15, tip: "Alle oefeningen achter elkaar." }
      ]},
      { nr: 4, focus: "Vertrouwen", sessies: [
        { dag: "Ma", naam: "Balans vrijstaand", duurMin: 15, tip: "Ogen kort dicht (bij stoel)." },
        { dag: "Wo", naam: "Achterwaarts lopen", duurMin: 10, tip: "Vrije gang, langzaam." },
        { dag: "Do", naam: "Balans + soepelheid", duurMin: 15, tip: "Combinatie." },
        { dag: "Vr", naam: "Wandelen buiten", duurMin: 25, tip: "Let op stoep en drempels." },
        { dag: "Za", naam: "Vrije keus", duurMin: 15, tip: "Wat jij het fijnst vindt." }
      ]}
    ]
  },
  {
    id: "soepel",
    titel: "Soepel & ontspannen",
    icoon: "🧘",
    lestijd: "10-20 minuten",
    beschrijving: "Rustige rekoefeningen en ademhaling. Goed voor gewrichten, houding en ontspanning.",
    niveau: "beginner",
    weken: [
      { nr: 1, focus: "Loslaten", sessies: [
        { dag: "Ma", naam: "Nek en schouders", duurMin: 10, tip: "Langzaam, forceer niets." },
        { dag: "Wo", naam: "Ademhaling 4-7-8", duurMin: 5, tip: "Rustig in- en uitademen." },
        { dag: "Do", naam: "Voeten en enkels", duurMin: 10, tip: "Ook fijn zittend." },
        { dag: "Vr", naam: "Zittende rug stretch", duurMin: 10, tip: "Draai beide kanten op." },
        { dag: "Za", naam: "Korte wandeling", duurMin: 15, tip: "Rustig, na het rekken." }
      ]},
      { nr: 2, focus: "Heel lijf", sessies: [
        { dag: "Ma", naam: "Rek-programma", duurMin: 15, tip: "Nek, armen, rug, enkels." },
        { dag: "Wo", naam: "Ademhaling", duurMin: 10, tip: "4-7-8, 4 keer." },
        { dag: "Do", naam: "Hamstring stretch", duurMin: 12, tip: "Stoel-versie." },
        { dag: "Vr", naam: "Rek-programma", duurMin: 15, tip: "Iets langer vasthouden." },
        { dag: "Za", naam: "Wandelen + rekken", duurMin: 20, tip: "Rekken voor en na." }
      ]},
      { nr: 3, focus: "Ritueel", sessies: [
        { dag: "Ma", naam: "Ochtendrek", duurMin: 15, tip: "Hele programma." },
        { dag: "Wo", naam: "Ademhaling + rug", duurMin: 15, tip: "Combinatie." },
        { dag: "Do", naam: "Avondrek", duurMin: 15, tip: "Voor het slapen." },
        { dag: "Vr", naam: "Rek + korte wandeling", duurMin: 20, tip: "Buiten." },
        { dag: "Za", naam: "Yoga-achtig programma", duurMin: 20, tip: "Rustig tempo, muziek erbij mag." }
      ]},
      { nr: 4, focus: "Eigen ritueel", sessies: [
        { dag: "Ma", naam: "Jouw favoriete rek", duurMin: 15, tip: "Kies zelf wat lekker voelt." },
        { dag: "Wo", naam: "Ademhaling", duurMin: 10, tip: "Steeds vaker tussendoor." },
        { dag: "Do", naam: "Rek-programma", duurMin: 20, tip: "20 minuten rustig." },
        { dag: "Vr", naam: "Wandelen in de natuur", duurMin: 30, tip: "Geniet." },
        { dag: "Za", naam: "Vrije keus", duurMin: 20, tip: "Rekken, wandelen of beide." }
      ]}
    ]
  }
];
