/* MARLBS — Mustafa Kapadiya portfolio behaviour */
(function(){
'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v, smooth=t=>t*t*(3-2*t);
const EMAIL='mhkapadiya@gmail.com';

/* MENU */
const menu=document.getElementById('menu'), burger=document.getElementById('burger');
const setMenu=o=>{menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';if(o)menu.querySelector('nav a').focus();else burger.focus();};
burger.onclick=()=>setMenu(true); document.getElementById('menuClose').onclick=()=>setMenu(false);
menu.querySelectorAll('nav a').forEach((a,i)=>{a.style.transitionDelay=(i*45)+'ms';a.addEventListener('click',()=>setMenu(false));});

/* ===== CONTINUOUS BACKGROUND ===== */
const bgEl=document.getElementById('bg'), story=document.getElementById('story');
const CH_BG=['#0C0C0B','#0C0C0B'];
let STOPS=[];
const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
function buildStops(){
  STOPS=[]; const span=story.offsetHeight-innerHeight;
  CH_BG.forEach((c,j)=>STOPS.push([story.offsetTop+span*j/(CH_BG.length-1),hex(c)]));
  document.querySelectorAll('[data-bg]').forEach(s=>STOPS.push([s.getBoundingClientRect().top+scrollY-innerHeight*.35,hex(s.dataset.bg)]));
  STOPS.sort((a,b)=>a[0]-b[0]);
}
function paintBg(){
  if(!STOPS.length)return; const y=scrollY; let a=STOPS[0], b=STOPS[STOPS.length-1];
  for(let i=0;i<STOPS.length-1;i++){ if(y>=STOPS[i][0]&&y<STOPS[i+1][0]){a=STOPS[i];b=STOPS[i+1];break;} }
  if(y<STOPS[0][0]) b=a; if(y>=STOPS[STOPS.length-1][0]) a=b;
  const t=a===b?0:smooth(clamp((y-a[0])/(b[0]-a[0])));
  const c=a[1].map((v,i)=>Math.round(v+(b[1][i]-v)*t));
  bgEl.style.backgroundColor=`rgb(${c})`;
}

/* ===== JOURNEY REEL =====
   One chapter per screen and one chapter per scroll gesture. The strip glides on a soft spring;
   the chapter you leave dissolves into sand; a lens turns headings to outline under the cursor;
   a slow black-and-white star field drifts behind it all. Red is kept for content markers. */
const stageEl=document.getElementById('stage'), trackEl=document.getElementById('htrack'), chapsEl=document.getElementById('chaps');
const fillEl=document.getElementById('chapsFill'), periodEl=document.getElementById('period'), heroWord=document.getElementById('heroWord');
const hpanels=[...trackEl.querySelectorAll('.hpanel')], NP=hpanels.length;
const easeOut=t=>1-Math.pow(1-t,4), easeIO=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
let vw=innerWidth, stepH=innerHeight, idx=0, curX=0, toX=0, velX=0, railBox=null, chaps=[];

/* shared content width: every section, the reel, the hero and the footer use the same column */
const sideW=()=>Math.max(Math.min(56,Math.max(20,innerWidth*.04)),(innerWidth-1180)/2);
const brandW=()=>innerWidth-2*sideW();

/* ---------- text: masked lines (Gray), blur letters (Daniel), lens layers ---------- */
function splitLines(el){
  if(!el.dataset.src) el.dataset.src=el.innerHTML;
  el.innerHTML=el.dataset.src;
  const dots=[...el.querySelectorAll('.o-dot')].map(n=>{const h=n.outerHTML; n.remove(); return h;}).join('');
  const words=el.textContent.trim().split(/\s+/);
  el.innerHTML=words.map(w=>'<span class="wd">'+w+'</span>').join(' ');
  const lines=[]; let top=null;
  el.querySelectorAll('.wd').forEach(w=>{ if(w.offsetTop!==top){top=w.offsetTop;lines.push([]);} lines[lines.length-1].push(w.textContent); });
  const html=lines.map((l,i)=>`<span class="line-mask"><span class="line" style="--i:${i}">${l.join(' ')}${i===lines.length-1?dots:''}</span></span>`).join('');
  el.innerHTML=el.matches('.t-m,.t-l')?`<span class="lz-b">${html}</span><span class="lz-o" aria-hidden="true">${html}</span>`:html;
}
function splitChars(el){
  let n=0; const walk=node=>{[...node.childNodes].forEach(c=>{
    if(c.nodeType===3){ const f=document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(part=>{ if(!part) return; if(/^\s+$/.test(part)){f.append(part);return;}
        const w=document.createElement('span'); w.className='bw';
        [...part].forEach(ch=>{const s=document.createElement('span'); s.className='bc'; s.style.setProperty('--c',n++); s.textContent=ch; w.append(s);}); f.append(w);});
      c.replaceWith(f);} else if(c.nodeType===1) walk(c); });};
  walk(el);
}
const splits=[...trackEl.querySelectorAll('.split')];
document.querySelectorAll('.blur-in').forEach(splitChars);
const hwT=heroWord.querySelector('.hw-t'), hwO=document.createElement('span');
hwO.className='hw-o'; hwO.setAttribute('aria-hidden','true'); hwO.textContent=hwT.textContent; heroWord.append(hwO);
splitChars(hwT);
trackEl.querySelectorAll('.set-year').forEach(y=>{const t=y.textContent; y.innerHTML=`<span class="lz-b">${t}</span><span class="lz-o">${t}</span>`;});

function fitHero(){
  heroWord.style.fontSize='100px';
  const w=heroWord.scrollWidth||1, fs=Math.min(100*brandW()/w, innerHeight*.5);
  heroWord.style.fontSize=fs+'px';
  const fw=document.getElementById('wordmark'); if(fw) fw.style.fontSize=fs+'px';  /* footer MARLBS matches the hero exactly */
}

/* ---------- red chapter rail ---------- */
function buildRail(){
  chapsEl.querySelectorAll('button').forEach(b=>b.remove()); chapsEl.style.setProperty('--n',NP-1);
  chaps=hpanels.map((p,i)=>{const b=document.createElement('button'); b.type='button'; b.style.setProperty('--i',i);
    b.innerHTML='<i></i><b>'+p.dataset.label+'</b>'; b.setAttribute('aria-label','Go to '+p.dataset.label);
    b.addEventListener('click',()=>goPanel(i)); chapsEl.append(b); return b;});
}
chapsEl.addEventListener('pointermove',e=>{ if(reduce) return;
  chaps.forEach(b=>{const r=b.getBoundingClientRect(), d=Math.abs(e.clientX-(r.left+r.width/2)); b.style.setProperty('--mag',Math.max(0,1-d/140).toFixed(3));});});
chapsEl.addEventListener('pointerleave',()=>chaps.forEach(b=>b.style.setProperty('--mag',0)));

/* ---------- layout + index ---------- */
function layoutReel(){
  vw=innerWidth; stepH=Math.round(innerHeight*.85);
  document.documentElement.style.setProperty('--side',sideW()+'px');
  splits.forEach(splitLines); fitHero();
  story.style.height=(innerHeight+stepH*(NP-1)+Math.round(innerHeight*.55))+'px';
  const sr=stageEl.getBoundingClientRect(), rb=chapsEl.querySelector('.chaps-line').getBoundingClientRect();
  railBox={left:rb.left-sr.left,top:rb.top-sr.top,width:rb.width};
  idx=indexFromScroll(); curX=toX=idx*vw; velX=0; slideAt=0; dusts.length=0; hpanels.forEach(p=>p.classList.remove('dusted'));
  setActive(idx,true); paintReel();
}
const indexFromScroll=()=>Math.max(0,Math.min(NP-1,Math.round(-story.getBoundingClientRect().top/stepH)));
const chapterTop=i=>story.offsetTop+i*stepH;
function goPanel(i){ scrollTo({top:chapterTop(i),behavior:'auto'}); onIndex(); }

let slideAt=0, slideTo=0;
function railTo(i){ chaps.forEach((b,j)=>{b.setAttribute('aria-current',j===i);b.classList.toggle('done',j<i);}); fillEl.style.width=(i/(NP-1)*100)+'%'; }
function setActive(i,force){
  const p=hpanels[i]; p.classList.remove('is-rearm','dusted'); p.classList.add('is-in');
  dusts.forEach(d=>{ if(d.panel===p) d.dead=true; });
  chaps.forEach((b,j)=>{b.setAttribute('aria-current',j===i);b.classList.toggle('done',j<i);});
  fillEl.style.width=(i/(NP-1)*100)+'%';
  if(force) hpanels.forEach((q,j)=>{ if(j!==i){q.classList.add('is-rearm');q.classList.remove('is-in');} });
}
function onIndex(){
  const i=indexFromScroll(); if(i===idx) return;
  const old=idx; idx=i;
  // the chapter we leave turns to sand where it stands, then the strip slides
  const dusting=!reduce&&Math.abs(old*vw-curX)<vw*.5;
  if(dusting) dust(hpanels[old], i>old?1:-1);
  if(reduce){toX=curX=i*vw;velX=0;paintReel();setActive(i);return;}
  railTo(i); slideTo=i*vw; slideAt=performance.now()+(dusting?260:0);
}
function paintReel(){
  trackEl.style.transform=`translate3d(${(-curX).toFixed(2)}px,0,0)`;
  hpanels.forEach((p,j)=>{ if(j!==idx&&Math.abs(j*vw-curX)>=vw*.98&&p.classList.contains('is-in')){p.classList.add('is-rearm');p.classList.remove('is-in');} });
  // the red marker rides the rail: it sits on the active chapter and travels with the strip
  const p=NP>1?curX/((NP-1)*vw):0;
  periodEl.style.setProperty('--ps','12px');
  periodEl.style.transform=`translate3d(${(railBox.left+railBox.width*p).toFixed(2)}px,${railBox.top.toFixed(2)}px,0)`;
}

/* ---------- one chapter per gesture: wheel, touch and keys ---------- */
let lockUntil=0, lastWheel=0, lastAbs=0, wheelAcc=0, wheelDir=0, gestureUsed=false, touchY=null;
const pinned=()=>{const r=story.getBoundingClientRect(); return r.top<=1&&r.bottom>=innerHeight-1;};
function stepBy(dir){
  const n=Math.max(0,Math.min(NP-1,idx+dir)); if(n===idx) return false;
  lockUntil=performance.now()+(reduce?150:950); goPanel(n); return true;
}
// at the ends the page scrolls on normally: up past Hello, down past Worldwide
const passThrough=dir=>(dir<0&&idx===0&&-story.getBoundingClientRect().top<=stepH*.5)||(dir>0&&idx===NP-1);
addEventListener('wheel',e=>{
  if(!pinned()||Math.abs(e.deltaY)<Math.abs(e.deltaX)) return;
  const dir=Math.sign(e.deltaY); if(!dir||passThrough(dir)) return;
  e.preventDefault();
  // one gesture = one chapter: a gesture ends after a short pause, or when a new push is clearly stronger
  const now=e.timeStamp||performance.now(), abs=Math.abs(e.deltaY), fresh=now-lastWheel>180||(abs>lastAbs*1.8+8&&now>lockUntil)||dir!==wheelDir;
  lastWheel=now; lastAbs=abs; wheelDir=dir;
  if(fresh){ gestureUsed=false; wheelAcc=0; }
  if(gestureUsed||now<lockUntil) return;
  wheelAcc+=e.deltaY;
  if(Math.abs(wheelAcc)>=(e.deltaMode?1:24)){ wheelAcc=0; if(stepBy(dir)) gestureUsed=true; }
},{passive:false});
addEventListener('touchstart',e=>{touchY=e.touches[0].clientY;},{passive:true});
addEventListener('touchmove',e=>{
  if(touchY===null||!pinned()) return; const dy=touchY-e.touches[0].clientY; const dir=Math.sign(dy);
  if(!dir||passThrough(dir)) return; e.preventDefault();
  if(Math.abs(dy)>42&&performance.now()>=lockUntil){ stepBy(dir); touchY=null; }
},{passive:false});
addEventListener('touchend',()=>{touchY=null;},{passive:true});
addEventListener('keydown',e=>{
  if(!pinned()||/input|textarea|select/i.test(document.activeElement.tagName)||document.querySelector('.menu.open,.scrim.open')) return;
  const map={ArrowDown:1,PageDown:1,' ':1,ArrowUp:-1,PageUp:-1}; const dir=map[e.key]*(e.shiftKey&&e.key===' '?-1:1);
  if(!dir||passThrough(dir)) return; e.preventDefault(); if(performance.now()>=lockUntil) stepBy(dir);
});

/* ---------- canvases: stars (drawn smooth) and sand (pixel buffer) ---------- */
const sc=document.getElementById('stars'), sx=sc.getContext('2d');
const sandC=document.createElement('canvas'); sandC.className='sand'; sandC.setAttribute('aria-hidden','true'); stageEl.insertBefore(sandC,trackEl);
const sg=sandC.getContext('2d');
const small=matchMedia('(max-width:760px)').matches, SN=small?170:380;
let SW=0,SH=0,SD=1, stars=[], mx=-1e4,my=-1e4, ox=-1e4,oy=-1e4, mOn=false, trail=[], lastX=0, vel=0, time=0, sandImg=null, sandBuf=null, sandLive=false;
const glow=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),r=g.createRadialGradient(32,32,0,32,32,32);
  r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.18,'rgba(255,255,255,.55)');r.addColorStop(.5,'rgba(255,255,255,.12)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64);return c;})();
function sizeStars(){
  SD=Math.min(devicePixelRatio||1,1.75); SW=stageEl.clientWidth; SH=stageEl.clientHeight;
  sc.width=SW*SD; sc.height=SH*SD; sx.setTransform(SD,0,0,SD,0,0);
  sandC.width=SW; sandC.height=SH; sandImg=sg.createImageData(SW,SH); sandBuf=new Uint32Array(sandImg.data.buffer);
  if(!stars.length) for(let i=0;i<SN;i++){const z=Math.pow(Math.random(),1.8), a=Math.random()*6.283, sp=1.5+Math.random()*5;
    stars.push({x:Math.random(),y:Math.random(),z, r:.35+z*1.5, a:.18+z*.6, tw:Math.random()*6.28, bokeh:Math.random()<.035, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp*.6, ph:Math.random()*100});}
}
stageEl.addEventListener('pointermove',e=>{const r=stageEl.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; if(!mOn){ox=mx;oy=my;} mOn=e.pointerType==='mouse';},{passive:true});
stageEl.addEventListener('pointerleave',()=>{mOn=false;});
const wrap=(v,m)=>((v%m)+m)%m;
function drawStars(){
  sx.clearRect(0,0,SW,SH);
  vel+=((curX-lastX)-vel)*.15; lastX=curX;
  const streak=reduce?0:Math.min(34,Math.abs(vel)*.6), dir=Math.sign(vel)||1, span=SW*1.6;
  for(const s of stars){
    // every star wanders very slowly on its own, and deeper stars slide less as the strip moves
    const t=reduce?0:time;
    let x=wrap(s.x*span+s.vx*t+Math.sin(t*.07+s.ph)*12-curX*(.08+s.z*.5),span)-SW*.3;
    let y=wrap(s.y*SH+s.vy*t+Math.cos(t*.06+s.ph)*10,SH+40)-20;
    let a=s.a*(.72+.28*Math.sin(t*1.1+s.tw*3));
    if(mOn){const ddx=x-ox, ddy=y-oy, d2=ddx*ddx+ddy*ddy; if(d2<26000){const d=Math.sqrt(d2)||1, f=(1-d/161); x+=ddx/d*f*18*s.z; y+=ddy/d*f*18*s.z; a=Math.min(1,a+f*.8);}}
    if(s.bokeh){const R=10+s.z*26; sx.globalAlpha=.07+s.z*.06; sx.drawImage(glow,x-R,y-R,R*2,R*2); continue;}
    sx.globalAlpha=a;
    if(streak>2){const L=streak*(.2+s.z); sx.strokeStyle='#fff'; sx.lineWidth=s.r; sx.beginPath(); sx.moveTo(x,y); sx.lineTo(x+L*dir,y); sx.stroke();}
    else {sx.fillStyle='#fff'; sx.beginPath(); sx.arc(x,y,s.r,0,6.283); sx.fill();}
  }
  if(mOn&&!reduce){
    ox+=(mx-ox)*.18; oy+=(my-oy)*.18; trail.unshift([ox,oy]); if(trail.length>18) trail.pop();
    sx.globalCompositeOperation='lighter';
    trail.forEach((p,i)=>{const f=1-i/trail.length, R=(4+f*14); sx.globalAlpha=f*f*.35; sx.drawImage(glow,p[0]-R,p[1]-R,R*2,R*2);});
    sx.globalAlpha=.95; sx.drawImage(glow,ox-16,oy-16,32,32); sx.globalCompositeOperation='source-over';
  } else if(trail.length){ trail.pop(); }
  sx.globalAlpha=1;
}

/* ---------- sand: rasterise the chapter you leave, then let it blow away ---------- */
const dusts=[];
function rasterPanel(panel){
  const W=SW,H=SH, c=document.createElement('canvas'); c.width=W; c.height=H; const g=c.getContext('2d'); g.textBaseline='alphabetic';
  const sr=stageEl.getBoundingClientRect();
  // solid shapes first (red full stops, the CTA pill)
  panel.querySelectorAll('.o-dot,.outro-cta').forEach(el=>{const r=el.getBoundingClientRect(), cs=getComputedStyle(el); if(!r.width) return;
    g.fillStyle=cs.backgroundColor; g.beginPath(); g.roundRect?g.roundRect(r.left-sr.left,r.top-sr.top,r.width,r.height,Math.min(r.height/2,999)):g.rect(r.left-sr.left,r.top-sr.top,r.width,r.height); g.fill();});
  const tw=document.createTreeWalker(panel,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
    if(!n.textContent.trim()) return NodeFilter.FILTER_REJECT;
    const p=n.parentElement; if(!p||p.closest('.lz-o,.hw-o,.sr')) return NodeFilter.FILTER_REJECT; return NodeFilter.FILTER_ACCEPT;}});
  const range=document.createRange(); let n;
  while((n=tw.nextNode())){
    const el=n.parentElement, cs=getComputedStyle(el); if(cs.visibility==='hidden') continue;
    const fs=parseFloat(cs.fontSize); g.font=`${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
    let col=cs.color, outline=false; const m=col.match(/rgba?\(([^)]+)\)/);
    const clipText=(cs.webkitBackgroundClip||cs.backgroundClip)==='text';
    if(clipText){ col='rgba(205,205,202,.8)'; }
    else if(m){const v=m[1].split(',').map(parseFloat); if(v.length>3&&v[3]<.05){ outline=true; g.strokeStyle='rgba(231,231,229,.62)'; g.lineWidth=1.6; }}
    g.fillStyle=col; const asc=g.measureText('Hg').fontBoundingBoxAscent||fs*.8;
    const txt=n.textContent, perChar=fs>=34; const re=perChar?/\S/g:/\S+/g; let mm;
    while((mm=re.exec(txt))){ range.setStart(n,mm.index); range.setEnd(n,mm.index+mm[0].length); const r=range.getClientRects()[0]; if(!r||!r.width) continue;
      if(outline) g.strokeText(mm[0],r.left-sr.left,r.top-sr.top+asc); else g.fillText(mm[0],r.left-sr.left,r.top-sr.top+asc); }
  }
  const d=g.getImageData(0,0,W,H).data; let step=small?2:2, pts=[];
  for(let tries=0;tries<3;tries++){ pts=[];
    for(let y=0;y<H;y+=step)for(let x=0;x<W;x+=step){const o=((y|0)*W+(x|0))*4; if(d[o+3]>90) pts.push(x,y,d[o],d[o+1],d[o+2],d[o+3]);}
    if(pts.length/6<=(small?22000:52000)) break; step+=1; }
  return {pts:new Float32Array(pts), n:pts.length/6, step};
}
function dust(panel,dir){
  const r=rasterPanel(panel); if(!r.n) return;
  const seeds=new Float32Array(r.n*3); for(let i=0;i<r.n;i++){seeds[i*3]=Math.random();seeds[i*3+1]=Math.random();seeds[i*3+2]=Math.random();}
  panel.classList.add('dusted');
  dusts.push({panel,dir,born:performance.now(),bx:curX,...r,seeds,dead:false});
}
function drawSand(now){
  for(let i=dusts.length-1;i>=0;i--) if(dusts[i].dead||now-dusts[i].born>1100) dusts.splice(i,1);
  if(!dusts.length){ if(sandLive){sg.clearRect(0,0,SW,SH);sandLive=false;} return; }
  sandLive=true; sandBuf.fill(0); const W=SW,H=SH;
  for(const D of dusts){
    const age=(now-D.born)/1000, P=D.pts, S=D.seeds, shift=curX-D.bx, big=D.step>1.5;
    for(let i=0;i<D.n;i++){
      const hx=P[i*6], hy=P[i*6+1], r=S[i*3], q=S[i*3+1], w=S[i*3+2];
      // the wave sweeps across the chapter in the direction of travel; each grain lifts a touch late
      const across=D.dir>0?hx/W:1-hx/W, start=across*.22+r*.16, t=Math.min(1,Math.max(0,(age-start)/.5));
      const e=easeIO(t), a=(1-e)*(1-e);
      if(a<.02) continue;
      const x=(hx-shift*(.3+.7*e)-D.dir*e*(30+q*150)+Math.sin(w*30+age*3)*e*12)|0,
            y=(hy-e*(20+r*110)+Math.cos(q*25+age*3)*e*10)|0;
      if(x<0||y<0||x>=W-1||y>=H-1) continue;
      const A=(P[i*6+5]*a)|0, px=(A<<24)|(P[i*6+4]<<16)|(P[i*6+3]<<8)|P[i*6+2];
      const o=y*W+x; sandBuf[o]=px; if(big&&e<.55){sandBuf[o+1]=px;sandBuf[o+W]=px;sandBuf[o+W+1]=px;}
    }
  }
  sg.putImageData(sandImg,0,0);
}

/* ---------- lens: a clear circle; inside it, headings and years turn to outline ---------- */
const ring=document.createElement('span'); ring.className='lens-ring'; ring.setAttribute('aria-hidden','true'); stageEl.append(ring);
const lensState=new Map(); let ringR=0, rx=0, ry=0;
function lensTargets(){ const p=hpanels[idx]; return [...(idx===0?[heroWord]:[]), ...p.querySelectorAll('.t-m,.t-l,.set-year')]; }
function updateLens(){
  const on=mOn&&!reduce&&Math.abs(curX-toX)<vw*.02; let maxR=0;
  const sr=stageEl.getBoundingClientRect(), cx=ox+sr.left, cy=oy+sr.top;
  const act=new Set(lensTargets());
  lensState.forEach((st,el)=>{ if(!act.has(el)){ st.t=0; } });
  act.forEach(el=>{ let st=lensState.get(el); if(!st){st={r:0,t:0};lensState.set(el,st);}
    const b=el.getBoundingClientRect(), pad=24, inside=on&&cx>b.left-pad&&cx<b.right+pad&&cy>b.top-pad&&cy<b.bottom+pad;
    st.t=inside?Math.min(el===heroWord?150:120,Math.max(56,b.height*(el===heroWord?.42:.36))):0; });
  lensState.forEach((st,el)=>{ st.r+=(st.t-st.r)*.14; if(st.r<.4&&!st.t){ if(st.r){st.r=0;el.style.setProperty('--lr','0px');} return; }
    const b=el.getBoundingClientRect(); el.style.setProperty('--lx',(cx-b.left).toFixed(1)+'px'); el.style.setProperty('--ly',(cy-b.top).toFixed(1)+'px'); el.style.setProperty('--lr',st.r.toFixed(1)+'px');
    maxR=Math.max(maxR,st.r); });
  ringR=maxR; ring.style.setProperty('--lr',ringR.toFixed(1)+'px'); ring.style.transform=`translate3d(${ox.toFixed(1)}px,${oy.toFixed(1)}px,0)`;
  stageEl.classList.toggle('lens-on',ringR>8);
}

/* ---------- frame loop ---------- */
let lastT=performance.now();
function tickReel(now){
  const dt=Math.min(.05,(now-lastT)/1000); lastT=now; time+=dt;
  // critically damped spring (omega 4.6): glides out, settles softly, keeps its speed across a quick second step
  if(slideAt&&now>=slideAt){ slideAt=0; toX=slideTo; setActive(idx); }
  if(Math.abs(toX-curX)>.05||Math.abs(velX)>.05){ const Wn=4.6, n=Math.max(1,Math.ceil(dt/.008)), h=dt/n;
    for(let k=0;k<n;k++){ velX+=((toX-curX)*Wn*Wn-2*Wn*velX)*h; curX+=velX*h; }
    if(Math.abs(toX-curX)<.05&&Math.abs(velX)<.5){curX=toX;velX=0;} paintReel(); }
  if(story.getBoundingClientRect().bottom>0){ drawStars(); drawSand(now); updateLens(); }
  requestAnimationFrame(tickReel);
}
buildRail(); document.body.classList.add('in-reel');
const started=true, resize=()=>{sizeStars();layoutReel();};

/* loader: a quick count to 100, then the name sharpens in */
(function(){ const L=document.getElementById('loader'), n=document.getElementById('loaderN');
  if(!L||reduce){ if(L) L.remove(); return; }
  const t1=performance.now(), D=1000; const step=t=>{const p=Math.min(1,(t-t1)/D); n.textContent=Math.round(easeOut(p)*100);
    if(p<1) requestAnimationFrame(step); else {L.classList.add('out'); setTimeout(()=>L.remove(),900);} }; requestAnimationFrame(step); })();

/* ===== SCROLL ===== */
const reveal=document.getElementById('reveal');
reveal.innerHTML=reveal.textContent.split(' ').map(w=>'<span class="w">'+w+'</span>').join(' ');
const words=[...reveal.querySelectorAll('.w')];
function onScroll(){
  const sb=story.getBoundingClientRect(); document.body.classList.toggle('in-reel',sb.bottom>innerHeight*.6); onIndex();
  const rr=reveal.getBoundingClientRect(), rp=clamp((innerHeight*.85-rr.top)/(rr.height+innerHeight*.45));
  const lit=Math.floor(rp*words.length*1.05); words.forEach((w,i)=>w.classList.toggle('lit',i<lit));
  moveLedger(); paintBg();
}
addEventListener('scroll',onScroll,{passive:true});
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{layoutReel();setTimeout(()=>document.documentElement.classList.add('reel-ready'),reduce?0:950);});
sizeStars(); layoutReel(); requestAnimationFrame(tickReel);
addEventListener('load',()=>setTimeout(layoutReel,60));


/* ===== NOW: lead journey ===== */
const STAGES=[
  ['Capture','Listing pages, enquiry forms and campaign landing pages that send clean, structured data straight into HubSpot.','Drafting listing descriptions and campaign copy for a person to review and approve.',['HubSpot forms','Landing pages','Figma','Claude']],
  ['Qualify','Lifecycle stages, lead scoring properties and the handful of fields agents actually need to act.','Summarising each enquiry so an agent understands budget, area and timing in seconds.',['HubSpot CRM','Lead scoring','Properties']],
  ['Nurture','Email sequences and workflows that follow up at the right moment without flooding a client’s inbox.','Personalised variations that stay inside the brand’s tone of voice.',['HubSpot workflows','Sequences','Email design']],
  ['Hand over','The moment a lead moves from marketing to an agent: who receives it, what they see first, and what happens next.','Suggested next actions inside the agent app, always editable by the agent.',['HubSpot','Salesforce Agent App','Notifications']],
  ['Close and learn','Dashboards that show which sources convert, where deals stall, and what to change next quarter.','Plain-language summaries of pipeline changes for managers who don’t live in dashboards.',['HubSpot reports','Salesforce','Google Analytics']]
];
let curStage=()=>0, setStage=()=>{};
if(document.getElementById('pipe')){
const pipe=document.getElementById('pipe'), ppanel=document.getElementById('ppanel'), pfill=document.getElementById('pfill'), prun=document.getElementById('prun');
pipe.insertAdjacentHTML('beforeend',STAGES.map((s,i)=>`<button role="tab" aria-selected="${i===0}" data-i="${i}"><small>Moment ${i+1}</small><strong>${s[0]}</strong></button>`).join(''));
const pbtns=[...pipe.querySelectorAll('button')];
curStage=()=>Math.max(0,pbtns.findIndex(b=>b.getAttribute('aria-selected')==='true'));
setStage=function(i){
  pbtns.forEach((b,j)=>b.setAttribute('aria-selected',j===i));
  const x=pbtns[i].offsetLeft; pfill.style.width=(x+6)+'px'; prun.style.left=x+'px';
  const s=STAGES[i];
  ppanel.classList.remove('swap'); void ppanel.offsetWidth; ppanel.classList.add('swap');
  ppanel.innerHTML=`<div><h3>What I design</h3><p>${s[1]}</p></div><div><h3>Where AI helps</h3><p>${s[2]}</p></div><div><h3>Tools</h3><div class="tl">${s[3].map(t=>'<span>'+t+'</span>').join('')}</div></div>`;
}
pipe.addEventListener('click',e=>{const b=e.target.closest('button');if(b)setStage(+b.dataset.i);});
pipe.addEventListener('keydown',e=>{const c=curStage();let n=c;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=Math.min(4,c+1);else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=Math.max(0,c-1);else return;e.preventDefault();setStage(n);pbtns[n].focus();});
setStage(0);
}

/* ===== WORK ===== */
const CASES=[
  ['Dubai Sotheby’s International Realty','2025 to now','Agent App for UHNW portfolios',['End-to-end design of a Salesforce-based Agent App covering portfolios across the UAE, KSA and UK.','CRM workflows for reservation agreements, lead management and the full deal lifecycle.','Data-driven sales pipeline views that improve tracking, visibility and efficiency.'],['Salesforce','CRM','Web + mobile','UI system']],
  ['Current practice','2025 to now','AI and HubSpot lead journeys',['Lead journeys from first enquiry to agent hand-over, designed across HubSpot and the agent tools.','AI-assisted steps for summaries, copy drafts and next-best actions, with a person approving each one.','Working HTML prototypes built with Claude so ideas can be tested in a browser early.'],['HubSpot','Claude','AI UX','Prototyping'],true],
  ['TDRA, via Conceptualize','2023 to 2024','UAE Government Design System 2.0',['Designed and successfully delivered the federal design system for adoption across UAE government entities.','Defined foundations, components, patterns and accessibility guidelines.','Designed and launched designsystem.gov.ae.'],['Design system','Accessibility','Gov.ae']],
  ['Abu Dhabi Mobility, via Conceptualize','2023 to 2024','Traffic control CRM portal',['Designed the traffic control CRM portal for Abu Dhabi Mobility, inside the TAMM ecosystem.','Scalable UI for dashboards, workflows and service interfaces.'],['Dashboards','Gov services','Abu Dhabi']],
  ['MOHRE, Dubai','Dec 2024 to Jul 2025','Ministry of Human Resources and Emiratisation platforms',['Moved to Dubai to lead UX/UI for MOHRE web and mobile, structuring government service journeys.','Submission, approval and status-tracking flows aligned with compliance.'],['Web + mobile','Compliance','Service design']],
  ['PHP Agency Inc.','2021 to 2025','Financial workflows and agent analytics',['Policy purchase, onboarding and client lifecycle journeys.','Dashboards for commissions, earnings and agent performance.','Journeys optimised for lead conversion and reporting.'],['Fintech','Insurance','Dashboards','USA']],
  ['EY, via Tech Mahindra','2016 to 2025','Finance automation with chatbot assistance',['Chatbot-assisted service workflows for finance automation.','Conversational flows built around intents and automated hand-offs.'],['Conversational AI','Automation']],
  ['AT&T, via Tech Mahindra','2016 to 2025','Customer data CRM portal',['CRM portal focused on filtering, mapping and managing customer data at scale.'],['CRM','Enterprise','Data UX']],
  ['T-Mobile, via Tech Mahindra','2016 to 2025','Payment rule engine',['Contributed to rule engine design for payment workflows and decision-based systems.','Enterprise patterns following SAP Fiori principles.'],['Rule engine','Payments','SAP Fiori']]
];
const cases=document.getElementById('cases');
cases.innerHTML=CASES.map((c,i)=>`<li class="case" data-open="false"><button aria-expanded="false" aria-controls="cb${i}"><span class="client">${c[0]}${c[5]?'<span class="new">New</span>':''}</span><h3>${c[2]}</h3><span class="plus" aria-hidden="true"></span></button>
  <div class="body" id="cb${i}"><div class="inner"><div class="cols"><div class="meta">${c[1]}</div><ul>${c[3].map(b=>'<li>'+b+'</li>').join('')}</ul><div class="tags">${c[4].map(t=>'<span>'+t+'</span>').join('')}</div></div></div></div></li>`).join('');
cases.querySelectorAll('.case > button').forEach(b=>b.addEventListener('click',()=>{const li=b.parentElement, o=li.dataset.open!=='true';
  cases.querySelectorAll('.case').forEach(x=>{x.dataset.open='false';x.querySelector('button').setAttribute('aria-expanded','false');});
  li.dataset.open=o; b.setAttribute('aria-expanded',o); setTimeout(buildStops,550);}));

/* ===== LEDGER ===== */
const ledger=document.getElementById('experience'), track=document.getElementById('track'), bar=document.getElementById('bar'), mq=matchMedia('(max-width:860px)');
function sizeLedger(){if(!ledger)return;if(mq.matches){ledger.style.height='auto';track.style.transform='none';return;}ledger.style.height=(innerHeight+Math.max(0,track.scrollWidth-innerWidth))+'px';moveLedger();}
function moveLedger(){if(!ledger||mq.matches)return;const r=ledger.getBoundingClientRect(),ex=Math.max(0,track.scrollWidth-innerWidth),p=clamp(-r.top/Math.max(1,r.height-innerHeight));track.style.transform=`translate3d(${-ex*p}px,0,0)`;bar.style.width=(p*100)+'%';}

/* ===== TOOLBOX ===== */
const TB=[
  ['Craft',['Product design','UX strategy','Design systems','Financial workflows','CRM systems','Data-driven UX','Interaction design','Accessibility','Information architecture'],[],'The disciplines behind every project, from first flow to final component library.'],
  ['Tools',['Figma','Framer','Sketch','Adobe Creative Suite','Salesforce','HubSpot','Google Analytics','HTML','CSS'],['HubSpot'],'Design in Figma, prototype in Framer or code, and work directly inside the CRMs the product lives in.'],
  ['AI and automation',['Claude','AI-assisted prototyping','Research synthesis','HubSpot workflows','Lead scoring','Conversational flows','Chatbot service journeys','Human-in-the-loop design'],['Claude','AI-assisted prototyping','HubSpot workflows','Human-in-the-loop design'],'AI where it saves time, automation where it removes busywork, and a clear point where a person takes over.']
];
const tabs=document.getElementById('tabs'), tpanel=document.getElementById('tpanel');
tabs.innerHTML=TB.map((t,i)=>`<button role="tab" aria-selected="${i===0}" data-i="${i}">${t[0]}<small>${t[1].length} ${i===0?'skills':(i===1?'tools':'practices')}</small></button>`).join('');
function setTab(i){tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',+b.dataset.i===i));
  tpanel.innerHTML='<div class="pills">'+TB[i][1].map((p,j)=>`<span class="${TB[i][2].includes(p)?'hl':''}" style="animation-delay:${j*45}ms">${p}</span>`).join('')+'</div><p>'+TB[i][3]+'</p>';}
tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)setTab(+b.dataset.i);}); setTab(0);

/* footer wordmark fills the width */
const wm=document.getElementById('wordmark');
function fitWordmark(){ if(heroWord.style.fontSize){ wm.style.fontSize=heroWord.style.fontSize; return; } wm.style.fontSize='100px';const w=[...wm.children].reduce((t,c)=>t+c.getBoundingClientRect().width,0)||1, avail=Math.min(wm.clientWidth,brandW());wm.style.fontSize=Math.min(100*avail/w*.995,innerHeight*.5)+'px';}
document.querySelectorAll('button[data-chap]').forEach(b=>b.addEventListener('click',()=>{const i=hpanels.findIndex(p=>p.dataset.chap===b.dataset.chap);if(i>=0)goPanel(i);}));

/* hide the round badge once the footer closes the page */
const badge=document.querySelector('.badge-talk');
new IntersectionObserver(es=>{badge.style.opacity=es[0].isIntersecting?0:1;badge.style.pointerEvents=es[0].isIntersecting?'none':'';},{threshold:.15}).observe(document.getElementById('footer'));

/* layout-dependent setup */
function relayout(){fitWordmark();if(started)resize();sizeLedger();setStage(curStage());buildStops();onScroll();}
let rT; addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(relayout,150);});
addEventListener('load',relayout); fitWordmark(); if(document.fonts)document.fonts.ready.then(()=>{fitWordmark();buildStops();}); sizeLedger(); buildStops(); onScroll();

/* ===== CONTACT ===== */
const mail=document.getElementById('mail'), copied=document.getElementById('copied');
mail.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(EMAIL);copied.textContent='Email address copied';}catch(e){location.href='mailto:'+EMAIL;}setTimeout(()=>copied.textContent='',2400);});

/* ===== LET'S TALK SHEET ===== */
const scrim=document.getElementById('scrim'), body=document.getElementById('sheetBody');
const Q=[{q:'What are you looking for?',k:'need',o:['A full-time hire','A freelance project','AI or HubSpot journey design','Design system work','Just saying hello']},
         {q:'When would you like to start?',k:'when',o:['As soon as possible','In 1 to 3 months','Just exploring']}];
let st=0, ans={}, lastF=null;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const dots=n=>'<div class="dots">'+[0,1,2].map(i=>'<i class="'+(i===n?'on':'')+'"></i>').join('')+'</div>';
function render(){
  if(st<2){const q=Q[st];
    body.innerHTML=`<h3 id="sheetTitle">${q.q}</h3><div class="opts" role="radiogroup">${q.o.map(o=>`<button class="opt" role="radio" aria-checked="${ans[q.k]===o}">${o}<i></i></button>`).join('')}</div>
      <div class="sheet-nav">${st?'<button class="link" id="back">Back</button>':'<span></span>'}${dots(st)}<button class="btn" id="next" ${ans[q.k]?'':'disabled'}>Next</button></div>`;
    body.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ans[q.k]=b.textContent;render();setTimeout(()=>{st++;render();},250);});
    body.querySelector('#next').onclick=()=>{st++;render();}; const bk=body.querySelector('#back'); if(bk)bk.onclick=()=>{st--;render();};
    body.querySelector('.opt').focus();
  } else if(st===2){
    body.innerHTML=`<h3 id="sheetTitle">Tell me a little more</h3>
      <label class="field">Your name<input id="fName" autocomplete="name" value="${esc(ans.name||'')}"></label>
      <label class="field">Company (optional)<input id="fCo" autocomplete="organization" value="${esc(ans.co||'')}"></label>
      <label class="field">What’s the project? (optional)<textarea id="fNote">${esc(ans.note||'')}</textarea></label><p class="err" id="fErr"></p>
      <div class="sheet-nav"><button class="link" id="back">Back</button>${dots(2)}<button class="btn" id="go">Open email draft</button></div>`;
    body.querySelector('#back').onclick=()=>{st--;render();}; body.querySelector('#go').onclick=go; body.querySelector('#fName').focus();
  } else {
    body.innerHTML=`<div class="done"><svg width="46" height="46" viewBox="0 0 46 46" fill="none" stroke="currentColor" stroke-width="2"><circle cx="23" cy="23" r="21"/><path d="M14 23.5l6 6 12-13"/></svg><h3 id="sheetTitle">Email draft opened</h3><p>Your email app should now show a message to ${EMAIL}, ready to send. If nothing opened, write to that address directly.</p><button class="btn" id="fin">Close</button></div>`;
    body.querySelector('#fin').onclick=close; body.querySelector('#fin').focus();
  }
}
function go(){
  const n=document.getElementById('fName').value.trim(), err=document.getElementById('fErr');
  if(!n){err.textContent='Add your name so Mustafa knows who’s writing.';return;}
  ans.name=n; ans.co=document.getElementById('fCo').value.trim(); ans.note=document.getElementById('fNote').value.trim();
  const subj=`${ans.need}: ${n}${ans.co?' ('+ans.co+')':''}`;
  const txt=`Hi Mustafa,\n\nI’m looking for: ${ans.need}\nTiming: ${ans.when}\n${ans.note?'\n'+ans.note+'\n':''}\nBest,\n${n}${ans.co?'\n'+ans.co:''}`;
  location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(txt)}`;
  st=3; render();
}
function openSheet(){lastF=document.activeElement;st=0;scrim.classList.add('open');document.body.style.overflow='hidden';render();}
function close(){scrim.classList.remove('open');document.body.style.overflow='';if(lastF)lastF.focus();}
document.querySelectorAll('[data-talk]').forEach(b=>b.addEventListener('click',openSheet));
document.getElementById('sheetClose').onclick=close;
scrim.addEventListener('click',e=>{if(e.target===scrim)close();});
addEventListener('keydown',e=>{if(e.key==='Escape'){if(scrim.classList.contains('open'))close();else if(menu.classList.contains('open'))setMenu(false);}});
})();
