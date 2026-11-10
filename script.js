/* =====================================================================
   EDIT HERE. Add one entry to DAYS for each finished day (see the template at the end).
   km is optional: if left out it is estimated from the map.
   ===================================================================== */
const CONFIG = {
  walker: "",                 // e.g. "Walked by ___"
  year: 2026,
  totalDays: 40,              // planned length of the walk
  startDate: "",              // "2026-10-20" shows dates on each stamp
  instagram: "",              // profile URL
  facebook: "",               // profile URL
  roadFactor: 1.25,           // straight-line distance → road distance
  start: { zh:"台中", en:"Taichung", lon:120.68, lat:24.15 },
};

// One entry per day he has FINISHED. Add the next one when he arrives that evening.
// The page shows exactly these days: stamps, map line, stats.
const DAYS = [
  { zh:"彰化",     en:"Changhua",  lon:120.54, lat:24.08, km:30, reel:"https://www.instagram.com/reel/DfPTXZcir8O/" },
  { zh:"溪州",     en:"Xizhou",    lon:120.49, lat:23.85, km:23, reel:"https://www.instagram.com/reel/DfRoTIICwNh/" },
  { zh:"大林",     en:"Dalin",     lon:120.46, lat:23.60, km:33, reel:"https://www.instagram.com/reel/DfUT7nJJ5nB/" },
  { zh:"嘉義",     en:"Chiayi",    lon:120.45, lat:23.48, km:17, reel:"https://www.instagram.com/reel/DfWx7w0i0tX/" },
  { zh:"台南麻豆", en:"Madou",     lon:120.25, lat:23.18, km:45, reel:"https://www.instagram.com/reel/DfZy3cUCczP/" },
  { zh:"台南市",   en:"Tainan",    lon:120.20, lat:22.99, km:24, reel:"https://www.instagram.com/reel/DfcFl91JEVv/" },
  { zh:"台南市",   en:"Tainan",    lon:120.20, lat:22.99, rest:true, reel:"https://www.instagram.com/reel/DfebWT1iLeY/" },
  { zh:"高雄市",   en:"Kaohsiung", lon:120.30, lat:22.63, km:46, reel:"https://www.instagram.com/reel/DfhayfNCti9/" },
  { zh:"高雄林園", en:"Linyuan",   lon:120.39, lat:22.50, km:22, reel:"https://www.instagram.com/reel/Dfj3wHeCjlf/" },
  // template: { zh:"岡山", en:"Gangshan", lon:120.30, lat:22.80, km:24, note:"...", reel:"https://www.instagram.com/reel/..." },
  // optional: km (else estimated from the map), note, reel, fb, rest:true (rest day, 0 km), finish:true (back in Taichung)
];

/* ===================================================================== */

