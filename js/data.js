/* PlezierigFit - data: categorieën, oefeningen, beweegwinst, intake */
"use strict";

const PF_DATA = {
  categorieën: [
    { id: "kracht",      naam: "Kracht",       icoon: "💪", beschrijving: "Sterkere spieren voor everyday dingen: boodschappen dragen, opstaan uit een stoel." },
    { id: "cardio",      naam: "Cardio",       icoon: "🫁", beschrijving: "Conditie opbouwen in je eigen tempo. Je hart en longen vinden dat fijn." },
    { id: "souplesse",   naam: "Souplesse",    icoon: "🤸", beschrijving: "Rekken en soepel bewegen, op een stoel of staand. Goed voor gewrichten en houding." },
    { id: "snelheid",    naam: "Snelheid",     icoon: "⚡", beschrijving: "Snelle, korte bewegingen. Houdt je alert en je reactie snel." },
    { id: "balans",      naam: "Balans",       icoon: "⚖️", beschrijving: "Evenwichtsoefeningen. Belangrijk om valpartijen te voorkomen." },
    { id: "snacks",      naam: "Beweeg-snacks", icoon: "🍎", beschrijving: "Kleine stukjes bewegen tussendoor. Tellen net zo goed mee!" }
  ],

  /* duration in seconden, stappen = tekst die voorgelezen/gelezen wordt */
  oefeningen: [
    /* ---- KRACHT ---- */
    { id: "k1", categorie: "kracht", titel: "Opstaan uit de stoel", duur: 60, niveau: "licht",
      beschrijving: "Een van de beste oefeningen: je benen en billen worden sterker zonder gewichten.",
      stappen: ["Ga op de voorste helft van een stevige stoel zitten, voeten plat op de grond.", "Leun iets naar voren en kom rustig overeind.", "Ga weer gecontroleerd zitten.", "Herhaal dit 10 keer."] },
    { id: "k2", categorie: "kracht", titel: "Muur-push-ups", duur: 90, niveau: "licht",
      beschrijving: "Bovenlichaam trainen tegen de muur. Makkelijker dan op de grond, net zo effectief.",
      stappen: ["Ga staan met je gezicht naar de muur, armen gestrekt.", "Handen op schouderhoogte tegen de muur.", "Buig je armen en kom met je borst dicht bij de muur.", "Duw jezelf weer weg. Herhaal 8 tot 12 keer."] },
    { id: "k3", categorie: "kracht", titel: "Kuitheffen aan het aanrecht", duur: 60, niveau: "licht",
      beschrijving: "Sterke kuiten helpen bij traplopen en stabiel staan.",
      stappen: ["Houd je handen licht op het aanrecht.", "Kom op je tenen staan.", "Houd 2 tellen vast, ga dan rustig terug.", "Herhaal 12 keer."] },
    { id: "k4", categorie: "kracht", titel: "Armen omhoog met flesjes", duur: 120, niveau: "licht",
      beschrijving: "Schouders en armen sterker met twee flesjes water als gewicht.",
      stappen: ["Neem in elke hand een flesje water.", "Hef je armen zijwaarts omhoog tot schouderhoogte.", "Laat ze rustig zakken. Herhaal 10 keer.", "Daarna: armen voorwaarts omhoog, 10 keer."] },
    { id: "k5", categorie: "kracht", titel: "Zit-naar-sta met armen", duur: 120, niveau: "gemiddeld",
      beschrijving: "Combinatie van kracht voor benen en armen tegelijk.",
      stappen: ["Zit rechtop, voeten plat.", "Kom overeind terwijl je je armen voorwaarts strekt.", "Ga weer zitten.", "Herhaal 12 keer in je eigen tempo."] },
    { id: "k6", categorie: "kracht", titel: "Plank tegen de muur", duur: 45, niveau: "gemiddeld",
      beschrijving: "Een hele-body oefening voor buik en rug, staand aan de muur.",
      stappen: ["Ga staan, leun met gestrekte armen tegen de muur.", "Houd je lijf recht als een plank, buik licht gespannen.", "Houd dit 20 tot 30 seconden vol.", "Herhaal 3 keer."] },

    /* ---- CARDIO ---- */
    { id: "c1", categorie: "cardio", titel: "Rustig marcheren op de plaats", duur: 180, niveau: "licht",
      beschrijving: "Je hartslag omhoog brengen zonder de deur uit te gaan.",
      stappen: ["Marcher op de plaats, armen meebewegen.", "Houd een tempo aan waarbij je nog gewoon kunt praten.", "Doe dit 3 minuten vol."] },
    { id: "c2", categorie: "cardio", titel: "Wandelen in huis", duur: 300, niveau: "licht",
      beschrijving: "Door het huis, de gang of de tuin wandelen. Tel de minuten mee als beweegwinst.",
      stappen: ["Wandel in een comfortabel tempo.", "Rechtop lopen, schouders ontspannen.", "5 minuten is al winst. Doe wat jij aankunt."] },
    { id: "c3", categorie: "cardio", titel: "Traplopen (veilig)", duur: 120, niveau: "gemiddeld",
      beschrijving: "Een trap op en af met de leuning. Prima cardio, pas op bij duizeligheid.",
      stappen: ["Houd de leuning vast.", "Ga één trede tegelijk, rustig.", "Doe 2 minuten traplopen, of minder als dat te veel is."] },
    { id: "c4", categorie: "cardio", titel: "Interval: 1 minuut vlot, 1 minuut rustig", duur: 240, niveau: "gemiddeld",
      beschrijving: "Wissel tempo af. Dat is goed voor je conditie en hartritme.",
      stappen: ["1 minuut iets vlotter wandelen of marcheren.", "1 minuut weer rustig.", "Herhaal dit 4 keer."] },
    { id: "c5", categorie: "cardio", titel: "Fietsen op de hometrainer", duur: 600, niveau: "licht",
      beschrijving: "10 minuten fietsen zonder of met lichte weerstand.",
      stappen: ["Zit rechtop, voeten stevig op de pedalen.", "Trap in een rustig ritme.", "Adem gelijkmatig in en uit."] },
    { id: "c6", categorie: "cardio", titel: "Dansje op je favoriete muziek", duur: 180, niveau: "licht",
      beschrijving: "Bewegen op muziek is cardio én vrolijk. Kies een nummer dat je energie geeft.",
      stappen: ["Zet een nummer op dat je leuk vindt.", "Beweeg mee zoals jij dat fijn vindt.", "Drie minuten is genoeg."] },

    /* ---- SOUPLESSE ---- */
    { id: "s1", categorie: "souplesse", titel: "Nek en schouders losmaken", duur: 90, niveau: "licht",
      beschrijving: "Lichte rekoefeningen voor nek en schouders, staand of zittend.",
      stappen: ["Laat je hoofd langzaam naar rechts zakken, oor naar schouder.", "Houd 5 tellen vast.", "Doe hetzelfde naar links.", "Draai je hoofd rustig rond, 3 keer per kant."] },
    { id: "s2", categorie: "souplesse", titel: "Armen rekken boven het hoofd", duur: 60, niveau: "licht",
      beschrijving: "Rek voor armen, schouders en bovenrug.",
      stappen: ["Hef één arm recht omhoog.", "Buig hem boven je hoofd naar de andere kant.", "Voel de rek, forceer niets.", "Wissel van arm. 30 seconden per kant."] },
    { id: "s3", categorie: "souplesse", titel: "Voeten en enkels rollen", duur: 90, niveau: "licht",
      beschrijving: "Goed voor je enkels en doorbloeding, ook fijn zittend.",
      stappen: ["Til één voet iets op.", "Draai je enkel 10 keer rond, beide kanten op.", "Strek je tenen, trek ze terug.", "Wissel van voet."] },
    { id: "s4", categorie: "souplesse", titel: "Zittende rug stretch", duur: 60, niveau: "licht",
      beschrijving: "Rek voor je rug terwijl je zit.",
      stappen: ["Zit rechtop, voeten plat.", "Draai je bovenlijf rustig naar rechts, kijk mee.", "Houd 10 tellen vast.", "Doe hetzelfde naar links."] },
    { id: "s5", categorie: "souplesse", titel: "Hamstring stretch (achterkant benen)", duur: 120, niveau: "gemiddeld",
      beschrijving: "Zit op de rand van een stoel en strek één been.",
      stappen: ["Ga op de rand van de stoel zitten.", "Strek één been recht naar voren, hak op de grond.", "Leun iets naar voren tot je rek voelt.", "20 seconden per been, 2 keer."] },
    { id: "s6", categorie: "souplesse", titel: "Ademhaling 4-7-8", duur: 90, niveau: "licht",
      beschrijving: "Rustige ademhaling om te ontspannen.",
      stappen: ["Adem 4 tellen in door je neus.", "Houd 7 tellen vast.", "Adem 8 tellen uit door je mond.", "Herhaal 4 keer."] },

    /* ---- SNELHEID ---- */
    { id: "v1", categorie: "snelheid", titel: "Snel tikken met de voeten", duur: 45, niveau: "licht",
      beschrijving: "Snelle voeten = snellere reactietijd.",
      stappen: ["Zit of sta stevig.", "Tik zo snel je kunt met je rechtervoet, 10 seconden.", "Dan je linkervoet, 10 seconden.", "Herhaal 2 keer."] },
    { id: "v2", categorie: "snelheid", titel: "Handen snel openen en sluiten", duur: 45, niveau: "licht",
      beschrijving: "Fijne motoriek en snelheid in je handen.",
      stappen: ["Strek je armen voor je.", "Maak vuisten, dan weer helemaal open.", "Doe dit zo snel je kunt, 15 seconden.", "Rustig ademen tussendoor."] },
    { id: "v3", categorie: "snelheid", titel: "Snel op en neer in mini-squats", duur: 60, niveau: "gemiddeld",
      beschrijving: "Korte, snelle bewegingen voor benen.",
      stappen: ["Voeten op heupbreedte.", "Ga een klein stukje door je knieën en kom snel weer omhoog.", "10 herhalingen, in je eigen tempo.", "Rustig blijven ademen."] },
    { id: "v4", categorie: "snelheid", titel: "Bal met een balletje", duur: 90, niveau: "licht",
      beschrijving: "Gooi een licht balletje van hand naar hand. Goed voor concentratie en snelheid.",
      stappen: ["Neem een licht balletje.", "Gooi het van je rechterhand naar je linkerhand.", "En weer terug. 20 keer.", "Let op: geen harde worpen."] },
    { id: "v5", categorie: "snelheid", titel: "Snelle traptreden (op de plaats)", duur: 60, niveau: "gemiddeld",
      beschrijving: "Alsof je een klein trapje op rent, maar op de plaats.",
      stappen: ["Marcher op de plaats maar dan snel, knieën iets hoger.", "30 seconden.", "Daarna 30 seconden rustig marcheren."] },
    { id: "v6", categorie: "snelheid", titel: "Reactie-oefening met een partner", duur: 120, niveau: "gemiddeld",
      beschrijving: "Samen met iemand: wie raakt als eerst de hand van de ander? Leuk en snel.",
      stappen: ["Jij en je partner zitten tegenover elkaar.", "Jullie handen zijn naar voren.", "Op 'nu' probeert de een de hand van de ander te tikken, de ander trekt weg.", "Speel 1 minuut."] },

    /* ---- BALANS ---- */
    { id: "b1", categorie: "balans", titel: "Op één been (aan het aanrecht)", duur: 60, niveau: "licht",
      beschrijving: "Evenwicht oefenen met steun. Houd het aanrecht licht vast.",
      stappen: ["Houd het aanrecht met één hand vast.", "Til je andere voet iets op.", "Houd 10 seconden vol.", "Wissel van been. 3 keer per kant."] },
    { id: "b2", categorie: "balans", titel: "Hiel-tegen-teen lopen", duur: 90, niveau: "gemiddeld",
      beschrijving: "Lopen alsof je op een rechte lijn loopt. Goed voor je evenwicht.",
      stappen: ["Zoek een open stuk vloer, eventueel bij de leuning.", "Zet je hak recht voor je tenen.", "Doe 10 stapjes.", "Draai je om en doe het terug."] },
    { id: "b3", categorie: "balans", titel: "Op de tenen staan en zakken", duur: 60, niveau: "licht",
      beschrijving: "Balans en kracht in enkels en kuiten.",
      stappen: ["Houd je aan iets stevigs vast.", "Kom op je tenen, houd 3 tellen vast.", "Zak rustig terug.", "Herhaal 10 keer."] },
    { id: "b4", categorie: "balans", titel: "Zijwaarts stappen", duur: 90, niveau: "licht",
      beschrijving: "Kleine stapjes opzij, alternerend.",
      stappen: ["Sta rechtop, voeten bij elkaar.", "Stap met je rechtervoet opzij.", "Breng je linkervoet erbij.", "8 stapjes naar rechts, dan 8 naar links."] },
    { id: "b5", categorie: "balans", titel: "Ogen dicht, voeten bij elkaar", duur: 30, niveau: "gemiddeld",
      beschrijving: "Evenwicht zonder te kijken. Houd iets vast als je wilt.",
      stappen: ["Zet je voeten tegen elkaar.", "Houd je handen op een stoel.", "Sluit je ogen 10 seconden.", "Open ze weer."] },
    { id: "b6", categorie: "balans", titel: "Achterwaarts lopen (veilig)", duur: 60, niveau: "gemiddeld",
      beschrijving: "Langzaam achterwaarts lopen, in een vrije ruimte.",
      stappen: ["Zoek een vrije gang zonder obstakels.", "Draai je om en loop 5 stapjes achterwaarts, langzaam.", "Draai weer om. Herhaal 3 keer."] },

    /* ---- BEWEEG-SNACKS ---- */
    { id: "n1", categorie: "snacks", titel: "Tandenpoetsen = squat-moment", duur: 30, niveau: "licht",
      beschrijving: "Terwijl je poetst: ga iets door je knieën. Twee vliegen in één klap.",
      stappen: ["Poets je tanden zoals altijd.", "Ga ondertussen iets door je knieën, alsof je gaat zitten.", "Houd dit vol zolang het comfortabel is."] },
    { id: "n2", categorie: "snacks", titel: "Koffiezet-moment: rekken", duur: 60, niveau: "licht",
      beschrijving: "Tijdens het wachten op je koffie: rek je armen en benen.",
      stappen: ["Strek beide armen hoog boven je hoofd.", "Rek naar links en naar rechts.", "Draai je enkels een paar keer."] },
    { id: "n3", categorie: "snacks", titel: "TV-reclame = beweegmoment", duur: 120, niveau: "licht",
      beschrijving: "Tijdens de reclame: sta op en beweeg 2 minuten.",
      stappen: ["Sta op van de bank.", "Wandel ter plaatse of rek je armen.", "2 minuten bewegen, dan weer lekker zitten."] },
    { id: "n4", categorie: "snacks", titel: "Boodschappen tillen = krachtoefening", duur: 60, niveau: "licht",
      beschrijving: "Pak je tas met gestrekte armen op en neer.",
      stappen: ["Pak je boodschappentas met beide handen.", "Houd hem 5 tellen vast op heuphoogte.", "Zet hem neer. Herhaal 5 keer."] },
    { id: "n5", categorie: "snacks", titel: "Wachten = enkels oefenen", duur: 60, niveau: "licht",
      beschrijving: "In de rij bij de kassa of bij de bushalte: enkels en kuiten.",
      stappen: ["Kom op je tenen staan.", "Houd 3 tellen vast.", "Zak terug. Herhaal 10 keer."] },
    { id: "n6", categorie: "snacks", titel: "Telefoonmoment = nek los", duur: 45, niveau: "licht",
      beschrijving: "Tijdens het bellen: draai je schouders en nek los.",
      stappen: ["Houd de telefoon in één hand.", "Draai je schouders 10 keer naar voren, 10 keer naar achteren.", "Laat je kin iets zakken en kijk recht vooruit."] }
  ],

  /* Natuurlijke beweegwinst: hoeveel beweegminuten levert een activiteit op */
  natuurlijkeActiviteit: [
    { id: "wandelen",  naam: "Wandelen",            icoon: "🚶", perMinuut: 1,   eenheid: "minuten wandelen" },
    { id: "fietsen",    naam: "Fietsen",             icoon: "🚲", perMinuut: 1,   eenheid: "minuten fietsen" },
    { id: "traplopen",  naam: "Traplopen",           icoon: "🪜", perMinuut: 0.3, eenheid: "treden (1 trede ≈ 0,3 min)" },
    { id: "tuinieren",  naam: "Tuinieren",           icoon: "🌱", perMinuut: 1,   eenheid: "minuten tuinieren" },
    { id: "huishouden", naam: "Huishouden (actief)", icoon: "🧹", perMinuut: 0.8, eenheid: "minuten" },
    { id: "dansen",     naam: "Dansen",              icoon: "🕺", perMinuut: 1,   eenheid: "minuten dansen" },
    { id: "zwemmen",    naam: "Zwemmen",             icoon: "🏊", perMinuut: 1,   eenheid: "minuten zwemmen" },
    { id: "golf",       naam: "Golf / jeu de boules", icoon: "⛳", perMinuut: 0.5, eenheid: "minuten" }
  ],

  /* Intake: voorkeuren bepalen het weekoverzicht */
  intake: {
    leukVinden: {
      vraag: "Wat vind je het leukst om te doen? (meerdere antwoorden mogelijk)",
      opties: [
        { id: "wandelen", naam: "Wandelen in de natuur" },
        { id: "fietsen", naam: "Fietsen" },
        { id: "zwemmen", naam: "Zwemmen / aqua" },
        { id: "dansen", naam: "Dansen op muziek" },
        { id: "fitness", naam: "Oefeningen thuis (fitness)" },
        { id: "tuin", naam: "Tuinieren" },
        { id: "sportclub", naam: "Sporten in een club/groep" },
        { id: "spel", naam: "Spelletjes bewegen (jeu de boules, golf)" }
      ]
    },
    makkelijkAfgaat: {
      vraag: "Wat gaat jou op dit moment het makkelijkst af?",
      opties: [
        { id: "korte_stukjes", naam: "Korte stukjes bewegen tussendoor" },
        { id: "langzaam", naam: "Rustig en langzaam" },
        { id: "op_stoel", naam: "Oefeningen zittend of met steun" },
        { id: "buiten", naam: "Buiten zijn" },
        { id: "muziek", naam: "Bewegen met muziek" },
        { id: "samen", naam: "Samen met iemand anders" }
      ]
    },
    samen: {
      vraag: "Sport je het liefst alleen of samen?",
      opties: [
        { id: "alleen", naam: "Het liefst alleen, in mijn eigen tempo" },
        { id: "samen", naam: "Samen met een vriend(in), partner of groep" },
        { id: "wissel", naam: "Wisselend: soms alleen, soms samen" }
      ]
    },
    club: {
      vraag: "Ben je lid van een sportclub of beweeggroep?",
      opties: [
        { id: "ja", naam: "Ja" },
        { id: "nee", naam: "Nee" },
        { id: "wil_ja", naam: "Nee, maar ik wil er graag een vinden" }
      ]
    },
    dagen: {
      vraag: "Op hoeveel dagen per week wil je bewegen?",
      opties: [
        { id: "2", naam: "2 dagen" },
        { id: "3", naam: "3 dagen" },
        { id: "4", naam: "4 dagen" },
        { id: "5", naam: "5 dagen of meer" }
      ]
    },
    niveau: {
      vraag: "Hoe ervaar je bewegen nu?",
      opties: [
        { id: "beginner", naam: "Ik begin (weer) opnieuw, rustig aan" },
        { id: "licht_actief", naam: "Ik beweeg af en toe" },
        { id: "redelijk_actief", naam: "Ik beweeg regelmatig" }
      ]
    },
    doel: {
      vraag: "Waar wil je aan werken? (kies je belangrijkste doel)",
      opties: [
        { id: "kracht", naam: "Sterker worden (kracht)" },
        { id: "conditie", naam: "Betere conditie (cardio)" },
        { id: "balans", naam: "Beter evenwicht en valpreventie" },
        { id: "soepel", naam: "Soupeler en soepeler bewegen" },
        { id: "energie", naam: "Meer energie en lekkerder in mijn vel" }
      ]
    }
  }
};
