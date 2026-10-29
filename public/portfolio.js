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
const CH_BG=['#0F0F0E','#1D1A16','#141413','#1B1B19','#201C18','#161615','#0F0F0E'];
let STOPS=[];
const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
function buildStops(){
  STOPS=[]; const span=story.offsetHeight-innerHeight;
  CH_BG.forEach((c,j)=>STOPS.push([story.offsetTop+span*j/(CH_BG.length-1),hex(c)]));
  document.querySelectorAll('[data-bg]').forEach(s=>STOPS.push([s.offsetTop-innerHeight*.35,hex(s.dataset.bg)]));
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

/* ===== PARTICLE JOURNEY ===== */
const cvs=document.getElementById('fx'), ctx=cvs.getContext('2d');
const scenes=[...document.querySelectorAll('.scene')], NS=7;
const small=matchMedia('(max-width:760px)').matches, N=small?1600:3400;
let W=0,H=0,DPR=1;
const X=new Float32Array(N),Y=new Float32Array(N),VX=new Float32Array(N),VY=new Float32Array(N);
const A=new Float32Array(N*2), cA=new Uint8Array(N), DR=new Float32Array(N*2), cDR=new Uint8Array(N);
const SHP=[null], SHC=[null]; for(let s=1;s<NS;s++){SHP.push(new Float32Array(N*3));SHC.push(new Uint8Array(N));}
const COL=new Uint8Array(N), DEP=new Float32Array(N);
const delay=new Float32Array(N),ang=new Float32Array(N),kick=new Float32Array(N);
for(let k=0;k<N;k++){delay[k]=Math.random();ang[k]=Math.random()*6.283;kick[k]=.4+Math.random();}
const rnd=()=>(Math.random()+Math.random()+Math.random()-1.5)/1.5;

/* palette: pale, cyan, lilac, coral, blue, cyan-dim, faint, white */
const PAL=[[242,242,239,1],[255,59,29,1],[203,191,175,1],[255,106,77,1],[154,154,150,1],[242,242,239,.42],[242,242,239,.14],[255,255,255,1]];
const SZ=[1.6,1.9,1.9,1.9,1.8,1.4,1.3,2.2], BL=5;
const SPR=PAL.map(c=>{const out=[];for(let b=0;b<BL;b++){const s=64,cv=document.createElement('canvas');cv.width=cv.height=s;const g=cv.getContext('2d');
  const a=c[3]/(1+b*.85), inner=Math.max(0,.42-b*.1), grd=g.createRadialGradient(32,32,0,32,32,32);
  grd.addColorStop(0,`rgba(${c[0]},${c[1]},${c[2]},${a})`);grd.addColorStop(inner,`rgba(${c[0]},${c[1]},${c[2]},${a})`);grd.addColorStop(b?1:.6,`rgba(${c[0]},${c[1]},${c[2]},0)`);
  g.fillStyle=grd;g.fillRect(0,0,s,s);out.push(cv);}return out;});

function rrPerim(cx,cy,w,h,r){
  const sw=w-2*r, sh=h-2*r, arc=Math.PI*r/2, L=2*sw+2*sh+4*arc; let d=Math.random()*L;
  const segs=[[sw,t=>[cx-w/2+r+t,cy+h/2]],[arc,t=>{const a=Math.PI/2-t/r;return[cx+w/2-r+Math.cos(a)*r,cy+h/2-r+Math.sin(a)*r]}],
    [sh,t=>[cx+w/2,cy+h/2-r-t]],[arc,t=>{const a=-t/r;return[cx+w/2-r+Math.cos(a)*r,cy-h/2+r+Math.sin(a)*r]}],
    [sw,t=>[cx+w/2-r-t,cy-h/2]],[arc,t=>{const a=-Math.PI/2-t/r;return[cx-w/2+r+Math.cos(a)*r,cy-h/2+r+Math.sin(a)*r]}],
    [sh,t=>[cx-w/2,cy-h/2+r+t]],[arc,t=>{const a=Math.PI-t/r;return[cx-w/2+r+Math.cos(a)*r,cy+h/2-r+Math.sin(a)*r]}]];
  for(const [len,f] of segs){ if(d<=len) return f(d); d-=len; } return [cx,cy];
}
const rrFill=(cx,cy,w,h)=>[cx+(Math.random()-.5)*w, cy+(Math.random()-.5)*h];
const hash=n=>{const s=Math.sin(n*12.9898)*43758.5453;return s-Math.floor(s);};

/* SHAPE 1 — Pune 2011: an open layout spread (print and creative) */
(function(){
  const P=SHP[1], C=SHC[1];
  const parts=[['o',-.55,0,1.0,1.36,0,7],['o',.55,0,1.0,1.36,0,7],['f',-.55,.3,.8,.5,2,6],
    ['l',-.55,-.12,.8,0,0,2.4,1,.06],['l',-.55,-.3,.8,.34,0,3,6,.012],['l',.33,.55,.36,1.1,0,3.4,15,.01],['l',.77,.55,.36,1.1,0,3.4,15,.01],
    ['f',.55,-.52,.8,.1,1,1.4],['c',0,0,0,0,1,1.4]];
  const tot=parts.reduce((s,p)=>s+p[6],0);
  for(let k=0;k<N;k++){
    let r=Math.random()*tot,p=parts[0]; for(const q of parts){if(r<q[6]){p=q;break;}r-=q[6];}
    let x,y;
    if(p[0]==='o'){[x,y]=rrPerim(p[1],p[2],p[3],p[4],.02);}
    else if(p[0]==='f'){[x,y]=rrFill(p[1],p[2],p[3],p[4]);}
    else if(p[0]==='l'){const n=p[7], row=Math.floor(Math.random()*n), len=row===n-1?.5:(.7+.3*hash(row+p[1]*10)); x=p[1]-p[3]/2+Math.random()*p[3]*len; y=p[2]-(n>1?row*p[4]/(n-1):0)+(Math.random()-.5)*p[8];}
    else {const cx=[-1.08,1.08][k%2], cy=[-.71,.71][(k>>1)%2], h=Math.random()<.5; const u=.04+Math.random()*.1; x=cx+(h?Math.sign(cx)*u:0); y=cy+(h?0:Math.sign(cy)*u);}
    const z=.32-Math.abs(x)*.3;
    P[k*3]=x*.82; P[k*3+1]=y*.82; P[k*3+2]=z*.82; C[k]=p[5]; if(p[0]==='o'&&Math.random()<.05)C[k]=7;
  }
})();

/* SHAPE 2 — Enterprise 2016: enterprise CRM dashboard with a chat assistant */
(function(){
  const P=SHP[2], C=SHC[2];
  const parts=[['o',0,0,2.1,1.4,.06,0,0,8],['o',-.9,0,.18,1.26,.04,0,5,2],
    ['o',-.55,.53,.26,.1,.05,0,1,1.3],['o',-.25,.53,.26,.1,.05,0,1,1.3],['o',.05,.53,.26,.1,.05,0,1,1.3],['o',.67,.53,.5,.1,.05,0,5,1.2],
    ['b',0,0,0,0,0,0,2,6],['w',0,0,0,0,0,0,1,2.2],['t',0,0,0,0,0,0,0,4],
    ['o',.78,-.6,.56,.24,.1,-.4,3,2.2],['d',0,0,0,0,0,-.4,3,.6]];
  const tot=parts.reduce((a,p)=>a+p[8],0);
  for(let k=0;k<N;k++){
    let r=Math.random()*tot,p=parts[0]; for(const q of parts){if(r<q[8]){p=q;break;}r-=q[8];}
    let x,y,z=p[6],c=p[7];
    if(p[0]==='o'){[x,y]=rrPerim(p[1],p[2],p[3],p[4],p[5]);}
    else if(p[0]==='b'){const i=Math.floor(Math.random()*8), h=.14+.34*hash(i+3); x=-.66+i*.1+(Math.random()-.5)*.055; y=-.02+Math.random()*h; c=i%3===2?4:2;}
    else if(p[0]==='w'){const u=Math.random(); x=-.7+u*.82; y=-.42+Math.sin(u*7)*.05+u*.08+rnd()*.004;}
    else if(p[0]==='t'){const row=Math.floor(Math.random()*7), len=.55+.45*hash(row+9); x=.3+Math.random()*.64*len; y=.32-row*.13+(Math.random()-.5)*.012; if(Math.random()<.18){x=.3+Math.random()*.64;y=.385-row*.13;c=6;}}
    else {const i=k%3; x=.66+i*.1+rnd()*.012; y=-.6+rnd()*.012; c=7;}
    P[k*3]=(x+.05)*.88; P[k*3+1]=y*.88; P[k*3+2]=z*.88+rnd()*.01; C[k]=c; if(p[0]==='o'&&Math.random()<.05)C[k]=7;
  }
})();

/* SHAPE 4 — Dubai 2024, MOHRE: a government service journey */
const FN=[['Start',-.98,0],['Submit',-.56,0],['Review',-.1,0],['Approve',.4,.55],['More info',.4,-.55],['Track status',.9,.55]];
const FE=[[0,1],[1,2],[2,3],[2,4],[4,1,1],[3,5]];
function edgePoint(e,s){ const a=FN[e[0]], b=FN[e[1]];
  if(e[2]){ const mx=(a[1]+b[1])/2, my=-.95, u=1-s; return [u*u*a[1]+2*u*s*mx+s*s*b[1], u*u*a[2]+2*u*s*my+s*s*b[2]]; }
  if(a[2]!==b[2]){ const mid=(a[1]+b[1])/2; if(s<.33) return [a[1]+(mid-a[1])*(s/.33),a[2]]; if(s<.66) return [mid,a[2]+(b[2]-a[2])*((s-.33)/.33)]; return [mid+(b[1]-mid)*((s-.66)/.34),b[2]]; }
  return [a[1]+(b[1]-a[1])*s, a[2]]; }
(function(){
  const P=SHP[4], C=SHC[4];
  for(let k=0;k<N;k++){ let x,y,c;
    if(k%3===0){ const n=FN[Math.floor(Math.random()*FN.length)]; const pt=Math.random()<.85?rrPerim(n[1],n[2],.3,.2,.1):rrFill(n[1],n[2],.27,.16);
      x=pt[0];y=pt[1]; c=(n[0]==='Approve'||n[0]==='Track status')?1:(n[0]==='More info'?3:2);
      if(n[0]==='Review'){const q=rrPerim(n[1],n[2],.26,.26,.02), a=Math.PI/4, cx=q[0]-n[1], cy=q[1]-n[2]; x=n[1]+cx*Math.cos(a)-cy*Math.sin(a); y=n[2]+cx*Math.sin(a)+cy*Math.cos(a); c=0;} }
    else { const e=FE[Math.floor(Math.random()*FE.length)]; [x,y]=edgePoint(e,Math.random()); x+=rnd()*.006; y+=rnd()*.006; c=e[2]?3:5; }
    P[k*3]=x+.05; P[k*3+1]=y; P[k*3+2]=rnd()*.04; C[k]=c; }
})();

/* SHAPE 3 — Government 2023: design system */
(function(){
  const P=SHP[3], Cc=SHC[3];
  const S=[['o',-.72,0,.86,1.9,.14,.05,0,10],['o',-.72,.78,.66,.12,.06,0,5,2],['o',-.72,.42,.66,.42,.06,-.05,4,4],['o',-.72,-.06,.66,.42,.06,-.05,5,4],
    ['f',-.72,-.62,.66,.14,.07,-.12,1,3],['o',.34,.78,.62,.16,.08,-.25,4,2.2],['f',.34,.52,.62,.16,.08,-.25,2,2.2],['o',.12,.2,.34,.17,.085,-.3,0,1.6],
    ['f',.2,.2,.13,.13,.065,-.32,1,.8],['o',.54,.2,.16,.16,.03,-.3,0,1],['f',.06,-.18,.2,.2,.02,-.35,1,1],['f',.3,-.18,.2,.2,.02,-.35,2,1],['f',.54,-.18,.2,.2,.02,-.35,3,1],
    ['o',.34,-.62,.62,.46,.06,-.2,5,3.2],['g',.34,-.62,.5,.3,0,-.2,6,1.6]];
  const tot=S.reduce((s,p)=>s+p[8],0);
  for(let k=0;k<N;k++){
    let r=Math.random()*tot, p=S[0]; for(const q of S){ if(r<q[8]){p=q;break;} r-=q[8]; }
    let pt; if(p[0]==='o') pt=rrPerim(p[1],p[2],p[3],p[4],p[5]); else if(p[0]==='f') pt=rrFill(p[1],p[2],p[3],p[4]);
    else { const gx=Math.floor(Math.random()*8), gy=Math.floor(Math.random()*5); pt=[p[1]-p[3]/2+gx*p[3]/7, p[2]-p[4]/2+gy*p[4]/4]; }
    P[k*3]=pt[0]+.22; P[k*3+1]=pt[1]; P[k*3+2]=p[6]*1.2+rnd()*.01; Cc[k]=p[7]; if(p[0]==='o'&&Math.random()<.06) Cc[k]=7;
  }
})();

/* SHAPE 5 — Now: AI + CRM network */
const NN=[['Enquiry',-1.05,.6,.22,.06,0],['Campaign',-1.05,0,-.05,.06,0],['Portal',-1.05,-.6,-.25,.06,0],['HubSpot',-.42,0,0,.16,3],
  ['AI summary',.18,.52,-.22,.09,2],['Lead score',.18,-.52,.22,.09,2],['Agent app',.72,0,0,.11,1],['Client',1.18,0,.1,.06,7]];
const NE=[[0,3],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6],[6,7]];
const nePoint=(e,s)=>{const a=NN[e[0]],b=NN[e[1]];return [a[1]+(b[1]-a[1])*s,a[2]+(b[2]-a[2])*s,a[3]+(b[3]-a[3])*s];};
(function(){
  const P=SHP[5], C=SHC[5], wt=NN.map(n=>n[4]), tw=wt.reduce((a,b)=>a+b,0);
  for(let k=0;k<N;k++){let x,y,z,c;
    if(Math.random()<.5){let r=Math.random()*tw,n=NN[0];for(let i=0;i<NN.length;i++){if(r<wt[i]){n=NN[i];break;}r-=wt[i];}
      const u=Math.random()*2-1, th=Math.random()*6.283, s=Math.sqrt(1-u*u), rr=n[4]*(Math.random()<.8?1:Math.random());
      x=n[1]+s*Math.cos(th)*rr; y=n[2]+u*rr; z=n[3]+s*Math.sin(th)*rr; c=n[5];}
    else {const e=NE[k%NE.length]; [x,y,z]=nePoint(e,Math.random()); x+=rnd()*.006; y+=rnd()*.006; c=Math.random()<.85?5:1;}
    P[k*3]=x*.92+.05; P[k*3+1]=y*.92; P[k*3+2]=z*.92; C[k]=c;}
})();