// ---- page text in both languages (Traditional Chinese is the default) ----
const I18N = {
  zh: {
    htmlLang: "zh-Hant", title: "徒步環島四十天",
    h1: "徒步環島<em>四十天</em>", sub: ["en", "Around Taiwan on Foot"],
    mapLabel: "台灣地圖:從台中出發的徒步路線", walked: "已走路線",
    stampsH: "紀念章",
    foot1: "台中 → 環島一圈 → 台中",
    close: "關閉", reelOut: "載入不了?到 Instagram 觀看 ↗",
    loading: "影片載入中…", reelFail: "Instagram 沒辦法在這裡載入影片。<br>請點下方連結到 Instagram 觀看。",
    stats: ["天數", "已走公里", "剩餘天數", "紀念章"],
    igBtn: "Instagram 影片 ↗", fbBtn: "Facebook ↗",
    day: n => `第 ${n} 天`,
    km: k => `${k} 公里`,
    place: d => `<span lang="zh-Hant">${esc(d.zh)}</span>`,
    placeText: d => d.zh,
    from: d => d.rest ? `在 <span lang="zh-Hant">${esc(d.zh)}</span> 休息一天` : `從 <span lang="zh-Hant">${esc(d.from.zh)}</span> 出發`,
    restDay: "休息日",
    now: n => `第 ${n} 天 · 目前位置`,
    watchDay: d => `觀看第 ${d.n} 天(${d.zh})的影片`,
    watch: "▶ 觀看影片", reelLink: "▶ 影片 ↗", soon: "影片即將上傳", next: "下一站", tbc: "未完待續⋯⋯",
    date: t => t.toLocaleDateString("zh-TW", {month: "long", day: "numeric"}),
  },
  en: {
    htmlLang: "en", title: "Around Taiwan on Foot",
    h1: "Around Taiwan <em>on&nbsp;Foot</em>", sub: ["zh-Hant", "徒步環島四十天"],
    mapLabel: "Map of Taiwan showing the walking route from Taichung", walked: "Walked",
    stampsH: `The stamps <span lang="zh-Hant">紀念章</span>`,
    foot1: "Taichung → around the island → Taichung",
    close: "Close", reelOut: "Not loading? Open it on Instagram ↗",
    loading: "Loading the reel…", reelFail: "Instagram didn't load the player here.<br>Tap the link below to watch it on Instagram.",
    stats: ["Day", "km walked", "days to go", "stamps"],
    igBtn: "Instagram reels ↗", fbBtn: "Facebook ↗",
    day: n => `Day ${pad(n)}`,
    km: k => `${k} km`,
    place: d => `<span lang="zh-Hant">${esc(d.zh)}</span> ${esc(d.en)}`,
    placeText: d => `${d.zh} ${d.en}`,
    from: d => d.rest ? `rest day in <span lang="zh-Hant">${esc(d.zh)}</span> ${esc(d.en)}` : `from <span lang="zh-Hant">${esc(d.from.zh)}</span> ${esc(d.from.en)}`,
    restDay: "Rest day",
    now: n => `DAY ${n} · NOW`,
    watchDay: d => `Watch the Day ${d.n} reel (${d.en})`,
    watch: "▶ Watch reel", reelLink: "▶ Reel ↗", soon: "Reel coming soon", next: "Walking next", tbc: "To be continued…",
    date: t => t.toLocaleDateString("en-GB", {day: "numeric", month: "short"}),
  },
};
let L = I18N.zh;

const INKS =["var(--verm)","var(--indigo)","var(--teal)","var(--plum)"];
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pad = n => String(n).padStart(2,"0");
const rand = seed => { const x = Math.sin(seed*999.13)*43758.5453; return x - Math.floor(x); };

