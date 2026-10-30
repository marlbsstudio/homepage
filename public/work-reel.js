/* MARLBS — portfolio reel, case study view and cinematic section reveals */
(function(){
'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v, ease=t=>1-Math.pow(1-t,3);

/* ===== Project content: a short peek, not the full story ===== */
const CASES={
  mobility:{title:'Traffic control',kick:'Abu Dhabi Mobility · via Conceptualize',
    intro:'A control-room portal where operators watch traffic events, signal equipment and cameras across Abu Dhabi, and act on them from one screen.',
    facts:[['Client','Abu Dhabi Mobility'],['Year','2023 to 2024'],['Role','UX and UI design'],['Platform','Web, control room']],
    challenge:'Alarms, CCTV and equipment status lived in separate tools. In a live incident, operators lost time switching between them.',
    design:'One tabbed workspace: severity trends, a live city map, equipment health and an event table. A dark interface built for long shifts and quick scanning.',
    tags:['Dashboards','Live map','Alarms','Dark UI'],shot:'A representative recreation. The real screens are confidential.'},
  aurora:{title:'Sales & stock',kick:'Beverage distribution · Concept',
    intro:'The morning view for a sales director at a beverage distributor: revenue, returns, production, and the stock that needs reordering today.',
    facts:[['Type','Product concept'],['Role','UX and UI design'],['Users','Sales directors, admins'],['Languages','English and Arabic']],
    challenge:'Sales and stock data sat in different reports, so low-stock problems surfaced after customers had already felt them.',
    design:'A KPI row, sales against purchases, top sellers beside low-stock alerts, and recent transactions. Delivered as wireframes, high fidelity and a right-to-left Arabic version.',
    tags:['Dashboard','RTL','Wireframes','High fidelity'],shot:'Sales director dashboard. Figures blurred.'},
  nadirah:{title:'Entity intelligence',kick:'Government platform · Concept',
    intro:'An entity profile for a government trade and investment team, designed in Arabic first, with an AI analyst that answers questions about the data.',
    facts:[['Type','Product concept'],['Role','UX and UI design'],['Languages','Arabic and English'],['AI','Analyst chat panel']],
    challenge:'Analysts pieced together trade flows, risks, contacts and agreements from many sources before they could brief anyone.',
    design:'Right-to-left from the start: KPI cards with targets, risk indicators, data-source health, contacts and agreements, plus a chat panel that queries the database in plain language.',
    tags:['RTL first','AI assistant','Government','Data UX'],shot:'Arabic entity profile. Details blurred.'},
  acasa:{title:'Acasa',kick:'Acasa.ae · Luxury real estate',
    intro:'A calmer way to browse Dubai’s high-end homes: editorial photography, refined serif type, and search right where you start.',
    facts:[['Client','Acasa.ae'],['Role','UX and UI design'],['Pages','8 templates'],['Platform','Desktop and mobile']],
    challenge:'Luxury buyers expect the website to feel as considered as the property, while still finding a listing in a few taps.',
    design:'Home, all properties, listing and project details, sell your property, developers, about and contact, each with a mobile version and a search bar that leads with Dubai’s key areas.',
    tags:['Website','Real estate','Responsive'],shot:'Homepage hero and listing search.'},
  ownaspace:{title:'Own A Space',kick:'Own A Space · Interior studio',
    intro:'A website for an interior studio that lets the work speak first, opening on a full-screen film of their spaces.',
    facts:[['Client','Own A Space Interiors'],['Role','UX and UI design'],['Pages','6 templates'],['Platform','Desktop and mobile']],
    challenge:'The studio’s projects are atmospheric, and still photos alone didn’t carry the feeling of walking through them.',
    design:'A video hero, then services, projects and project detail pages built around large imagery and quiet typography, with matching mobile layouts.',
    tags:['Website','Interiors','Video hero'],shot:'Homepage with video hero.'},
  quicksolve:{title:'Quick Solve',kick:'Quick Solve · PRO services',
    intro:'A brand for a PRO services company: an interlocking S that reads as two hands solving the paperwork together.',
    facts:[['Client','Quick Solve'],['Role','Brand identity'],['Deliverables','Logo, cards, brochure, website'],['Market','UAE']],
    challenge:'PRO services look the same on every street. The brand had to feel trustworthy and quick without the usual government-blue clichés.',
    design:'A geometric S mark in brick red, a wide-spaced wordmark, and stationery in cream and deep navy, then carried into a brochure and website.',
    tags:['Logo','Stationery','Brand'],shot:'Logo and business cards. Contact details blurred.'}
};
const ORDER=Object.keys(CASES);

/* ===== Reel: cards rise in from the bottom as they reach the centre ===== */
const cards=[...document.querySelectorAll('.rcard')];
let ticking=false;
function update(){
  ticking=false; const vh=innerHeight;
  for(const c of cards){
    const frame=c.querySelector('.rframe'), word=c.querySelector('.rword'), cap=c.querySelector('.rcap');
    const r=frame.getBoundingClientRect();
    const enter=clamp((vh-r.top)/(vh*.5+r.height*.5));
    const pass=clamp((vh-r.top)/(vh+r.height));
    const off=clamp(((r.top+r.height/2)-vh/2)/vh,-1,1);
    const k=reduce?1:ease(enter).toFixed(3);
    frame.style.setProperty('--in',k); cap.style.setProperty('--in',k);
    frame.style.setProperty('--p',pass.toFixed(3));
    c.style.setProperty('--glow',(1-Math.min(1,Math.abs(off)*2)).toFixed(3));
    if(!reduce){ word.style.setProperty('--wy',(off*-140).toFixed(1)+'px'); word.style.setProperty('--wo',(1-Math.abs(off)*1.1).toFixed(3)); }
  }
}
const req=()=>{ if(!ticking){ticking=true;requestAnimationFrame(update);} };
if(cards.length){ addEventListener('scroll',req,{passive:true}); addEventListener('resize',req); update(); }

/* the site turns to paper while the portfolio teaser fills the screen; the portfolio page is always paper */
const html=document.documentElement, pfPage=document.querySelector('.pf-page'), teaser=document.querySelector('.teaser');
if(pfPage) html.classList.add('paper');   // the portfolio page is light; the homepage teaser stays dark
if(teaser) new IntersectionObserver((es,o)=>{ if(es[0].isIntersecting){teaser.classList.add('in');o.disconnect();} },{threshold:.3}).observe(teaser);

/* white wipe between the homepage and the portfolio page */
document.querySelectorAll('a[data-wipe]').forEach(a=>a.addEventListener('click',e=>{
  if(e.metaKey||e.ctrlKey||e.shiftKey||reduce) return;
  const wipe=document.querySelector('.pg-wipe'); if(!wipe) return;
  e.preventDefault(); wipe.style.animation='none'; wipe.style.transform='translateY(100%)';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{wipe.style.transform='none';}));
  setTimeout(()=>{location.href=a.href;},600);
}));

