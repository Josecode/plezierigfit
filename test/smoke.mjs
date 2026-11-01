// Smoke test: laadt data.js + programmas.js + app.js met een minimale DOM-stub
// en rendert elke route. Vangt runtime-fouten op.
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);

// --- minimale DOM ---
function makeEl(tag) {
  const el = {
    tag, children: [], attributes: {}, dataset: {}, style: {},
    _html: "", textContent: "", disabled: false, checked: false, value: "",
    classList: { _s: new Set(), add(c){this._s.add(c);}, toggle(c,f){f?this._s.add(c):this._s.delete(c);}, contains(c){return this._s.has(c);} },
    set innerHTML(v) { this._html = v; this.children = []; },
    get innerHTML() { return this._html; },
    set className(v) { this.classList._s = new Set(v.split(/\s+/).filter(Boolean)); },
    addEventListener() {}, removeEventListener() {},
    querySelectorAll() { return []; }, querySelector() { return null; },
    appendChild(c) { this.children.push(c); },
    focus() {}, click() {},
    getAttribute(n) { return this.attributes[n] ?? null; },
    setAttribute(n, v) { this.attributes[n] = v; },
  };
  return el;
}

const mainEl = makeEl("main");
const liveEl = makeEl("div");
const htmlEl = { dataset: {} };
const bodyEl = makeEl("body");

const store = {};
const handlers = {};
const sandbox = {
  console,
  addEventListener: (type, fn) => { (handlers[type] = handlers[type] || []).push(fn); },
  dispatchEvent: (ev) => { (handlers[ev.type] || []).forEach((fn) => fn(ev)); return true; },
  scrollTo: () => {},
  Event: class Event { constructor(type) { this.type = type; } },
  window: {},
  document: {
    getElementById: (id) => (id === "hoofd" ? mainEl : id === "live-region" ? liveEl : makeEl("div")),
    querySelectorAll: () => [],
    documentElement: htmlEl,
    body: bodyEl,
  },
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
  },
  location: { hash: "#/" },
  navigator: {},
  setInterval, clearInterval, setTimeout, clearTimeout,
  URLSearchParams,
  confirm: () => true,
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

function run(file) {
  const code = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInContext(code, sandbox, { filename: file });
}

run("js/data.js");
run("js/programmas.js");
// intake-data zetten vóór het laden van app.js, zodat state bij bootuit localStorage komt
store["plezierigfit_v1"] = JSON.stringify({
  intake: { doel: "kracht", niveau: "beginner", leukVinden: ["wandelen", "fietsen"], makkelijkAfgaat: ["korte_stukjes"], samen: "samen", club: "ja", dagen: "4" },
  intakeVoltooid: true
});
run("js/app.js");

const routes = ["#/", "#/intake", "#/oefeningen", "#/oefening?id=k1", "#/sessie?oef=k1",
  "#/programma", "#/week?prog=kracht&week=2", "#/beweegwinst", "#/weekoverzicht", "#/instellingen"];

let fail = 0;
for (const r of routes) {
  try {
    sandbox.location.hash = r;
    sandbox.dispatchEvent({ type: "hashchange" });
    if (!mainEl.innerHTML || mainEl.innerHTML.length < 50) throw new Error("leeg scherm");
    console.log("OK  " + r + "  (" + mainEl.innerHTML.length + " tekens)");
  } catch (e) {
    fail++;
    console.log("FAIL " + r + " -> " + e.message);
  }
}

// data-integriteit
const dataOk = vm.runInContext(`
  (function(){
    const cats = new Set(PF_DATA.categorieën.map(c=>c.id));
    const fouteCat = PF_DATA.oefeningen.filter(o=>!cats.has(o.categorie));
    const legeStappen = PF_DATA.oefeningen.filter(o=>!o.stappen || !o.stappen.length);
    const fouteProg = PF_PROGRAMMAS.filter(p=>p.weken.length!==4);
    return { totaal: PF_DATA.oefeningen.length, fouteCat: fouteCat.length, legeStappen: legeStappen.length, fouteProg: fouteProg.length, programmas: PF_PROGRAMMAS.length };
  })()
`, sandbox);
console.log("Data:", JSON.stringify(dataOk));
if (dataOk.fouteCat || dataOk.legeStappen || dataOk.fouteProg) fail++;

// weekoverzicht met intake-data testen (data zat al in localStorage vóór boot)
try {
  sandbox.location.hash = "#/weekoverzicht";
  sandbox.dispatchEvent({ type: "hashchange" });
  if (mainEl.innerHTML.length < 500) throw new Error("weekoverzicht lijkt leeg (" + mainEl.innerHTML.length + " tekens)");
  if (!mainEl.innerHTML.includes("Jouw weekoverzicht")) throw new Error("verkeerde view gerenderd");
  if (!mainEl.innerHTML.includes("Krachtoefeningen")) throw new Error("doel-sessie ontbreekt in week");
  console.log("OK  #/weekoverzicht (met intake) (" + mainEl.innerHTML.length + " tekens, week gevuld)");
} catch (e) { fail++; console.log("FAIL weekoverzicht met intake -> " + e.message); }

console.log(fail === 0 ? "\nALLE TESTS GESLAAGD" : "\n" + fail + " TEST(S) GEFAALD");
process.exit(fail === 0 ? 0 : 1);