function haversine(a,b){
  const R=6371, r=Math.PI/180;
  const dLat=(b.lat-a.lat)*r, dLon=(b.lon-a.lon)*r;
  const h=Math.sin(dLat/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}

// ---- derive per-day numbers ----
let cum = 0;
const days = DAYS.map((d,i) => {
  const prev = i ? DAYS[i-1] : CONFIG.start;
  const km = d.km ?? (d.rest ? 0 : Math.round(haversine(prev,d)*CONFIG.roadFactor));
  cum += km;
  return { ...d, done: d.done ?? true, n:i+1, from:prev, km, cum };
});
const lastDone = days.filter(d => d.done).at(-1);
const walked = lastDone ? lastDone.cum : 0;
const doneCount = days.filter(d => d.done).length;
const nextDay = days.find(d => !d.done);

function dateFor(n){
  if(!CONFIG.startDate) return "";
  const t = new Date(CONFIG.startDate + "T00:00:00");
  if(isNaN(t)) return "";
  t.setDate(t.getDate()+n-1);
  return L.date(t);
}

// ---- cover ----
$("#year").textContent = CONFIG.year;
if(CONFIG.walker) $("#walker").textContent = CONFIG.walker; else $("#walker").remove();
if(!CONFIG.instagram && !CONFIG.facebook) $("#follow").remove();
function renderCover(){
  $("#stats").innerHTML = [
    `${lastDone ? lastDone.n : 0}<small style="font-size:.45em;opacity:.7"> / ${CONFIG.totalDays}</small>`,
    walked.toLocaleString(),
    Math.max(CONFIG.totalDays - doneCount, 0),
    doneCount,
  ].map((v,i) => `<div class="stat"><b>${v}</b><small>${L.stats[i]}</small></div>`).join("");
  if($("#follow")) $("#follow").innerHTML =
    (CONFIG.instagram ? `<a class="btn" href="${esc(CONFIG.instagram)}" target="_blank" rel="noopener">${L.igBtn}</a>` : "") +
    (CONFIG.facebook ? `<a class="btn" href="${esc(CONFIG.facebook)}" target="_blank" rel="noopener">${L.fbBtn}</a>` : "");
}

// ---- map ----
const OUTLINE = [[121.54,25.30],[121.74,25.15],[121.92,25.12],[121.82,24.86],[121.86,24.59],[121.80,24.45],[121.68,24.20],[121.62,23.98],[121.52,23.60],[121.38,23.10],[121.15,22.76],[120.92,22.36],[120.88,22.05],[120.85,21.90],[120.73,21.93],[120.70,22.03],[120.59,22.37],[120.45,22.46],[120.27,22.60],[120.17,22.90],[120.13,23.00],[120.06,23.15],[120.13,23.38],[120.14,23.58],[120.24,23.78],[120.38,24.08],[120.51,24.28],[120.57,24.40],[120.67,24.50],[120.75,24.62],[120.90,24.78],[120.93,24.86],[121.08,25.04],[121.27,25.12],[121.40,25.18],[121.50,25.28]];
const S = 210, LON0 = 119.98, LAT0 = 25.40, KX = Math.cos(23.6*Math.PI/180);
const P = (lon,lat) => [(lon-LON0)*KX*S, (LAT0-lat)*S];
const W = (122.05-LON0)*KX*S, H = (LAT0-21.80)*S;

function smoothClosed(pts){
  const n = pts.length; let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for(let i=0;i<n;i++){
    const p0=pts[(i-1+n)%n], p1=pts[i], p2=pts[(i+1)%n], p3=pts[(i+2)%n];
    const c1=[p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6];
    const c2=[p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6];
    d += `C${c1.map(v=>v.toFixed(1))} ${c2.map(v=>v.toFixed(1))} ${p2.map(v=>v.toFixed(1))}`;
  }
  return d + "Z";
}
function drawMap(){
  const svg = $("#map");
  svg.setAttribute("viewBox", `-20 -10 ${W+40} ${H+20}`);
  const outline = smoothClosed(OUTLINE.map(p => P(...p)));
  const ridge = [[121.55,24.95],[121.35,24.55],[121.15,24.05],[121.00,23.50],[120.85,22.95],[120.80,22.40]].map(p=>P(...p));
  const route = [CONFIG.start, ...days].map(d => P(d.lon,d.lat));
  const doneIdx = lastDone ? lastDone.n : 0;
  const line = pts => pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+","+p[1].toFixed(1)).join("");
  const here = P((lastDone||CONFIG.start).lon,(lastDone||CONFIG.start).lat);
  const st = P(CONFIG.start.lon, CONFIG.start.lat);

  let g = "";
  // graticule
  for(let lat=22;lat<=25;lat++){ const y=P(120,lat)[1]; g+=`<line x1="-20" x2="${W+20}" y1="${y}" y2="${y}" stroke="rgba(205,176,106,.12)"/><text x="${W+14}" y="${y-4}" font-size="9" fill="rgba(205,176,106,.5)" text-anchor="end" font-family="IBM Plex Mono">${lat}°N</text>`; }
  for(let lon=120.5;lon<=121.5;lon+=.5){ const x=P(lon,24)[0]; g+=`<line y1="-10" y2="${H+10}" x1="${x}" x2="${x}" stroke="rgba(205,176,106,.08)"/>`; }
  g += `<path d="${outline}" fill="rgba(205,176,106,.07)" stroke="var(--gold)" stroke-width="1.6"/>`;
  g += `<path d="${line(ridge)}" fill="none" stroke="rgba(205,176,106,.35)" stroke-width="1" stroke-dasharray="1 5" stroke-linecap="round"/>`;
  const rm = P(121.12,23.75);
  g += `<text x="${rm[0]}" y="${rm[1]}" font-size="11" fill="rgba(205,176,106,.55)" font-family="LXGW WenKai TC" transform="rotate(-62 ${rm[0]} ${rm[1]})" letter-spacing="6">中央山脈</text>`;
  g += `<path d="${line(route.slice(doneIdx))}" fill="none" stroke="var(--gold)" stroke-width="1.6" stroke-dasharray="4 5" opacity=".8"/>`;
  if(doneIdx) g += `<path d="${line(route.slice(0,doneIdx+1))}" fill="none" stroke="var(--verm)" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"/>`;
  days.forEach(d => {
    const [x,y] = P(d.lon,d.lat);
    g += `<g class="dot" data-day="${d.n}" tabindex="0" role="link" aria-label="${esc(L.day(d.n))}: ${esc(L.placeText(d))}"><title>${esc(L.day(d.n))} · ${esc(L.placeText(d))}</title><circle cx="${x}" cy="${y}" r="9" fill="transparent"/><circle cx="${x}" cy="${y}" r="${d.done?3.4:2.6}" fill="${d.done?"var(--verm)":"var(--cover)"}" stroke="${d.done?"#f1e3b8":"var(--gold)"}" stroke-width="1.2"/></g>`;
  });
  // start star
  g += `<g transform="translate(${st[0]},${st[1]})"><path d="M0,-8 L2.2,-2.4 8,-2.4 3.4,1.2 5,7 0,3.6 -5,7 -3.4,1.2 -8,-2.4 -2.2,-2.4Z" fill="#f1e3b8"/></g>`;
  g += `<text x="${st[0]-14}" y="${st[1]+4}" text-anchor="end" font-size="13" fill="#f1e3b8" font-family="LXGW WenKai TC">台中 起點</text>`;
  if(lastDone && !lastDone.finish){
    g += `<circle class="pulse" cx="${here[0]}" cy="${here[1]}" r="7" fill="none" stroke="var(--verm)" stroke-width="2"/>`;
    g += `<circle cx="${here[0]}" cy="${here[1]}" r="6" fill="var(--verm)" stroke="#f1e3b8" stroke-width="2"/>`;
    const left = here[0] > W*0.6;
    g += `<g font-family="IBM Plex Mono, LXGW WenKai TC"><text x="${here[0]+(left?-14:14)}" y="${here[1]-4}" text-anchor="${left?"end":"start"}" font-size="10" fill="var(--gold)" letter-spacing="1.5">${esc(L.now(lastDone.n))}</text><text x="${here[0]+(left?-14:14)}" y="${here[1]+13}" text-anchor="${left?"end":"start"}" font-size="15" fill="#f1e3b8" font-family="LXGW WenKai TC">${esc(L.placeText(lastDone))}</text></g>`;
  }
  svg.innerHTML = g;
  svg.querySelectorAll(".dot").forEach(el => {
    const go = () => {
      const card = document.getElementById("day-"+el.dataset.day);
      card.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"center"});
      card.classList.add("flash"); setTimeout(()=>card.classList.remove("flash"),1600);
    };
    el.addEventListener("click", go);
    el.addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); go(); }});
  });
}