/* ===== Case study view ===== */
const ov=document.getElementById('caseOv'), sc=document.getElementById('csScroll'), closeBtn=document.getElementById('csClose');
if(!ov) return;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let current=null, lastFocus=null, io=null;

function render(key){
  const c=CASES[key], next=ORDER[(ORDER.indexOf(key)+1)%ORDER.length], n=CASES[next];
  const letters=c.title.split(' ').map(w=>'<span class="w">'+[...w].map(ch=>`<span class="ch" style="--o:${(.35+Math.random()*.65).toFixed(2)}">${esc(ch)}</span>`).join('')+'</span>').join('');
  sc.innerHTML=`
  <header class="cs-hero"><img src="/work/${key}-wide.webp" alt="">
    <span class="cs-kick">${esc(c.kick)}</span>
    <h2 class="cs-title" id="csTitle" aria-label="${esc(c.title)}">${letters}</h2>
    <span class="cs-hint"><i></i>Scroll to explore</span></header>
  <div class="cs-body">
    <div class="cs-intro rv2"><p>${esc(c.intro)}</p><dl class="cs-facts">${c.facts.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl></div>
    <figure class="cs-shot rv2"><img src="/work/${key}-wide.webp" alt="${esc(c.shot)}" loading="lazy"><figcaption>${esc(c.shot)}</figcaption></figure>
    <div class="cs-cols rv2"><div><h3>The problem</h3><p>${esc(c.challenge)}</p></div><div><h3>What I designed</h3><p>${esc(c.design)}</p><div class="cs-tags">${c.tags.map(t=>'<span>'+esc(t)+'</span>').join('')}</div></div></div>
  </div>
  <button class="cs-next" data-next="${next}"><img src="/work/${next}-wide.webp" alt=""><small>Next project</small><b>${esc(n.title)}</b><em>Open</em></button>`;
  sc.scrollTop=0; current=key;
  // letters rise in, out of order, like the madzonga titles
  const title=sc.querySelector('.cs-title'), chs=[...title.querySelectorAll('.ch')];
  chs.forEach(ch=>{ch.style.transitionDelay=(reduce?0:(150+Math.random()*700))+'ms';});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{title.classList.add('on'); setTimeout(()=>chs.forEach(ch=>ch.classList.add('done')),reduce?0:1900);}));
  // reveal body blocks as they scroll into the view
  if(io) io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{root:sc,threshold:.15});
  sc.querySelectorAll('.rv2').forEach(el=>io.observe(el));
  sc.querySelector('.cs-next').addEventListener('click',e=>{
    const k=e.currentTarget.dataset.next; sc.style.transition='opacity .45s'; sc.style.opacity='0';
    setTimeout(()=>{render(k); sc.style.opacity='1';},reduce?0:450);
  });
}
// the hero image drifts and the title lifts away as you scroll into the body
sc.addEventListener('scroll',()=>{const h=sc.querySelector('.cs-hero'); if(!h) return; h.style.setProperty('--hz',clamp(sc.scrollTop/innerHeight).toFixed(3));},{passive:true});