/* SHAPE 6 — Worldwide: globe, Pune to Dubai first */
const CITIES=[['Dubai',25.2,55.3],['Riyadh',24.7,46.7],['London',51.5,-.12],['Pune',18.5,73.9],['Abu Dhabi',24.45,54.4],['Dallas',32.8,-96.8]];
const ARCS=[[3,0,3],[0,2,2],[0,1,2],[0,5,2],[4,1,2]];
const ll=(lat,lon,r=1)=>{lat*=Math.PI/180;lon*=Math.PI/180;return [r*Math.cos(lat)*Math.sin(lon), r*Math.sin(lat), -r*Math.cos(lat)*Math.cos(lon)];};
(function(){
  const P=SHP[6], C=SHC[6]; let fib=0; const nf=Math.floor(N*.7);
  for(let k=0;k<N;k++){const r=Math.random(); let p;
    if(r<.7&&fib<nf){const i=fib++, y=1-(i/(nf-1))*2, rad=Math.sqrt(1-y*y), th=i*2.399963; p=[Math.cos(th)*rad,y,Math.sin(th)*rad]; C[k]=5;}
    else if(r<.78){const c=CITIES[k%CITIES.length]; p=ll(c[1]+rnd()*1.2,c[2]+rnd()*1.2,1.01); C[k]=7;}
    else {const a=ARCS[k%ARCS.length], c1=CITIES[a[0]], c2=CITIES[a[1]], s=Math.random(), p1=ll(c1[1],c1[2]), p2=ll(c2[1],c2[2]);
      const q=[p1[0]+(p2[0]-p1[0])*s,p1[1]+(p2[1]-p1[1])*s,p1[2]+(p2[2]-p1[2])*s]; const L=Math.hypot(...q)||1, lift=1+Math.sin(Math.PI*s)*(a[1]===5?.28:.18); p=q.map(v=>v/L*lift); C[k]=a[2];}
    P[k*3]=p[0];P[k*3+1]=p[1];P[k*3+2]=p[2];}
})();