// ---- stamps ----
function stamp(d, opts={}){
  const id = (opts.prefix||"s") + d.n;
  const ink = opts.ink || INKS[(d.n-1)%INKS.length];
  const shape = opts.shape ?? (d.n-1)%5;
  const rot = ((rand(d.n)*2-1)*9).toFixed(1);
  const zh = esc(d.zh), en = esc(d.en).toUpperCase();
  const zhSize = d.zh && d.zh.length>2 ? 22 : 28;
  const dayTxt = opts.top || `DAY ${pad(d.n)}`;
  const bottom = opts.bottom ?? (d.finish ? "FINISH · 完走" : d.rest ? "休息日" : `${d.km} KM`);
  const T = (x,y,s,txt,extra="") => `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" fill="${ink}" ${extra}>${txt}</text>`;
  let body = "";
  const mono = `font-family="IBM Plex Mono" letter-spacing="1.2"`;
  const kai = `font-family="LXGW WenKai TC" font-weight="700"`;
  if(shape===0){
    body = `<circle cx="60" cy="60" r="55" fill="none" stroke="${ink}" stroke-width="3.2"/><circle cx="60" cy="60" r="41" fill="none" stroke="${ink}" stroke-width="1.2"/>
      <path id="${id}t" d="M14,60 A46,46 0 0 1 106,60" fill="none"/><path id="${id}b" d="M10,60 A50,50 0 0 0 110,60" fill="none"/>
      <text font-size="9" fill="${ink}" ${mono}><textPath href="#${id}t" startOffset="50%" text-anchor="middle">${en}</textPath></text>
      <text font-size="9" fill="${ink}" ${mono}><textPath href="#${id}b" startOffset="50%" text-anchor="middle">${bottom}</textPath></text>
      ${T(60,58,zhSize,zh,kai)}${T(60,76,9,dayTxt,mono)}`;
  } else if(shape===1){
    body = `<rect x="8" y="18" width="104" height="84" rx="12" fill="none" stroke="${ink}" stroke-width="3.2"/><rect x="15" y="25" width="90" height="70" rx="7" fill="none" stroke="${ink}" stroke-width="1"/>
      ${T(60,40,8.5,en,mono)}${T(60,68,zhSize,zh,kai)}<line x1="28" x2="92" y1="76" y2="76" stroke="${ink}" stroke-width="1"/>${T(60,88,8.5,`${dayTxt} · ${bottom}`,mono)}`;
  } else if(shape===2){
    const o = [[38,6],[82,6],[114,38],[114,82],[82,114],[38,114],[6,82],[6,38]].map(p=>p.join(",")).join(" ");
    body = `<polygon points="${o}" fill="none" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
      ${T(60,30,9,dayTxt,mono)}<line x1="30" x2="90" y1="36" y2="36" stroke="${ink}"/>${T(60,68,zhSize+2,zh,kai)}${T(60,86,8.5,en,mono)}<line x1="30" x2="90" y1="92" y2="92" stroke="${ink}"/>${T(60,104,8.5,bottom,mono)}`;
  } else if(shape===3){
    body = `<ellipse cx="60" cy="60" rx="56" ry="42" fill="none" stroke="${ink}" stroke-width="3.2"/><ellipse cx="60" cy="60" rx="49" ry="35" fill="none" stroke="${ink}" stroke-width="1" stroke-dasharray="2 3"/>
      ${T(60,42,8.5,dayTxt,mono)}${T(60,67,zhSize,zh,kai)}${T(60,84,8.5,`${en}`,mono)}`;
  } else {
    const t = "M20,16 H100 A8,8 0 0 0 108,24 V96 A8,8 0 0 0 100,104 H20 A8,8 0 0 0 12,96 V24 A8,8 0 0 0 20,16Z";
    body = `<path d="${t}" fill="none" stroke="${ink}" stroke-width="3.2"/>
      <rect x="12" y="16" width="96" height="20" fill="${ink}" opacity=".9"/><text x="60" y="30" font-size="9" text-anchor="middle" fill="#f4f5ef" ${mono}>${dayTxt}</text>
      ${T(60,68,zhSize,zh,kai)}${T(60,84,8.5,en,mono)}${T(60,97,8.5,bottom,mono)}`;
  }
  return `<svg viewBox="0 0 120 120" aria-hidden="true"><g transform="rotate(${rot} 60 60)" filter="url(#ink)" opacity=".92">${body}</g></svg>`;
}

