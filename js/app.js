/* PlezierigFit - app logic */
"use strict";

(function () {
  const main = document.getElementById("hoofd");
  const live = document.getElementById("live-region");
  const STORE_KEY = "plezierigfit_v1";

  /* ---------- opslag (lokaal, geen account) ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { /* privémodus etc. */ }
  }
  let state = load();
  if (!state.instellingen) {
    state.instellingen = { tekstgrootte: "groot", contrast: false, spraak: false, geluid: true, rustig: false };
  }
  function updateInstellingen(i) {
    state.instellingen = Object.assign({}, state.instellingen, i);
    save(state);
    applyInstellingen();
  }
  function announce(msg) { live.textContent = msg; }

  /* ---------- toegankelijkheid: thema toepassen ---------- */
  function applyInstellingen() {
    const s = state.instellingen;
    document.documentElement.dataset.tekst = s.tekstgrootte;   // klein | normaal | groot | extra
    document.documentElement.dataset.contrast = s.contrast ? "hoog" : "normaal";
    document.documentElement.dataset.rustig = s.rustig ? "ja" : "nee";
    document.body.classList.toggle("spraak-actief", !!s.spraak);
  }

  /* ---------- spraak (voorlezen) ---------- */
  let spraakBusy = false;
  function spreek(text) {
    if (!state.instellingen.spraak) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "nl-NL";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
  function stopSpraak() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  /* ---------- geluidjes (eigen, geen bestanden nodig) ---------- */
  let audioCtx = null;
  function piep(freq, duur, type) {
    if (!state.instellingen.geluid) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq || 660;
      g.gain.setValueAtTime(0.12, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (duur || 0.25));
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + (duur || 0.25));
    } catch (e) { /* audio niet beschikbaar */ }
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function fmtTijd(seconden) {
    const m = Math.floor(seconden / 60), s = seconden % 60;
    return m + ":" + String(s).padStart(2, "0");
  }
  function catNaam(id) {
    const c = PF_DATA.categorieën.find(c => c.id === id);
    return c ? c.icoon + " " + c.naam : id;
  }

  /* ---------- router ---------- */
  const routes = {
    "/": viewHome,
    "/intake": viewIntake,
    "/oefeningen": viewOefeningen,
    "/oefening": viewOefeningDetail,
    "/sessie": viewSessie,
    "/programma": viewProgramma,
    "/week": viewWeek,
    "/beweegwinst": viewBeweegwinst,
    "/weekoverzicht": viewWeekoverzicht,
    "/instellingen": viewInstellingen
  };
  function nav() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const [pad, param] = hash.split("?");
    const fn = routes[pad] || viewHome;
    window.scrollTo(0, 0);
    main.focus();
    fn(param);
    document.querySelectorAll("[data-nav]").forEach(a => {
      a.classList.toggle("actief", a.getAttribute("href") === "#" + pad);
    });
  }
  window.addEventListener("hashchange", nav);

  /* ================= VIEWS ================= */

  function viewHome() {
    const heeftIntake = !!state.intake;
    main.innerHTML = `
      <section class="hero">
        <h1>Bewegen op <span class="accent">jouw manier</span></h1>
        <p class="lead">PlezierigFit helpt 55-plussers en neurodiverse mensen om op een prettige manier in beweging te blijven — met grote letters, duidelijke stappen en in jouw eigen tempo.</p>
        <div class="hero-knoppen">
          <a class="knop primair" href="#/oefeningen">Bekijk oefeningen</a>
          <a class="knop secundair" href="#/sessie">Start een geleide sessie</a>
          ${heeftIntake ? '<a class="knop secundair" href="#/weekoverzicht">Mijn weekoverzicht</a>' : '<a class="knop secundair" href="#/intake">Stel mijn week samen</a>'}
        </div>
      </section>
      <section class="kaarten">
        <h2>Wat kun je hier doen?</h2>
        <div class="kaart-grid">
          <a class="kaart" href="#/oefeningen">
            <span class="kaart-icoon" aria-hidden="true">💪</span>
            <h3>Oefeningen</h3>
            <p>Kracht, cardio, souplesse, snelheid, balans en beweeg-snacks — elk met stap-voor-stap uitleg.</p>
          </a>
          <a class="kaart" href="#/sessie">
            <span class="kaart-icoon" aria-hidden="true">⏱️</span>
            <h3>Geleide sessie</h3>
            <p>Kies een oefening en laat de timer aftellen. Optioneel met voorlezen en geluidjes.</p>
          </a>
          <a class="kaart" href="#/beweegwinst">
            <span class="kaart-icoon" aria-hidden="true">🌿</span>
            <h3>Natuurlijke beweegwinst</h3>
            <p>Wandelen, fietsen, traplopen: zie direct hoeveel beweegminuten je heute hebt verdiend.</p>
          </a>
          <a class="kaart" href="#/programma">
            <span class="kaart-icoon" aria-hidden="true">📅</span>
            <h3>Fitnessprogramma's</h3>
            <p>4-weekse programma's die in kleine stapjes opbouwen, zo snel als jij wilt.</p>
          </a>
          <a class="kaart" href="#/weekoverzicht">
            <span class="kaart-icoon" aria-hidden="true">🗓️</span>
            <h3>Mijn week</h3>
            <p>Een weekoverzicht op basis van wat je leuk vindt, alleen of samen sport en of je bij een club zit.</p>
          </a>
          <a class="kaart" href="#/instellingen">
            <span class="kaart-icoon" aria-hidden="true">⚙️</span>
            <h3>Instellingen</h3>
            <p>Tekstgrootte, hoog contrast, voorlezen en rustige modus.</p>
          </a>
        </div>
      </section>
      <section class="waarschuwing">
        <p><strong>Belangrijk:</strong> luister naar je lijf. Bij pijn, duizeligheid of kortademigheid: stop en neem contact op met je huisarts.</p>
      </section>
    `;
    announce("Startpagina geladen.");
  }

  /* ---------- intake ---------- */
  const INTAKE_ORDER = ["doel", "niveau", "leukVinden", "makkelijkAfgaat", "samen", "club", "dagen"];
  let intakeStap = 0;

  function viewIntake() {
    intakeStap = 0;
    renderIntakeStap();
  }

  function renderIntakeStap() {
    const key = INTAKE_ORDER[intakeStap];
    if (!key) { location.hash = "#/weekoverzicht"; return; }
    const blok = PF_DATA.intake[key];
    const meervoud = key === "leukVinden" || key === "makkelijkAfgaat";
    const huidig = (state.intake && state.intake[key]) || (meervoud ? [] : "");
    const meer = INTAKE_ORDER.length;
    main.innerHTML = `
      <section class="intake">
        <p class="stap-teller">Vraag ${intakeStap + 1} van ${meer}</p>
        <h1>${esc(blok.vraag)}</h1>
        <div class="opties" role="${meervoud ? "group" : "radiogroup"}">
          ${blok.opties.map(o => `
            <label class="optie ${Array.isArray(huidig) ? (huidig.includes(o.id) ? "geselecteerd" : "") : (huidig === o.id ? "geselecteerd" : "")}">
              <input type="${meervoud ? "checkbox" : "radio"}" name="intake_${key}" value="${o.id}" ${Array.isArray(huidig) ? (huidig.includes(o.id) ? "checked" : "") : (huidig === o.id ? "checked" : "")}>
              <span>${esc(o.naam)}</span>
            </label>
          `).join("")}
        </div>
        <div class="knop-rij">
          ${intakeStap > 0 ? '<button class="knop secundair" id="intake-terug">← Vorige</button>' : ""}
          <button class="knop primair" id="intake-verder">${intakeStap === meer - 1 ? "Afronden ✓" : "Volgende →"}</button>
        </div>
      </section>
    `;
    main.querySelectorAll("input").forEach(inp => inp.addEventListener("change", () => {
      inp.closest(".optie").classList.toggle("geselecteerd", inp.checked);
    }));
    const verder = document.getElementById("intake-verder");
    const terug = document.getElementById("intake-terug");
    verder.addEventListener("click", () => {
      const vendre = main.querySelectorAll(`input[name="intake_${key}"]:checked`);
      const waarden = Array.from(vendre).map(v => v.value);
      if (!meervoud && waarden.length === 0) {
        announce("Kies eerst een antwoord.");
        verder.focus();
        return;
      }
      if (meervoud && waarden.length === 0) {
        announce("Kies minstens één antwoord.");
        return;
      }
      state.intake = state.intake || {};
      state.intake[key] = meervoud ? waarden : waarden[0];
      state.intakeVoltooid = true;
      save(state);
      intakeStap++;
      if (intakeStap >= meer) {
        spreek("Goed bezig! Je weekoverzicht is klaar.");
        location.hash = "#/weekoverzicht";
      } else {
        renderIntakeStap();
        announce("Vraag " + (intakeStap + 1) + " van " + meer);
      }
    });
    if (terug) terug.addEventListener("click", () => { intakeStap--; renderIntakeStap(); });
  }

  /* ---------- oefeningen ---------- */
  let filterCat = "alle";

  function viewOefeningen() {
    const cats = [{ id: "alle", naam: "Alles", icoon: "✨" }].concat(PF_DATA.categorieën);
    main.innerHTML = `
      <section>
        <h1>Oefeningen</h1>
        <p class="lead">Kies een categorie. Bij elke oefening staat stap-voor-stap wat je moet doen.</p>
        <div class="filter-rij" role="tablist" aria-label="Filter op categorie">
          ${cats.map(c => `<button class="filter-knop ${filterCat === c.id ? "actief" : ""}" data-cat="${c.id}" role="tab" aria-selected="${filterCat === c.id}">${c.icoon} ${esc(c.naam)}</button>`).join("")}
        </div>
        <div class="oefening-lijst" id="oef-lijst"></div>
      </section>
    `;
    main.querySelectorAll(".filter-knop").forEach(b => b.addEventListener("click", () => {
      filterCat = b.dataset.cat;
      viewOefeningen();
      announce("Categorie " + b.textContent.trim() + " geselecteerd.");
    }));
    renderOefeningLijst();
  }

  function renderOefeningLijst() {
    const lijst = document.getElementById("oef-lijst");
    const items = PF_DATA.oefeningen.filter(o => filterCat === "alle" || o.categorie === filterCat);
    lijst.innerHTML = items.map(o => `
      <article class="oefening-kaart">
        <h3><a href="#/oefening?id=${o.id}">${catNaam(o.categorie)} — ${esc(o.titel)}</a></h3>
        <p>${esc(o.beschrijving)}</p>
        <p class="meta">⏱️ ${fmtTijd(o.duur)} · niveau: ${esc(o.niveau)}</p>
        <a class="knop klein" href="#/sessie?oef=${o.id}">▶ Start geleide sessie</a>
      </article>
    `).join("");
  }

  function viewOefeningDetail(param) {
    const id = new URLSearchParams(param || "").get("id");
    const o = PF_DATA.oefeningen.find(x => x.id === id);
    if (!o) { location.hash = "#/oefeningen"; return; }
    main.innerHTML = `
      <section class="detail">
        <p><a href="#/oefeningen">← Alle oefeningen</a></p>
        <h1>${catNaam(o.categorie)} — ${esc(o.titel)}</h1>
        <p class="lead">${esc(o.beschrijving)}</p>
        <p class="meta">⏱️ ${fmtTijd(o.duur)} · niveau: ${esc(o.niveau)}</p>
        <h2>Zo doe je het, stap voor stap</h2>
        <ol class="stappen-lijst">
          ${o.stappen.map(s => `<li>${esc(s)}</li>`).join("")}
        </ol>
        <div class="knop-rij">
          <a class="knop primair" href="#/sessie?oef=${o.id}">▶ Start geleide sessie (${fmtTijd(o.duur)})</a>
          <button class="knop secundair" id="lees-voor">🔊 Lees voor</button>
        </div>
      </section>
    `;
    document.getElementById("lees-voor").addEventListener("click", () => {
      const tekst = o.titel + ". " + o.beschrijving + " " + o.stappen.map((s, i) => "Stap " + (i + 1) + ": " + s).join(" ");
      if (state.instellingen.spraak) { spreek(tekst); }
      else {
        state.instellingen.spraak = true; save(state); applyInstellingen();
        spreek(tekst);
        announce("Voorlezen ingeschakeld.");
      }
    });
    announce(o.titel + " geopend.");
  }

  /* ---------- geleide sessie met timer ---------- */
  let sessie = null; // {oef, teller, resterend, stapIndex, fase}

  function viewSessie(param) {
    const id = new URLSearchParams(param || "").get("oef");
    if (sessie) { clearInterval(sessie.teller); sessie = null; stopSpraak(); }
    const o = PF_DATA.oefeningen.find(x => x.id === id) || PF_DATA.oefeningen[0];
    sessie = { oef: o, resterend: o.duur, teller: null, klaar: false };
    main.innerHTML = `
      <section class="sessie">
        <p><a href="#/oefeningen">← Terug naar oefeningen</a></p>
        <h1>${catNaam(o.categorie)} — ${esc(o.titel)}</h1>
        <p class="lead">${esc(o.beschrijving)}</p>
        <div class="timer-ring" aria-live="off">
          <span class="timer-tijd" id="timer-tijd">${fmtTijd(o.duur)}</span>
          <span class="timer-label">resterend</span>
        </div>
        <ol class="stappen-lijst" id="sessie-stappen">
          ${o.stappen.map((s, i) => `<li id="stap-${i}" class="${i === 0 ? 'huidig' : ''}">${esc(s)}</li>`).join("")}
        </ol>
        <div class="knop-rij">
          <button class="knop primair" id="sessie-start">▶ Start</button>
          <button class="knop secundair" id="sessie-pauze" disabled>⏸ Pauze</button>
          <button class="knop secundair" id="sessie-stop">⏹ Stop</button>
        </div>
        <p class="sessie-status" id="sessie-status" role="status">Druk op Start om te beginnen.</p>
      </section>
    `;
    document.getElementById("sessie-start").addEventListener("click", startSessie);
    document.getElementById("sessie-pauze").addEventListener("click", pauzeSessie);
    document.getElementById("sessie-stop").addEventListener("click", () => {
      if (sessie) clearInterval(sessie.teller);
      sessie = null; stopSpraak();
      location.hash = "#/oefeningen";
    });
    announce("Geleide sessie voor " + o.titel + ". Druk op start.");
  }

  function startSessie() {
    if (!sessie || sessie.teller) return;
    const o = sessie.oef;
    document.getElementById("sessie-start").disabled = true;
    document.getElementById("sessie-pauze").disabled = false;
    const status = document.getElementById("sessie-status");
    status.textContent = "Sessie bezig…";
    spreek(o.titel + ". " + o.stappen[0]);
    let stapIdx = 0;
    const stapTijd = Math.max(5, Math.floor(o.duur / o.stappen.length));
    sessie.teller = setInterval(() => {
      sessie.resterend--;
      document.getElementById("timer-tijd").textContent = fmtTijd(Math.max(0, sessie.resterend));
      if (sessie.resterend % stapTijd === 0 && stapIdx < o.stappen.length - 1) {
        stapIdx++;
        document.querySelectorAll("#sessie-stappen li").forEach((li, i) => li.classList.toggle("huidig", i === stapIdx));
        spreek("Stap " + (stapIdx + 1) + ": " + o.stappen[stapIdx]);
        piep(520, 0.15);
      }
      if (sessie.resterend <= 10 && sessie.resterend > 0) piep(880, 0.1, "triangle");
      if (sessie.resterend <= 0) {
        clearInterval(sessie.teller);
        sessie.teller = null;
        sessie.klaar = true;
        status.textContent = "Goed gedaan! 🎉 De sessie is klaar.";
        piep(660, 0.3); setTimeout(() => piep(880, 0.4), 300);
        spreek("Goed gedaan! De sessie is klaar. Je hebt het super gedaan.");
        announce("Sessie voltooid. Goed gedaan!");
        document.getElementById("sessie-start").disabled = false;
        document.getElementById("sessie-pauze").disabled = true;
        document.getElementById("sessie-start").textContent = "↻ Opnieuw";
        document.getElementById("sessie-start").onclick = () => location.hash = "#/sessie?oef=" + o.id;
      }
    }, 1000);
  }

  function pauzeSessie() {
    if (!sessie) return;
    if (sessie.teller) {
      clearInterval(sessie.teller); sessie.teller = null; stopSpraak();
      document.getElementById("sessie-pauze").textContent = "▶ Verder";
      document.getElementById("sessie-status").textContent = " gepauzeerd.";
    } else {
      document.getElementById("sessie-pauze").textContent = "⏸ Pauze";
      startSessie();
    }
  }

  /* ---------- programma's ---------- */
  function viewProgramma() {
    main.innerHTML = `
      <section>
        <h1>Fitnessprogramma's</h1>
        <p class="lead">Elk programma duurt 4 weken en bouwt in kleine stapjes op. Je bepaalt zelf het tempo: een week mag je zo vaak herhalen als je wilt.</p>
        <div class="programma-lijst">
          ${PF_PROGRAMMAS.map(p => `
            <article class="programma-kaart">
              <h3><a href="#/week?prog=${p.id}&week=1">${p.icoon} ${esc(p.titel)}</a></h3>
              <p>${esc(p.beschrijving)}</p>
              <p class="meta">⏱️ ${esc(p.lestijd)} per sessie · 4 weken</p>
              <a class="knop klein" href="#/week?prog=${p.id}&week=1">Bekijk week 1 →</a>
            </article>
          `).join("")}
        </div>
      </section>
    `;
    announce("Fitnessprogramma's geladen.");
  }

  function viewWeek(param) {
    const q = new URLSearchParams(param || "");
    const progId = q.get("prog");
    const weekNr = Math.min(4, Math.max(1, parseInt(q.get("week") || "1", 10)));
    const p = PF_PROGRAMMAS.find(x => x.id === progId);
    if (!p) { location.hash = "#/programma"; return; }
    const week = p.weken[weekNr - 1];
    const tempo = (state.tempo && state.tempo[p.id]) || "normaal";
    main.innerHTML = `
      <section>
        <p><a href="#/programma">← Alle programma's</a></p>
        <h1>${p.icoon} ${esc(p.titel)} — week ${weekNr}</h1>
        <p class="lead">Focus deze week: <strong>${esc(week.focus)}</strong></p>
        <div class="week-nav">
          ${weekNr > 1 ? `<a class="knop klein secundair" href="#/week?prog=${p.id}&week=${weekNr - 1}">← Week ${weekNr - 1}</a>` : ""}
          ${weekNr < 4 ? `<a class="knop klein primair" href="#/week?prog=${p.id}&week=${weekNr + 1}">Week ${weekNr + 1} →</a>` : ""}
        </div>
        <div class="tempo-keuze">
          <span>Jouw tempo:</span>
          <button class="filter-knop ${tempo === "rustig" ? "actief" : ""}" data-tempo="rustig">🐢 Rustig (week herhalen mag)</button>
          <button class="filter-knop ${tempo === "normaal" ? "actief" : ""}" data-tempo="normaal">🚶 Normaal (door naar volgende week)</button>
          <button class="filter-knop ${tempo === "snel" ? "actief" : ""}" data-tempo="snel">🐇 Snel (extra défi)</button>
        </div>
        <div class="sessie-lijst">
          ${week.sessies.map((s, i) => `
            <article class="sessie-kaart">
              <h3>${esc(s.dag)} — ${esc(s.naam)}</h3>
              <p>⏱️ ${s.duurMin} minuten</p>
              <p class="tip">💡 ${esc(s.tip)}</p>
            </article>
          `).join("")}
        </div>
        ${weekNr === 4 ? `<p class="waarschuwing">Na week 4 kies je zelf: verder met hetzelfde programma, een ander programma, of je eigen weekoverzicht.</p>` : ""}
      </section>
    `;
    main.querySelectorAll("[data-tempo]").forEach(b => b.addEventListener("click", () => {
      state.tempo = state.tempo || {};
      state.tempo[p.id] = b.dataset.tempo;
      save(state);
      viewWeek(param);
      announce("Tempo ingesteld op " + b.dataset.tempo);
    }));
    announce("Week " + weekNr + " van " + p.titel);
  }

  /* ---------- natuurlijke beweegwinst ---------- */
  function viewBeweegwinst() {
    const acts = PF_DATA.natuurlijkeActiviteit;
    main.innerHTML = `
      <section>
        <h1>🌿 Natuurlijke beweegwinst</h1>
        <p class="lead">Je hoeft niet naar de sportschool om fitter te worden. Traplopen, wandelen, fietsen, tuinieren — het telt allemaal mee. Vul in wat je vandaag hebt gedaan en zie hoeveel beweegminuten je hebt verdiend.</p>
        <div class="beweegwinst">
          ${acts.map(a => `
            <div class="bw-rij">
              <label for="bw-${a.id}">${a.icoon} ${esc(a.naam)}</label>
              <input type="number" id="bw-${a.id}" min="0" max="999" inputmode="numeric" placeholder="0" aria-label="${esc(a.naam)} in ${esc(a.eenheid)}">
              <span class="bw-eenheid">${esc(a.eenheid)}</span>
            </div>
          `).join("")}
        </div>
        <button class="knop primair" id="bw-bereken">Bereken mijn beweegwinst</button>
        <div id="bw-resultaat" class="bw-resultaat" role="status"></div>
        <p class="meta">Richtlijn voor volwassenen: minstens 150 minuten matig intensief bewegen per week. Elke minuut telt — ook 5 minuten!</p>
      </section>
    `;
    document.getElementById("bw-bereken").addEventListener("click", () => {
      let totaal = 0;
      const regels = [];
      acts.forEach(a => {
        const v = parseFloat(document.getElementById("bw-" + a.id).value) || 0;
        const min = Math.round(v * a.perMinuut * 10) / 10;
        if (min > 0) regels.push(`${a.icoon} ${a.naam}: ${v} → ${min} beweegminuten`);
        totaal += min;
      });
      totaal = Math.round(totaal * 10) / 10;
      const doel = 150 / 7; // per dag promedio van de week-richtlijn
      const pct = Math.min(100, Math.round((totaal / doel) * 100));
      const res = document.getElementById("bw-resultaat");
      res.innerHTML = `
        <h2>Vandaag: <strong>${totaal} beweegminuten</strong> 🎉</h2>
        ${regels.length ? `<ul>${regels.map(r => `<li>${esc(r)}</li>`).join("")}</ul>` : "<p>Nog niets ingevuld — elk begin is goed!</p>"}
        <div class="balk"><div class="balk-vulling" style="width:${pct}%"></div></div>
        <p>${pct}% van het daggemiddelde van de week-richtlijn (≈ ${Math.round(doel)} min/dag).</p>
      `;
      spreek("Je hebt vandaag " + totaal + " beweegminuten verdiend. Goed bezig!");
      announce("Beweegwinst: " + totaal + " minuten.");
    });
    announce("Natuurlijke beweegwinst geopend.");
  }

  /* ---------- weekoverzicht op maat ---------- */
  function viewWeekoverzicht() {
    if (!state.intake || !state.intakeVoltooid) {
      main.innerHTML = `
        <section class="hero">
          <h1>Nog geen weekoverzicht</h1>
          <p class="lead">Beantwoord eerst een paar korte vragen over wat je leuk vindt en hoe je het liefst beweegt. Dan stellen we jouw persoonlijke week samen.</p>
          <a class="knop primair" href="#/intake">Start de vragen</a>
        </section>
      `;
      return;
    }
    const i = state.intake;
    const leuk = (i.leukVinden || []).map(id => { const o = PF_DATA.intake.leukVinden.opties.find(x => x.id === id); return o ? o.naam : id; });
    const mak = (i.makkelijkAfgaat || []).map(id => { const o = PF_DATA.intake.makkelijkAfgaat.opties.find(x => x.id === id); return o ? o.naam : id; });
    const samenNaam = ({ alleen: "alleen, in eigen tempo", samen: "samen met iemand", wissel: "wisselend" })[i.samen] || i.samen;
    const clubNaam = ({ ja: "ja, lid van een club", nee: "nee", wil_ja: "nee, maar wil er graag een vinden" })[i.club] || i.club;
    const dagen = parseInt(i.dagen || "3", 10);
    const doelNaam = ({ kracht: "Sterker worden", conditie: "Betere conditie", balans: "Balans & valpreventie", soepel: "Soupeler bewegen", energie: "Meer energie" })[i.doel] || i.doel;

    // week samenstellen uit voorkeuren
    const week = buildWeek(i, dagen);

    main.innerHTML = `
      <section>
        <h1>🗓️ Jouw weekoverzicht</h1>
        <p class="lead">Samengesteld op basis van jouw antwoorden. Alles in je eigen tempo — pas gerust aan.</p>
        <details class="jouw-antwoorden">
          <summary>Dit heb je ingevuld</summary>
          <ul>
            <li><strong>Doel:</strong> ${esc(doelNaam)}</li>
            <li><strong>Leuk:</strong> ${leuk.map(esc).join(", ") || "—"}</li>
            <li><strong>Gaat makkelijk af:</strong> ${mak.map(esc).join(", ") || "—"}</li>
            <li><strong>Alleen of samen:</strong> ${esc(samenNaam)}</li>
            <li><strong>Club:</strong> ${esc(clubNaam)}</li>
            <li><strong>Aantal dagen:</strong> ${dagen}</li>
          </ul>
          <a class="knop klein secundair" href="#/intake">Antwoorden wijzigen</a>
        </details>
        <h2>Voorgestelde week</h2>
        <div class="sessie-lijst">
          ${week.map(d => `
            <article class="sessie-kaart">
              <h3>${esc(d.dag)} — ${d.icoon} ${esc(d.naam)}</h3>
              <p>⏱️ ${d.duurMin} minuten</p>
              <p class="tip">💡 ${esc(d.tip)}</p>
            </article>
          `).join("")}
        </div>
        <p class="meta">Beweeg-snacks tussendoor tellen ook mee — bekijk ze bij <a href="#/oefeningen">Oefeningen → Beweeg-snacks</a>.</p>
      </section>
    `;
    announce("Jouw weekoverzicht is geladen.");
  }

  function buildWeek(i, dagen) {
    const leuk = i.leukVinden || [];
    const samen = i.samen === "samen";
    const club = i.club === "ja" || i.club === "wil_ja";
    const pool = [];
    const add = (dag, icoon, naam, duurMin, tip) => pool.push({ dag, icoon, naam, duurMin, tip });

    const dagenNamen = ["Maandag", "Woensdag", "Vrijdag", "Zaterdag", "Zondag", "Dinsdag", "Donderdag"];
    const gebruikDagen = dagenNamen.slice(0, dagen);

    // basis: doel bepaalt soort sessie
    const doelMap = {
      kracht: ["💪 Krachtoefeningen (thuis)", 15, "Kies 3-4 oefeningen uit de categorie Kracht."],
      conditie: ["🚶 Wandelen of fietsen", 20, "Rustig tempo waarbij je nog kunt praten."],
      balans: ["⚖️ Balansoefeningen", 12, "Houd iets stevigs in de buurt."],
      soepel: ["🧘 Soepelheid & ademhaling", 15, "Rek rustig, forceer niets."],
      energie: ["🕺 Bewegen op muziek", 15, "Kies een nummer dat je energie geeft."]
    };
    const doel = doelMap[i.doel] || doelMap.energie;

    // verdeel over dagen
    gebruikDagen.forEach((dag, idx) => {
      if (idx % 2 === 0) {
        add(dag, doel[0].split(" ")[0], doel[0].split(" ").slice(1).join(" "), doel[1], doel[2]);
      } else if (leuk.includes("wandelen")) {
        add(dag, "🚶", "Wandeling in de buurt", 20, samen ? "Vraag iemand mee!" : "Geniet van de buitenlucht.");
      } else if (leuk.includes("fietsen")) {
        add(dag, "🚲", "Fietstochtje", 25, samen ? "Samen fietsen is extra gezellig." : "Kies een rustige route.");
      } else if (leuk.includes("dansen")) {
        add(dag, "🕺", "Dansen op muziek", 15, "Thuis, in de woonkamer.");
      } else if (leuk.includes("zwemmen")) {
        add(dag, "🏊", "Zwemmen of aquafit", 30, club ? "Bij jouw club/zwembad." : "Zoek een zwembad in de buurt.");
      } else {
        add(dag, "🍎", "Beweeg-snacks door de dag", 10, "Kleine stukjes bewegen tussendoor.");
      }
    });

    // club-activiteit toevoegen
    if (club && gebruikDagen.length > 2) {
      pool.push({ dag: gebruikDagen[gebruikDagen.length - 1], icoon: "👥", naam: i.club === "ja" ? "Activiteit bij je club" : "Probeer een club/groep in de buurt", duurMin: 45, tip: i.club === "ja" ? "Vraag de club naar suitable activiteiten." : "Vraag bij de sportclub, buurthuis of bibliotheek naar beweeggroepen." });
    }
    return pool;
  }

  /* ---------- instellingen ---------- */
  function viewInstellingen() {
    const s = state.instellingen;
    main.innerHTML = `
      <section>
        <h1>⚙️ Instellingen</h1>
        <p class="lead">Pas de app aan zodat hij voor jou prettig werkt. Alles wordt alleen op dit apparaat bewaard.</p>

        <fieldset class="instelling">
          <legend>Tekstgrootte</legend>
          <div class="knop-rij" role="radiogroup" aria-label="Tekstgrootte">
            ${[["klein", "A klein"], ["normaal", "A normaal"], ["groot", "A groot"], ["extra", "A extra groot"]].map(([v, label]) =>
              `<button class="filter-knop ${s.tekstgrootte === v ? "actief" : ""}" data-tekst="${v}" aria-pressed="${s.tekstgrootte === v}">${label}</button>`).join("")}
          </div>
        </fieldset>

        <fieldset class="instelling">
          <legend>Weergave</legend>
          <label class="optie ${s.contrast ? "geselecteerd" : ""}">
            <input type="checkbox" id="inst-contrast" ${s.contrast ? "checked" : ""}>
            <span>Hoog contrast (zwart op geel, extra duidelijk)</span>
          </label>
          <label class="optie ${s.rustig ? "geselecteerd" : ""}">
            <input type="checkbox" id="inst-rustig" ${s.rustig ? "checked" : ""}>
            <span>Rustige modus (minder animatie en kleur)</span>
          </label>
        </fieldset>

        <fieldset class="instelling">
          <legend>Geluid & spraak</legend>
          <label class="optie ${s.spraak ? "geselecteerd" : ""}">
            <input type="checkbox" id="inst-spraak" ${s.spraak ? "checked" : ""}>
            <span>🔊 Voorlezen (lezingen en sessies hardop voorgelezen)</span>
          </label>
          <label class="optie ${s.geluid ? "geselecteerd" : ""}">
            <input type="checkbox" id="inst-geluid" ${s.geluid ? "checked" : ""}>
            <span>🔔 Geluidjes bij de timer</span>
          </label>
          <button class="knop klein secundair" id="test-spraak">Test: lees een zin voor</button>
        </fieldset>

        <div class="knop-rij">
          <button class="knop secundair" id="wis-alles">Alle gegevens op dit apparaat wissen</button>
        </div>
      </section>
    `;
    main.querySelectorAll("[data-tekst]").forEach(b => b.addEventListener("click", () => {
      updateInstellingen({ tekstgrootte: b.dataset.tekst });
      viewInstellingen();
      announce("Tekstgrootte: " + b.dataset.tekst);
    }));
    document.getElementById("inst-contrast").addEventListener("change", e => {
      updateInstellingen({ contrast: e.target.checked }); viewInstellingen();
    });
    document.getElementById("inst-rustig").addEventListener("change", e => {
      updateInstellingen({ rustig: e.target.checked }); viewInstellingen();
    });
    document.getElementById("inst-spraak").addEventListener("change", e => {
      updateInstellingen({ spraak: e.target.checked });
      if (e.target.checked) spreek("Voorlezen staat nu aan. Zo klinkt het.");
      else stopSpraak();
      viewInstellingen();
    });
    document.getElementById("inst-geluid").addEventListener("change", e => {
      updateInstellingen({ geluid: e.target.checked });
      if (e.target.checked) piep(660, 0.2);
      viewInstellingen();
    });
    document.getElementById("test-spraak").addEventListener("click", () => {
      if (!state.instellingen.spraak) updateInstellingen({ spraak: true });
      spreek("Dit is een test. Als je dit hoort, werkt het voorlezen goed.");
    });
    document.getElementById("wis-alles").addEventListener("click", () => {
      if (confirm("Weet je zeker dat je alle gegevens (antwoorden, tempo) op dit apparaat wilt wissen?")) {
        localStorage.removeItem(STORE_KEY);
        state = { instellingen: state.instellingen };
        applyInstellingen();
        announce("Gegevens gewist.");
        viewInstellingen();
      }
    });
    announce("Instellingen geopend.");
  }

  /* ---------- boot ---------- */
  applyInstellingen();
  if (location.hash === "" ) location.hash = "#/";
  nav();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
})();