/* SHAPE 0 — the name; DRIFT — ambient field for the rest of the page */
const ROOTCS=getComputedStyle(document.documentElement);
const DISP=ROOTCS.getPropertyValue('--display').trim()||'"Inter Tight", Arial, sans-serif';
const MONO=ROOTCS.getPropertyValue('--mono').trim()||'"Geist Mono", Menlo, monospace';
function buildText(){
  const off=document.createElement('canvas'); off.width=W; off.height=H; const o=off.getContext('2d');
  o.fillStyle='#fff'; o.textAlign='center'; o.textBaseline='middle';
  const lines=['Mustafa','Kapadiya']; let fs=200;
  const setF=()=>{o.font=`700 ${fs}px ${DISP}`;}; setF();
  const widest=Math.max(...lines.map(l=>o.measureText(l).width));
  fs=Math.min(fs*(W*(W<760?.86:.58))/widest, H*.25); setF();
  const lh=fs*.95, cy=H*(W<760?.4:.44);
  lines.forEach((l,i)=>o.fillText(l, W/2+(i?fs*.25:-fs*.25)*(W<760?0:1), cy+(i-.5)*lh));
  const data=o.getImageData(0,0,W,H).data, pts=[];
  let step=Math.max(2,Math.round(Math.sqrt((W*H*.05)/N)));
  for(let tries=0;tries<4;tries++){
    pts.length=0;
    for(let y=0;y<H;y+=step)for(let x=0;x<W;x+=step){ if(data[((y|0)*W+(x|0))*4+3]>128) pts.push(x|0,y|0); }
    const n=pts.length/2; if(n>=N*.85&&n<=N*1.6)break; step=Math.max(1.5,Math.round(step*Math.sqrt(n/N)*10)/10);
  }
  const n=pts.length/2;
  for(let k=0;k<N;k++){const i=n?Math.floor(Math.random()*n):0; A[k*2]=(pts[i*2]||W/2)+Math.random()*step*.6; A[k*2+1]=(pts[i*2+1]||H/2)+Math.random()*step*.6; const r=Math.random(); cA[k]=r<.07?1:(r<.2?2:0);
    DR[k*2]=Math.random()*W; DR[k*2+1]=Math.random()*H; const q=Math.random(); cDR[k]=q<.62?6:(q<.9?5:2);}
}
const NP=small?40:90, PX=new Float32Array(NP),PY=new Float32Array(NP),PZ=new Float32Array(NP),PS=new Float32Array(NP);
function seedPollen(){for(let i=0;i<NP;i++){PX[i]=Math.random()*W;PY[i]=Math.random()*H;PZ[i]=Math.random();PS[i]=.15+Math.random()*.6;}}