function renderDays(){
  $("#days").innerHTML = days.map(d => {
    const date = dateFor(d.n);
    const links = d.done
      ? (d.reel || d.fb
          ? `<div class="links">${d.reel?(igPermalink(d.reel)?`<button type="button" class="play-reel" data-day="${d.n}">${L.watch}</button>`:`<a href="${esc(d.reel)}" target="_blank" rel="noopener">${L.reelLink}</a>`):""}${d.fb?`<a href="${esc(d.fb)}" target="_blank" rel="noopener">${L.fbBtn}</a>`:""}</div>`
          : `<div class="links"><span class="soon">${L.soon}</span></div>`)
      : "";
    const chip = nextDay && d.n===nextDay.n ? `<span class="chip">${L.next}</span>` : "";
    return `<article class="day ${d.done?"done":"todo"}" id="day-${d.n}">
      ${!d.done ? "" : d.reel && igPermalink(d.reel)
        ? `<button type="button" class="stamp play-reel" data-day="${d.n}" aria-label="${esc(L.watchDay(d))}">${stamp(d)}</button>`
        : `<div class="stamp">${stamp(d)}</div>`}
      <div class="day-meta"><span>${L.day(d.n)}${date?` · ${date}`:""}</span><span>${d.rest ? L.restDay : L.km(d.km)}</span></div>
      <h3>${L.place(d)}</h3>
      <p class="from">${L.from(d)}</p>
      ${d.note?`<p class="note">${esc(d.note)}</p>`:""}
      ${links}${chip}
    </article>`;
  }).join("") + (lastDone && lastDone.finish ? "" : `<p class="tbc">${L.tbc}</p>`);
}

