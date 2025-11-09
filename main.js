(function initChart(){
  const el = document.getElementById('engineChart');
  if(!el) return;
  new Chart(el, {
    type: 'doughnut',
    data: {
      labels: ['Mercedes', 'Ferrari', 'Honda', 'Renault'],
      datasets: [{
        data: [35, 30, 25, 10],
        backgroundColor: ['#00A19B','#DC0000','#236122ff','#FFD400'],
        borderColor: '#0a0a0a',
        borderWidth: 2
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#e5e7eb' } } },
      cutout: '55%'
    }
  });
})();

(function countdown(){
  const d = document.getElementById('d');
  const h = document.getElementById('h');
  const m = document.getElementById('m');
  const s = document.getElementById('s');
  if(!d || !h || !m || !s) return;

  const target = new Date('2025-12-01T18:00:00+04:00').getTime(); 

  function tick(){
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const dd = Math.floor(diff / (1000*60*60*24));
    const hh = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mm = Math.floor((diff % (1000*60*60)) / (1000*60));
    const ss = Math.floor((diff % (1000*60)) / 1000);

    d.textContent = String(dd).padStart(2,'0');
    h.textContent = String(hh).padStart(2,'0');
    m.textContent = String(mm).padStart(2,'0');
    s.textContent = String(ss).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
})();

(function quotes(){
  const el = document.getElementById('quote');
  if(!el) return;
  const data = [
    '“To finish first, first you must finish.” — Juan Manuel Fangio',
    '“When you no longer go for a gap, you’re no longer a racing driver.” — Ayrton Senna',
    '“You cannot overtake 15 cars in sunny weather, but you can when it’s raining.” — Ayrton Senna',
    '“Leave me alone, I know what I’m doing.” — Kimi Räikkönen'
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % data.length;
    el.textContent = data[i];
  }, 8000);
})();

(function weather(){
  const btn = document.getElementById('refreshWeather');
  const box = document.getElementById('weather');
  if(!btn || !box) return;

  async function load(){
    try {
      const lat = 24.47, lon = 54.61;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
      const res = await fetch(url);
      const json = await res.json();
      const t = Math.round(json.current.temperature_2m);
      const w = Math.round(json.current.wind_speed_10m);
      box.querySelector('.wx-temp').textContent = `${t}°C`;
      box.querySelector('.wx-wind').textContent = `Wind: ${w} m/s`;
    } catch (e) {
      box.querySelector('.wx-temp').textContent = `--°C`;
      box.querySelector('.wx-wind').textContent = `Wind: -- m/s`;
      console.warn('Weather fetch failed:', e);
    }
  }

  btn.addEventListener('click', load);
  load();
})();

const tracks = [
  {id:1,country:'Australia',city:'Melbourne',date:'14–16 Mar'},
  {id:2,country:'China',city:'Shanghai',date:'21–23 Mar'},
  {id:3,country:'Japan',city:'Suzuka',date:'4–6 Apr'},
  {id:4,country:'Bahrain',city:'Sakhir',date:'11–13 Apr'},
  {id:5,country:'Saudi Arabia',city:'Jeddah',date:'18–20 Apr'},
  {id:6,country:'USA',city:'Miami',date:'2–4 May'},
  {id:7,country:'Italy',city:'Imola',date:'16–18 May'},
  {id:8,country:'Monaco',city:'Monaco',date:'23–25 May'},
  {id:9,country:'Spain',city:'Barcelona',date:'30 May–1 Jun'},
  {id:10,country:'Canada',city:'Montreal',date:'13–15 Jun'},
  {id:11,country:'Austria',city:'Spielberg',date:'27–29 Jun'},
  {id:12,country:'Britain',city:'Silverstone',date:'4–6 Jul'},
  {id:13,country:'Belgium',city:'Spa',date:'25–27 Jul'},
  {id:14,country:'Hungary',city:'Budapest',date:'1–3 Aug'},
  {id:15,country:'Netherlands',city:'Zandvoort',date:'29–31 Aug'},
  {id:16,country:'Italy',city:'Monza',date:'5–7 Sep'},
  {id:17,country:'Azerbaijan',city:'Baku',date:'19–21 Sep'},
  {id:18,country:'Singapore',city:'Singapore',date:'3–5 Oct'},
  {id:19,country:'USA',city:'Austin',date:'17–19 Oct'},
  {id:20,country:'Mexico',city:'Mexico City',date:'24–26 Oct'},
  {id:21,country:'Brazil',city:'São Paulo',date:'7–9 Nov'},
  {id:22,country:'USA',city:'Las Vegas',date:'20–22 Nov'},
  {id:23,country:'Qatar',city:'Lusail',date:'28–30 Nov'},
  {id:24,country:'Abu Dhabi',city:'Yas Marina',date:'5–7 Dec'}
];

const podiums = {
  1:{p1:'Max Verstappen',p2:'Charles Leclerc',p3:'Lando Norris'},
  2:{p1:'Charles Leclerc',p2:'Max Verstappen',p3:'Carlos Sainz'},
  3:{p1:'Max Verstappen',p2:'Oscar Piastri',p3:'Sergio Pérez'},
  4:{p1:'Fernando Alonso',p2:'Max Verstappen',p3:'Charles Leclerc'},
  5:{p1:'Max Verstappen',p2:'Sergio Pérez',p3:'Charles Leclerc'},
  6:{p1:'Lando Norris',p2:'Max Verstappen',p3:'Oscar Piastri'},
  7:{p1:'Max Verstappen',p2:'Charles Leclerc',p3:'Carlos Sainz'},
  8:{p1:'Charles Leclerc',p2:'Oscar Piastri',p3:'Carlos Sainz'},
  9:{p1:'Max Verstappen',p2:'Lando Norris',p3:'Carlos Sainz'},
  10:{p1:'George Russell',p2:'Lewis Hamilton',p3:'Max Verstappen'},
  11:{p1:'Max Verstappen',p2:'Lando Norris',p3:'Oscar Piastri'},
  12:{p1:'Lewis Hamilton',p2:'Lando Norris',p3:'George Russell'},
  13:{p1:'Max Verstappen',p2:'George Russell',p3:'Oscar Piastri'},
  14:{p1:'Charles Leclerc',p2:'Carlos Sainz',p3:'Max Verstappen'},
  15:{p1:'Max Verstappen',p2:'Lando Norris',p3:'Charles Leclerc'},
  16:{p1:'Carlos Sainz',p2:'Charles Leclerc',p3:'Max Verstappen'},
  17:{p1:'Sergio Pérez',p2:'Max Verstappen',p3:'Fernando Alonso'},
  18:{p1:'Lando Norris',p2:'Charles Leclerc',p3:'Carlos Sainz'},
  19:{p1:'Max Verstappen',p2:'Oscar Piastri',p3:'Lando Norris'},
  20:{p1:'Sergio Pérez',p2:'Charles Leclerc',p3:'Max Verstappen'},
  21:{p1:'Max Verstappen',p2:'Lando Norris',p3:'Lewis Hamilton'},
  22:{p1:'Charles Leclerc',p2:'Carlos Sainz',p3:'Max Verstappen'},
  23:{p1:'Max Verstappen',p2:'George Russell',p3:'Lando Norris'},
  24:{p1:'Max Verstappen',p2:'Charles Leclerc',p3:'Lando Norris'}
};

const grid = document.getElementById('grid');

const imgPath = id => `img${id}.png`;

function cardTemplate(t){
  return `
    <article class="track-card" data-id="${t.id}">
      <img class="track-thumb"
           src="${imgPath(t.id)}"
           alt="${t.country} – ${t.city}">
      <div class="track-body">
        <div class="track-title">
          <h3 class="font-orbitron">${String(t.id).padStart(2,'0')}. ${t.country}</h3>
          <span class="flag">${t.city}</span>
        </div>
        <div class="meta">${t.date}</div>
        <div class="meta podium-mini">🏆 Tap for full podium</div>
      </div>
    </article>`;
}
grid.innerHTML = tracks.map(cardTemplate).join('');

const modal = document.getElementById('modal');
const mImg = document.getElementById('mImg');
const mTitle = document.getElementById('mTitle');
const mDate = document.getElementById('mDate');
const mInfo = document.getElementById('mInfo');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');
const closeBtn = document.getElementById('closeBtn');

function openModal(track){
  mImg.onload = null;
  mImg.onerror = () => { mImg.src = FALLBACK; };
  mImg.src = imgPath(track.id);

  mTitle.textContent = `${track.country} — ${track.city}`;
  mDate.textContent  = track.date;
  mInfo.textContent  = `Round ${track.id}. Circuit preview for ${track.city}. Click outside to close.`;

  const pod = podiums[track.id] || {p1:'—',p2:'—',p3:'—'};
  p1.textContent = pod.p1; p2.textContent = pod.p2; p3.textContent = pod.p3;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}
grid.addEventListener('click',e=>{
  const card=e.target.closest('.track-card');
  if(!card)return;
  const id=Number(card.dataset.id);
  const t=tracks.find(x=>x.id===id);
  if(t)openModal(t);
});
closeBtn.addEventListener('click',closeModal);
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