function resize(){DPR=Math.min(devicePixelRatio||1,1.75);W=innerWidth;H=innerHeight;cvs.width=W*DPR;cvs.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);buildText();seedPollen();}
let started=false;
function boot(){resize();for(let k=0;k<N;k++){X[k]=Math.random()*W;Y[k]=Math.random()*H;}started=true;}
(document.fonts&&document.fonts.load?Promise.all([document.fonts.load(`700 100px ${DISP}`),document.fonts.load('500 12px "Geist Mono"')]):Promise.resolve()).catch(()=>{}).then(boot);

let mx=-9999,my=-9999,mActive=false;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;mActive=true;},{passive:true});
document.addEventListener('pointerleave',()=>{mActive=false;mx=my=-9999;});

let progress=0, drift=0, time=0, last=performance.now();
const geom=()=>{const wide=W>860;return {cx:wide?W*.64:W*.5, cy:wide?H*.5:H*.29, S:wide?Math.min(W*.22,H*.36):Math.min(W*.3,H*.16)};};
function rotY(x,z,a){const c=Math.cos(a),s=Math.sin(a);return [x*c+z*s,-x*s+z*c];}
function rotX(y,z,b){const c=Math.cos(b),s=Math.sin(b);return [y*c-z*s,y*s+z*c];}
const proj=(x,y,z,g)=>{const p=2.8/(2.8+z);return [g.cx+x*g.S*p,g.cy-y*g.S*p];};
const ROT=[null,
  (x,y,z)=>{[x,z]=rotY(x,z,Math.sin(time*.3)*.35);[y,z]=rotX(y,z,.32);return [x,y,z];},
  (x,y,z)=>{[x,z]=rotY(x,z,-.28+Math.sin(time*.3)*.2);[y,z]=rotX(y,z,.14);return [x,y,z];},
  (x,y,z)=>{[x,z]=rotY(x,z,-.35+Math.sin(time*.4)*.25);[y,z]=rotX(y,z,.12);return [x,y,z];},
  (x,y,z)=>{[x,z]=rotY(x,z,Math.sin(time*.25)*.2);[y,z]=rotX(y,z,-.1);return [x,y,z];},
  (x,y,z)=>{[x,z]=rotY(x,z,Math.sin(time*.3)*.4);[y,z]=rotX(y,z,-.12);return [x,y,z];},
  (x,y,z)=>{[x,z]=rotY(x,z,(40+Math.sin(time*.2)*22)*Math.PI/180);[y,z]=rotX(y,z,-30*Math.PI/180);return [x,y,z];}];