function open(key,frame){
  lastFocus=document.activeElement;
  document.body.style.overflow='hidden';
  const img=frame&&frame.querySelector('img');
  const show=()=>{ ov.hidden=false; render(key); requestAnimationFrame(()=>{ov.classList.add('open'); closeBtn.focus({preventScroll:true});}); };
  if(!img||reduce){ show(); return; }
  // the card's screen grows to fill the window, then the case study takes over
  const r=frame.getBoundingClientRect(), fly=document.createElement('img');
  fly.src=`/work/${key}-wide.webp`; fly.className='cs-fly'; fly.alt='';
  Object.assign(fly.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',borderRadius:getComputedStyle(frame).borderRadius,filter:'brightness(1)'});
  document.body.append(fly);
  requestAnimationFrame(()=>requestAnimationFrame(()=>Object.assign(fly.style,{left:'0px',top:'0px',width:innerWidth+'px',height:innerHeight+'px',borderRadius:'0px',filter:'brightness(.45)'})));
  setTimeout(()=>{ show(); setTimeout(()=>fly.remove(),500); },900);
}
function close(){
  ov.classList.remove('open'); document.body.style.overflow='';
  setTimeout(()=>{ov.hidden=true; sc.innerHTML=''; current=null;},reduce?0:500);
  if(lastFocus) lastFocus.focus({preventScroll:true});
}
document.querySelectorAll('.rframe[data-case]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.case,b)));
closeBtn.addEventListener('click',close);
const deep=location.hash.slice(1); if(CASES[deep]) setTimeout(()=>open(deep,null),400);
addEventListener('keydown',e=>{ if(e.key==='Escape'&&current) close(); });
})();

/* ===== Vertical sections: each block glides up out of a soft blur as it enters ===== */
(function(){
'use strict';
if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)) return;
const sel=['#about .tag','#about .reveal','#about .facts','#about .cut','.marquee','#now .now-head','#now .pipe','#now .ppanel','#now .with',
  '.reel-head','#work .whead','#work .cases','.ledger-head','#toolbox .tag','#toolbox h2','#toolbox .tool-grid','#contact h2','#contact .mail','#contact .phones','#contact .flinks'];
const els=sel.flatMap(s=>[...document.querySelectorAll(s)]);
const vh=innerHeight;
els.forEach(el=>{ if(el.getBoundingClientRect().top>vh*.9) el.classList.add('rv'); });
document.documentElement.classList.add('cine');
const io=new IntersectionObserver(es=>{ let n=0; es.forEach(e=>{ if(e.isIntersecting){ e.target.style.transitionDelay=(n++*90)+'ms'; e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
els.forEach(el=>{ if(el.classList.contains('rv')) io.observe(el); });
})();