/* ---------- Instagram reel player ----------
   Uses Instagram's official embed script, loaded only the first time someone opens a reel. */
function igPermalink(url){
  try{
    const u = new URL(url);
    if(!/(^|\.)instagram\.com$/.test(u.hostname)) return null;
    const m = u.pathname.match(/^\/(?:[\w.]+\/)?(p|reel|reels|tv)\/([\w-]+)/);
    if(!m) return null;
    return `https://www.instagram.com/${m[1]==="reels"?"reel":m[1]}/${m[2]}/`;
  }catch{ return null; }
}
let igScript;
function loadInstagram(){
  if(igScript) return igScript;
  igScript = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = resolve;
    s.onerror = () => { igScript = null; reject(); };
    document.body.appendChild(s);
  });
  return igScript;
}
const reelDialog = $("#reel-dialog");
let reelTicket = 0;
function openReel(d){
  const link = igPermalink(d.reel);
  $("#reel-title").innerHTML = `${L.day(d.n)} · ${L.place(d)}`;
  $("#reel-out").href = link;
  $("#reel-body").innerHTML = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${esc(link)}" data-instgrm-version="14"
    style="background:#fff;border:0;border-radius:6px;max-width:540px;min-width:280px;width:100%;padding:0;margin:0 auto">
    <a href="${esc(link)}" target="_blank" rel="noopener" style="display:block;padding:40px 16px;text-align:center;color:var(--muted)">${L.loading}</a></blockquote>`;
  reelDialog.showModal();
  const ticket = ++reelTicket;
  const failed = () => {
    if(ticket !== reelTicket || !reelDialog.open) return; // a different reel is open now
    $("#reel-body").innerHTML = `<p style="text-align:center;color:var(--muted);margin:60px 0">${L.reelFail}</p>`;
  };
  loadInstagram().then(() => {
    window.instgrm && window.instgrm.Embeds.process();
    // Instagram's player reports its height once the reel loads; if it never does, show the fallback.
    setTimeout(() => { const f = $("#reel-body iframe"); if(!f || f.offsetHeight < 50) failed(); }, 10000);
  }).catch(failed);
}
function closeReel(){ reelDialog.close(); }
reelDialog.addEventListener("close", () => { $("#reel-body").innerHTML = ""; }); // stops playback
reelDialog.addEventListener("click", e => { if(e.target === reelDialog) closeReel(); }); // tap outside to close
$(".reel-close").addEventListener("click", closeReel);
$("#days").addEventListener("click", e => {
  const b = e.target.closest(".play-reel");
  if(b) openReel(days.find(d => d.n === +b.dataset.day));
});

// ---- language toggle (remembered per visitor; Chinese if nothing saved) ----
function setLang(lang){
  L = I18N[lang] || I18N.zh;
  document.documentElement.lang = L.htmlLang;
  document.title = L.title;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = L[el.dataset.i18n]; });
  const sub = $("#sub"); sub.lang = L.sub[0]; sub.textContent = L.sub[1];
  $("#map").setAttribute("aria-label", L.mapLabel);
  $(".reel-close").setAttribute("aria-label", L.close);
  document.querySelectorAll(".lang-toggle button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  renderCover(); drawMap(); renderDays();
}
document.querySelector(".lang-toggle").addEventListener("click", e => {
  const b = e.target.closest("button[data-lang]");
  if(!b) return;
  setLang(b.dataset.lang);
  try{ localStorage.setItem("walker-lang", b.dataset.lang); }catch{}
});
let savedLang = null;
try{ savedLang = localStorage.getItem("walker-lang"); }catch{}
setLang(savedLang === "en" ? "en" : "zh");