let tx=0,ty=0,tz=0,tc=0;
function target(sh,k,g){
  if(sh===0){tx=A[k*2];ty=A[k*2+1];tz=(delay[k]-.5)*.08;tc=cA[k];return;}
  const P=SHP[sh]; const [x,y,z]=ROT[sh](P[k*3],P[k*3+1],P[k*3+2]);
  tc=SHC[sh][k]; if(sh===6&&z>.12) tc=6;
  const p=proj(x,y,z,g); tx=p[0]; ty=p[1]; tz=z;
}
function label(sh,x,y,z,g,txt,alpha,color){const [X1,Y1,Z1]=ROT[sh](x,y,z); if(sh===6&&Z1>.1)return; const p=proj(X1,Y1,Z1,g); ctx.fillStyle=color.replace('A',alpha); ctx.fillText(txt,p[0],p[1]);}

function frame(now){
  requestAnimationFrame(frame);
  const dt=Math.min(.05,(now-last)/1000); last=now;
  if(!started) return; if(!reduce) time+=dt;
  const s=progress*(NS-1); let i=Math.min(NS-2,Math.floor(s)), f=s-i; if(progress>=1){i=NS-2;f=1;}
  const t=smooth(clamp((f-.22)/.56)), g=geom(), dz=smooth(drift);
  ctx.clearRect(0,0,W,H);
  const glow=ctx.createRadialGradient(g.cx,g.cy,0,g.cx,g.cy,Math.max(W,H)*.55);
  glow.addColorStop(0,`rgba(255,59,29,${.06*(1-dz)})`); glow.addColorStop(.5,`rgba(203,191,175,${.03*(1-dz)})`); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);

  ctx.globalCompositeOperation='lighter';
  ctx.globalAlpha=1-.75*dz;
  for(let q=0;q<NP;q++){ if(!reduce){PY[q]-=PS[q]*.3;PX[q]+=Math.sin(time*.5+q)*.15;} if(PY[q]<-40){PY[q]=H+40;PX[q]=Math.random()*W;}
    const b=Math.min(BL-1,1+Math.floor(PZ[q]*4)), sz=4+PZ[q]*26; ctx.drawImage(SPR[q%5===0?1:(q%3===1?2:0)][b],PX[q]-sz/2,PY[q]-sz/2,sz,sz);}

  const R=small?70:110, R2=R*R;
  for(let k=0;k<N;k++){
    const ti=clamp((t-delay[k]*.35)/.65); let px,py,pz,col;
    if(ti<=0){target(i,k,g);px=tx;py=ty;pz=tz;col=tc;}
    else if(ti>=1){target(i+1,k,g);px=tx;py=ty;pz=tz;col=tc;}
    else{target(i,k,g);const ax=tx,ay=ty,az=tz,ac=tc;target(i+1,k,g);const e=smooth(ti);px=ax+(tx-ax)*e;py=ay+(ty-ay)*e;pz=az+(tz-az)*e+Math.sin(Math.PI*ti)*(kick[k]-.7);col=ti<.5?ac:tc;
      const burst=Math.sin(Math.PI*ti)*kick[k]*(small?50:90);px+=Math.cos(ang[k])*burst;py+=Math.sin(ang[k])*burst;}
    if(dz>0){const dk=Math.min(1,dz*(1+delay[k]*.6)), ddx=DR[k*2]+Math.sin(time*.25+ang[k])*30, ddy=DR[k*2+1]+Math.cos(time*.2+ang[k]*1.3)*30;
      px+=(ddx-px)*dk; py+=(ddy-py)*dk; pz=pz*(1-dk)+(delay[k]-.5)*1.6*dk; if(dk>.5) col=cDR[k];}
    let ax=(px-X[k])*.07, ay=(py-Y[k])*.07;
    if(mActive&&!reduce){const dx=X[k]-mx,dy=Y[k]-my,d2=dx*dx+dy*dy;if(d2<R2){const d=Math.sqrt(d2)||1,fp=(1-d/R)*5.5;ax+=dx/d*fp-dy/d*fp*.35;ay+=dy/d*fp+dx/d*fp*.35;}}
    VX[k]=(VX[k]+ax)*.84;VY[k]=(VY[k]+ay)*.84;X[k]+=VX[k];Y[k]+=VY[k];COL[k]=col;DEP[k]=pz;
  }
  ctx.globalAlpha=1-.8*dz;
  for(let k=0;k<N;k++){const c=COL[k], b=Math.min(BL-1,Math.floor(Math.abs(DEP[k])*3.4)), sz=SZ[c]*(i===0&&t<.5?2.3:1.9)*(1+b*1.25)*(1-DEP[k]*.25);
    ctx.drawImage(SPR[c][b],X[k]-sz/2,Y[k]-sz/2,sz,sz);}
  ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
  if(dz>.5) return;

  const lab=1-dz*2, wt=n=>(n===i?1-t:(n===i+1?t:0))*lab;
  ctx.font=`500 ${small?9:11}px ${MONO}`; ctx.textAlign='left';
  const tiny=W<560;
  const w1=tiny?0:wt(1); if(w1>.6){const a=((w1-.6)/.4*.8).toFixed(2);
    label(1,-.95*.82,.62*.82,.03,g,'Image',a,'rgba(154,154,150,A)');
    label(1,.15*.82,.68*.82,.03,g,'Two-column grid',a,'rgba(242,242,239,A)');}
  const w2=tiny?0:wt(2); if(w2>.6){const a=((w2-.6)/.4*.8).toFixed(2);
    label(2,-.6*.88,.66*.88,0,g,'Filters',a,'rgba(242,242,239,A)');
    label(2,.35*.88,.47*.88,0,g,'Customer data',a,'rgba(242,242,239,A)');
    label(2,.6*.88,-.82*.88,-.35,g,'Chat assist',a,'rgba(255,59,29,A)');}
  const w3=tiny?0:wt(3); if(w3>.6){const a=((w3-.6)/.4*.8).toFixed(2);
    [[.34,.98,'Button, primary'],[.12,.38,'Toggle'],[.06,-.42,'Colour tokens'],[.34,-.96,'Spacing, 8pt grid']].forEach(l=>label(3,l[0]-.08,l[1],-.36,g,l[2],a,'rgba(242,242,239,A)'));}
  const w4=wt(4); if(w4>.4){const a=(w4-.4)/.6; ctx.textAlign='center';
    FN.forEach(n=>{const [X1,Y1,Z1]=ROT[4](n[1]+.05,n[2]-.2,0);const p=proj(X1,Y1,Z1,g);ctx.fillStyle=`rgba(242,242,239,${.8*a})`;ctx.fillText(n[0],p[0],p[1]+4);});
    FE.forEach((e,j)=>{const s=((time*.35+j*.17)%1); const [x,y]=edgePoint(e,s); const [X1,Y1,Z1]=ROT[4](x+.05,y,0); const p=proj(X1,Y1,Z1,g);
      const grd=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],12); grd.addColorStop(0,`rgba(242,242,239,${.9*a})`); grd.addColorStop(1,'rgba(242,242,239,0)');
      ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(p[0],p[1],12,0,7); ctx.fill();}); ctx.textAlign='left';}
  const w5=wt(5); if(w5>.4){const a=(w5-.4)/.6; ctx.textAlign='center';
    NN.forEach(n=>label(5,n[1]*.92+.05,(n[2]-n[4]-.1)*.92,n[3]*.92,g,n[0],(a*(n[0]==='HubSpot'?1:.8)).toFixed(2),n[0]==='HubSpot'?'rgba(255,59,29,A)':'rgba(242,242,239,A)'));
    NE.forEach((e,j)=>{const s=((time*.32+j*.19)%1), q=nePoint(e,s); const [X1,Y1,Z1]=ROT[5](q[0]*.92+.05,q[1]*.92,q[2]*.92); const p=proj(X1,Y1,Z1,g);
      const grd=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],13); grd.addColorStop(0,`rgba(242,242,239,${.95*a})`); grd.addColorStop(1,'rgba(242,242,239,0)');
      ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(p[0],p[1],13,0,7); ctx.fill();}); ctx.textAlign='left';}
  const w6=wt(6); if(w6>.6){const a=((w6-.6)/.4).toFixed(2); for(const c of CITIES){ if(c[0]==='Abu Dhabi')continue; const [x,y,z]=ll(c[1],c[2],1.03); const [X1,Y1,Z1]=ROT[6](x,y,z); if(Z1<.1){const p=proj(X1,Y1,Z1,g);ctx.fillStyle=c[0]==='Pune'||c[0]==='Dubai'?`rgba(255,59,29,${a})`:`rgba(242,242,239,${a})`;ctx.fillText(c[0],p[0]+10,p[1]-8);}}}
}
requestAnimationFrame(frame);

/* chapters nav */
const chaps=[...document.querySelectorAll('#chaps button')];
chaps.forEach(b=>b.addEventListener('click',()=>{const c=+b.dataset.c, top=story.offsetTop+(story.offsetHeight-innerHeight)*(c/(NS-1));scrollTo({top,behavior:reduce?'auto':'smooth'});}));

/* ===== SCROLL ===== */
const reveal=document.getElementById('reveal');
reveal.innerHTML=reveal.textContent.split(' ').map(w=>'<span class="w">'+w+'</span>').join(' ');
const words=[...reveal.querySelectorAll('.w')];
function onScroll(){
  const r=story.getBoundingClientRect(); progress=clamp(-r.top/Math.max(1,r.height-innerHeight));
  drift=clamp((innerHeight*.9-r.bottom)/(innerHeight*.7));
  const s=progress*(NS-1);
  scenes.forEach(el=>{const j=+el.dataset.scene, o=clamp((.34-Math.abs(s-j))/.12); el.style.opacity=o; el.classList.toggle('on',o>.5);});
  const cur=Math.round(s); chaps.forEach((b,j)=>b.setAttribute('aria-current',j===cur));
  const rr=reveal.getBoundingClientRect(), rp=clamp((innerHeight*.85-rr.top)/(rr.height+innerHeight*.45));
  const lit=Math.floor(rp*words.length*1.05); words.forEach((w,i)=>w.classList.toggle('lit',i<lit));
  moveLedger(); paintBg();
}
addEventListener('scroll',onScroll,{passive:true});

/* ===== NOW: lead journey ===== */
const STAGES=[
  ['Capture','Listing pages, enquiry forms and campaign landing pages that send clean, structured data straight into HubSpot.','Drafting listing descriptions and campaign copy for a person to review and approve.',['HubSpot forms','Landing pages','Figma','Claude']],
  ['Qualify','Lifecycle stages, lead scoring properties and the handful of fields agents actually need to act.','Summarising each enquiry so an agent understands budget, area and timing in seconds.',['HubSpot CRM','Lead scoring','Properties']],
  ['Nurture','Email sequences and workflows that follow up at the right moment without flooding a client’s inbox.','Personalised variations that stay inside the brand’s tone of voice.',['HubSpot workflows','Sequences','Email design']],
  ['Hand over','The moment a lead moves from marketing to an agent: who receives it, what they see first, and what happens next.','Suggested next actions inside the agent app, always editable by the agent.',['HubSpot','Salesforce Agent App','Notifications']],
  ['Close and learn','Dashboards that show which sources convert, where deals stall, and what to change next quarter.','Plain-language summaries of pipeline changes for managers who don’t live in dashboards.',['HubSpot reports','Salesforce','Google Analytics']]
];
const pipe=document.getElementById('pipe'), ppanel=document.getElementById('ppanel'), pfill=document.getElementById('pfill'), prun=document.getElementById('prun');
pipe.insertAdjacentHTML('beforeend',STAGES.map((s,i)=>`<button role="tab" aria-selected="${i===0}" data-i="${i}"><small>Moment ${i+1}</small><strong>${s[0]}</strong></button>`).join(''));
const pbtns=[...pipe.querySelectorAll('button')];
const curStage=()=>Math.max(0,pbtns.findIndex(b=>b.getAttribute('aria-selected')==='true'));
function setStage(i){
  pbtns.forEach((b,j)=>b.setAttribute('aria-selected',j===i));
  const x=pbtns[i].offsetLeft; pfill.style.width=(x+6)+'px'; prun.style.left=x+'px';
  const s=STAGES[i];
  ppanel.classList.remove('swap'); void ppanel.offsetWidth; ppanel.classList.add('swap');
  ppanel.innerHTML=`<div><h3>What I design</h3><p>${s[1]}</p></div><div><h3>Where AI helps</h3><p>${s[2]}</p></div><div><h3>Tools</h3><div class="tl">${s[3].map(t=>'<span>'+t+'</span>').join('')}</div></div>`;
}
pipe.addEventListener('click',e=>{const b=e.target.closest('button');if(b)setStage(+b.dataset.i);});
pipe.addEventListener('keydown',e=>{const c=curStage();let n=c;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=Math.min(4,c+1);else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=Math.max(0,c-1);else return;e.preventDefault();setStage(n);pbtns[n].focus();});
setStage(0);

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
function sizeLedger(){if(mq.matches){ledger.style.height='auto';track.style.transform='none';return;}ledger.style.height=(innerHeight+Math.max(0,track.scrollWidth-innerWidth))+'px';moveLedger();}
function moveLedger(){if(mq.matches)return;const r=ledger.getBoundingClientRect(),ex=Math.max(0,track.scrollWidth-innerWidth),p=clamp(-r.top/Math.max(1,r.height-innerHeight));track.style.transform=`translate3d(${-ex*p}px,0,0)`;bar.style.width=(p*100)+'%';}

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
function fitWordmark(){wm.style.fontSize='100px';const w=[...wm.children].reduce((t,c)=>t+c.getBoundingClientRect().width,0)||1, avail=wm.clientWidth;wm.style.fontSize=(100*avail/w*.995)+'px';}
document.querySelectorAll('[data-chap]').forEach(b=>b.addEventListener('click',()=>{const c=+b.dataset.chap;scrollTo({top:story.offsetTop+(story.offsetHeight-innerHeight)*(c/(NS-1)),behavior:reduce?'auto':'smooth'});}));

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
