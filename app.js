/* Uhrzyt lerne — app */
(()=>{
const $=id=>document.getElementById(id);
/* ---------- languages ----------
   Every language lives in its own file in lang/ and registers itself with Uhrzyt.addLanguage (see LANGUAGES.md).
   The app lists them in the order index.html loads them. Missing texts fall back to English. */
const LANGS=window.Uhrzyt.langs;
const FALLBACK="en";
const TXT=Object.fromEntries(Object.keys(LANGS).map(k=>[k,{...((LANGS[FALLBACK]||{}).texts||{}),...LANGS[k].texts}]));
let lang="ch"; try{ const l=localStorage.getItem("uhr-lang"); if(Object.prototype.hasOwnProperty.call(LANGS,l)) lang=l; }catch(e){}
const L=()=>LANGS[lang];
const T=()=>TXT[lang];
const strip=x=>x.replace(/<[^>]+>/g,"");
/* a time in every language: {h, m, html:{ch,de,en,…}, text:{…}} */
function phrase(h,m){ const html={}, text={}; for(const k in LANGS){ html[k]=LANGS[k].say(h,m); text[k]=strip(html[k]); } return {h,m,html,text}; }
const nextAt=()=>L().next;
/* the language buttons in the settings come from the list above */
const langLabel=k=>{ const l=LANGS[k]; return l.group?`${l.group} (${l.dialect})`:l.name; }; // «Schwiizerdütsch (Züri)»
const langFlag=k=>LANGS[k].groupFlag||LANGS[k].flag;
let lastGroup=null;
for(const k in LANGS){
  const g=LANGS[k].group||null;
  if(g&&g!==lastGroup){ const hd=document.createElement("div"); hd.className="lgroup"; hd.innerHTML=`<span class="flag">${LANGS[k].groupFlag}</span><span>${g}</span>`; $("langs").append(hd); }
  lastGroup=g;
  const b=document.createElement("button"); b.type="button"; b.setAttribute("role","radio"); b.dataset.lang=k; b.lang=LANGS[k].html; if(g) b.className="dialect";
  b.innerHTML=`<span class="flag">${LANGS[k].flag}</span><span>${LANGS[k].name}</span><span class="ck" aria-hidden="true">✓</span>`;
  $("langs").append(b);
}
/* what the app shows for a phrase in the chosen language */
function setCh(html){ const el=document.getElementById("ch"); el.innerHTML=html; fitCh(); }
function fitCh(){ // shrink the phrase until it fits on one line
  const el=document.getElementById("ch"); el.style.fontSize="";
  if(el.scrollWidth>el.clientWidth+1) el.style.fontSize=(parseFloat(getComputedStyle(el).fontSize)*el.clientWidth/el.scrollWidth*.97)+"px";
}
addEventListener("resize",()=>requestAnimationFrame(fitCh));
const main=p=>p.html[lang];
const plain=p=>p.text[lang];
// the second line, e.g. Hochdeutsch under Swiss German, Swiss German under English (its prefix comes from CSS)
const sub=p=>L().second?p.text[L().second]:"";
/* text to speech: Hochdeutsch in the German modes, English in English; only from a real tap on the play button */
let cur=null, lastDragEnd=0;
try{localStorage.removeItem("uhr-voice")}catch(e){}
const tts="speechSynthesis" in window;
const hush=()=>{if(tts)speechSynthesis.cancel()};
function pickVoice(){
  const vs=tts?speechSynthesis.getVoices():[];
  const l=L(); return vs.find(v=>l.voice.test(v.lang))||vs.find(v=>l.voiceAny.test(v.lang))||null;
}
function speak(e){
  if(!tts||!cur||!e||!e.isTrusted) return;
  if(Date.now()-lastDragEnd<600) return; // a drag that ends on the button is not a tap
  const txt=cur.text[L().read];
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(txt); const v=pickVoice();
  if(v){u.voice=v;u.lang=v.lang}else u.lang=L().tts;
  u.rate=.85; speechSynthesis.speak(u);
}
/* feedback sounds, synthesized; they only follow an answer the child just tapped */
let actx=null, soundOn=true;
try{soundOn=localStorage.getItem("uhr-sound")!=="off"}catch(e){}
const ICON_ON="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z";
const ICON_OFF="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z";
function tone(f0,f1,t,dur,type,vol){
  const o=actx.createOscillator(), g=actx.createGain();
  o.type=type; o.frequency.setValueAtTime(f0,t); if(f1!==f0) o.frequency.exponentialRampToValueAtTime(f1,t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+.015); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g).connect(actx.destination); o.start(t); o.stop(t+dur+.02);
}
function sfx(ok){
  if(!soundOn) return;
  try{
    actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state==="suspended") actx.resume();
    const t=actx.currentTime+.02;
    if(ok){ [523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,f,t+i*.09,.32,"triangle",.22)); tone(2093,2093,t+.36,.4,"sine",.06); }
    else { tone(311,233,t,.22,"triangle",.22); tone(233,175,t+.2,.3,"triangle",.2); }
  }catch(e){}
}
function setSound(on){
  soundOn=on; $("muteIcon").setAttribute("d",on?ICON_ON:ICON_OFF);
  $("mute").setAttribute("aria-pressed",on); $("muteText").textContent=on?T().on:T().off;
  try{localStorage.setItem("uhr-sound",on?"on":"off")}catch(e){}
}
const dig=(h,m)=>`${h%12||12}:${String(m).padStart(2,"0")}`;

/* clock face */
const ticks=$("ticks"), nums=$("nums"), NS="http://www.w3.org/2000/svg";
const el=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e};
for(let i=0;i<60;i++){
  const a=i*6*Math.PI/180, big=i%5===0, r1=big?116:122, r2=128;
  ticks.append(el("line",{class:"tick",x1:150+r1*Math.sin(a),y1:150-r1*Math.cos(a),x2:150+r2*Math.sin(a),y2:150-r2*Math.cos(a),"stroke-width":big?4:1.5}));
}
for(let i=1;i<=12;i++){
  const a=i*30*Math.PI/180;
  const t=el("text",{class:"num",id:"n"+i,x:150+96*Math.sin(a),y:150-96*Math.cos(a)});t.textContent=i;nums.append(t);
  const mt=el("text",{class:"mnum",x:150+148*Math.sin(a),y:150-148*Math.cos(a)});mt.textContent=String(i*5%60).padStart(2,"0");nums.append(mt);
}

/* the hour number the phrase talks about lights up («halbi vieri» points at the 4) */
const glowEl=el("circle",{id:"glow",class:"glow",r:19,cx:150,cy:150});
nums.parentNode.insertBefore(glowEl,nums);
const hourRef=(hh,mm)=>{const H=hh%12||12; return mm>=nextAt()?H%12+1:H;};
function glowHour(n){
  document.querySelectorAll(".num.lit").forEach(x=>x.classList.remove("lit"));
  if(!n){ glowEl.classList.remove("on"); return; }
  const a=n*30*Math.PI/180; glowEl.setAttribute("cx",150+96*Math.sin(a)); glowEl.setAttribute("cy",150-96*Math.cos(a));
  glowEl.classList.add("on"); $("n"+n).classList.add("lit");
}

/* state */
let h=3, m=15, day=0, mode="lern", lvl=3, score=0, target=null, locked=false, missTask=0, nudgeT=0;
/* the time as minutes of the day; day is 0 before noon and 720 after (only shown with the 24 h display) */
const tot=()=>(h%12)*60+m+day;
function setTot(t){ t=((t%1440)+1440)%1440; day=t>=720?720:0; h=Math.floor(t%720/60)||12; m=t%60; }
const pad2=n=>String(n).padStart(2,"0");
const dig24=t=>`${pad2(Math.floor(t/60))}:${pad2(t%60)}`;
function dayPart(t){ const H=Math.floor(t/60), p=T().parts; return H<5?p.night:H<9?p.morning:H<12?p.forenoon:H<13?p.noon:H<18?p.afternoon:H<22?p.evening:p.night; }
let digital=false; try{digital=localStorage.getItem("uhr-digi")==="on"}catch(e){}
let hAngle=0, mAngle=0;
try{score=+localStorage.getItem("uhr-score")||0}catch(e){}
/* where the child left off: mode, level and the practice clock */
try{
  const st=JSON.parse(localStorage.getItem("uhr-state")||"{}");
  if(["lern","stell","luege"].includes(st.mode)) mode=st.mode;
  if([1,2,3,4].includes(st.lvl)) lvl=st.lvl;
  if(st.h>=1&&st.h<=12&&Number.isInteger(st.m)&&st.m>=0&&st.m<60){h=st.h;m=st.m;day=st.d===720?720:0}
}catch(e){}
let practice={h,m,day};
function saveState(){try{localStorage.setItem("uhr-state",JSON.stringify({mode,lvl,h:practice.h,m:practice.m,d:practice.day}))}catch(e){}}

function wedgePath(min){
  if(min===0) return "";
  const a=min*6*Math.PI/180, r=130, x=150+r*Math.sin(a), y=150-r*Math.cos(a);
  return `M150 150 L150 20 A${r} ${r} 0 ${min>30?1:0} 1 ${x} ${y} Z`;
}
function setAngle(cur,next){ // shortest rotation, keeps animation smooth across 12
  let d=((next-cur)%360+540)%360-180; return cur+d;
}
/* put the hands at any position: mm minutes on the minute hand, hh hours on the hour hand (both may be fractional) */
function pose(mm,hh){
  mAngle=setAngle(mAngle,mm*6);
  hAngle=setAngle(hAngle,hh*30);
  $("gm").style.transform=`rotate(${mAngle}deg)`;
  $("gh").style.transform=`rotate(${hAngle}deg)`;
  $("gm").style.transformOrigin=$("gh").style.transformOrigin="150px 150px";
  $("wedge").setAttribute("d",wedgePath((mm%60+60)%60));
}
function draw(){
  pose(m,(h%12)+m/60);
  if(mode==="lern"){
    if(practice.h!==h||practice.m!==m||practice.day!==day){practice={h,m,day};saveState();}
    const p=phrase(h,m);
    setCh(main(p)); $("de").textContent=sub(p);
    $("dig").textContent=digital?`${dig24(tot())} · ${dayPart(tot())}`:dig(h,m);
    cur=p; $("speak").hidden=!tts; glowHour(hourRef(h,m));
  }
}
function showTarget(){
  $("say").classList.remove("warn");
  if(mode==="stell"){
    const p=phrase(target.h,target.m);
    $("sayLabel").textContent=T().setTo; $("dig").textContent="";
    if(target.t24!=null){ // digital task: «15:45 · am Namittag»
      setCh(dig24(target.t24)); $("de").textContent=dayPart(target.t24); cur={text:Object.fromEntries(Object.keys(LANGS).map(k=>[k,dig24(target.t24)+LANGS[k].clock]))};
    } else { setCh(main(p)); $("de").textContent=""; cur=p; }
    $("speak").hidden=!tts;
  } else if(mode==="luege"){
    cur=null; $("speak").hidden=true;
    $("sayLabel").textContent=T().ask;
    setCh("?"); $("de").textContent=""; $("dig").textContent=""; $("say").classList.add("ask");
  }
}
function randTime(){
  const pool={1:[0,30],2:[0,15,30,45],3:[0,5,10,15,20,25,30,35,40,45,50,55],4:[...Array(60).keys()]}[lvl], mm=pool[Math.floor(Math.random()*pool.length)];
  if(digital&&mode==="stell"){ const H=6+Math.floor(Math.random()*17); return {h:H%12||12, m:mm, t24:H*60+mm}; } // 06:00 – 22:55
  return {h:1+Math.floor(Math.random()*12), m:mm};
}
const digT=t=>t.t24!=null?`${dig24(t.t24)} · ${dayPart(t.t24)}`:dig(t.h,t.m);
function starBurst(){
  if(matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const from=$("fb").getBoundingClientRect(), to=$("score").getBoundingClientRect();
  const x0=from.left+from.width/2, y0=from.top+from.height/2, x1=to.left+to.width/2-14, y1=to.top+to.height/2-16;
  const N=10;
  for(let i=0;i<N;i++){
    const s=document.createElement("span"); s.className="burst"; s.textContent="★"; document.body.append(s);
    const a=Math.PI*2*i/N+Math.random()*.4, r=80+Math.random()*70, mx=x0+Math.cos(a)*r, my=y0+Math.sin(a)*r*.8;
    const fly=i>=N-3, last=i===N-1; // the last three fly up into the score
    s.animate([
      {transform:`translate(${x0-14}px,${y0-16}px) scale(.2) rotate(0deg)`,opacity:0},
      {transform:`translate(${mx-14}px,${my-16}px) scale(1.2) rotate(${120+i*20}deg)`,opacity:1,offset:.35},
      fly?{transform:`translate(${x1}px,${y1}px) scale(.6) rotate(360deg)`,opacity:1}
         :{transform:`translate(${mx-14}px,${my+50}px) scale(.5) rotate(${240+i*20}deg)`,opacity:0}
    ],{duration:fly?900+(i-N+3)*90:900+i*30,easing:"cubic-bezier(.2,.7,.3,1)",fill:"forwards"}).onfinish=()=>{
      s.remove(); if(last){ $("score").classList.remove("pop"); void $("score").offsetWidth; $("score").classList.add("pop"); }
    };
  }
}
function setScore(d){score=Math.max(0,score+d);$("score").textContent="★ "+score;try{localStorage.setItem("uhr-score",score)}catch(e){}}

function syncDock(){
  $("dock").hidden=mode==="lern"||($("check").hidden&&$("nextRow").hidden&&$("showRow").hidden&&!$("fb").textContent);
}
function newTask(){
  hush(); locked=false; missTask=0; $("fb").textContent=""; $("fb").className="feedback";
  $("nextRow").hidden=true; $("showRow").hidden=true; $("check").hidden=mode!=="stell";
  $("say").classList.remove("warn"); glowHour(null);
  target=randTime();
  if(mode==="stell"){ h=12; m=0; draw(); showTarget(); }
  if(mode==="luege"){
    h=target.h; m=target.m; draw(); showTarget();
    const set=new Map([[`${target.h}:${target.m}`,target]]), H=target.h%12||12;
    while(set.size<3){
      // tricky distractors: for «halbi …» the hour the hand just passed (the classic trap), else the next hour; or mirrored ab/vor
      const r=Math.random(), t= r<.4?{h:target.m>=nextAt()?(H+10)%12+1:H%12+1,m:target.m}: r<.7?{h:target.h,m:(60-target.m)%60}:randTime();
      set.set(`${t.h}:${t.m}`,t);
    }
    const arr=[...set.values()].sort(()=>Math.random()-.5);
    const box=$("opts"); box.innerHTML="";
    arr.forEach((t,i)=>{
      const b=document.createElement("button"); b.className="btn"; b.id="opt"+i;
      b.textContent=plain(phrase(t.h,t.m)).replace(/-/g,"‑"); b.classList.toggle("long",b.textContent.length>16); b.classList.toggle("xlong",b.textContent.length>20); // keep «twenty‑seven» together
      const ok=t.h===target.h&&t.m===target.m; if(ok) b.dataset.ok="1";
      b.onclick=()=>{
        if(locked) return;
        if(ok){ locked=true; b.classList.add("right"); win(); }
        else { b.classList.add("wrong"); lose(...explain(t.h,t.m)); }
      };
      box.append(b);
    });
  }
  syncDock();
}
function win(){
  misses=0; $("say").classList.remove("ask","warn");
  const p=phrase(target.h,target.m);
  $("fb").innerHTML=T().wins[Math.floor(Math.random()*4)]+' <span class="fb-star">★</span>';
  $("fb").className="feedback"; void $("fb").offsetWidth; $("fb").className="feedback ok";
  sfx(true); setScore(1);
  $("sayLabel").textContent=T().right; setCh(main(p)); $("de").textContent=sub(p); $("dig").textContent=digT(target);
  cur=p; $("speak").hidden=!tts; glowHour(hourRef(target.h,target.m));
  $("showRow").hidden=true; $("check").hidden=true; $("nextRow").hidden=false; syncDock(); starBurst();
  bumpStreak();
  (medals[lang]||(medals[lang]={}))[lvl]=lvlCount(lang,lvl)+1;
  try{localStorage.setItem("uhr-medals",JSON.stringify(medals))}catch(e){}
  const wonLvl=lvl, b=BADGES.find(x=>x.n===score);
  let md=MEDALS.find(x=>x.n===lvlCount(lang,wonLvl));
  if(md&&[1,2,3,4].some(k=>k>wonLvl&&lvlCount(lang,k)>=md.n)) md=null; // already shown here through a harder level
  labelSteps(); // a new medal shows on the settings button
  if(b||md) setTimeout(()=>openAlbum(b?b.n:0,md?wonLvl:0),1300);
}
/* what is off: ["h"|"m"|"hm", message] for a guessed hour and minute */
function explain(gh,gm){
  const t=T(), names=L().hours, H=target.h%12||12, N=H%12+1;
  const hourOk=gh%12===target.h%12, minOk=gm===target.m;
  if(minOk&&!hourOk){
    if(target.m>=nextAt()&&mode==="stell"&&gh%12===N%12) return ["h",t.notYet(names[N])];   // set the hour hand onto the spoken hour
    if(target.m>=nextAt()&&mode==="luege"&&gh%12===(H+11)%12) return ["h",t.almost(names[N])]; // read the hour the hand just passed
    return ["h",t.hourWrong];
  }
  if(hourOk&&!minOk) return ["m",t.minWrong];
  return ["hm",t.bothWrong];
}
function lose(which,msg){
  missTask++;
  // three misses in a row: point at the settings once per level and session, if an easier level exists
  if(++misses>=3&&lvl>1&&!offered.has(lvl)){ offered.add(lvl); showTip("tipHard"); }
  sfx(false);
  const s=$("say"); s.classList.add("warn"); s.classList.remove("shake"); void s.offsetWidth; s.classList.add("shake");
  $("sayLabel").textContent=msg;
  clearTimeout(nudgeT); $("gh").classList.remove("nudge"); $("gm").classList.remove("nudge"); void $("clock").getBoundingClientRect();
  if(which.includes("h")) $("gh").classList.add("nudge");
  if(which.includes("m")) $("gm").classList.add("nudge");
  nudgeT=setTimeout(()=>{ $("gh").classList.remove("nudge"); $("gm").classList.remove("nudge"); },1800);
  if(missTask>=2){ $("fb").textContent=""; $("fb").className="feedback"; $("showRow").hidden=false; } // offer «Zeig mer's»
  else { $("fb").textContent=T().miss; $("fb").className="feedback"; void $("fb").offsetWidth; $("fb").className="feedback no"; }
  syncDock();
}
/* «Zeig mer's»: show the answer (no star), then on to the next task */
function reveal(){
  if(locked) return; locked=true; hush();
  const p=phrase(target.h,target.m);
  if(mode==="stell"){ h=target.h; m=target.m; draw(); }
  else document.querySelectorAll("#opts .btn[data-ok]").forEach(b=>b.classList.add("right"));
  $("say").classList.remove("ask","warn");
  $("sayLabel").textContent=T().shown; setCh(main(p)); $("de").textContent=sub(p); $("dig").textContent=digT(target);
  cur=p; $("speak").hidden=!tts; glowHour(hourRef(target.h,target.m));
  $("fb").textContent=""; $("showRow").hidden=true; $("check").hidden=true; $("nextRow").hidden=false; syncDock();
}

/* stickers and day streak */
const BADGES=[{n:10,e:"🐣"},{n:25,e:"🐢"},{n:50,e:"🦊"},{n:100,e:"🦁"},{n:200,e:"🦄"},{n:500,e:"🚀"}];
/* medals: per language and level (each its own stars); the stickers follow the overall stars across all languages.
   A medal earned on a harder level also counts for the easier ones (5-minute times include the half hours). */
const MEDALS=[{n:10,e:"🥉"},{n:25,e:"🥈"},{n:50,e:"🥇"}];
let medals={}; try{ medals=JSON.parse(localStorage.getItem("uhr-medals"))||{}; localStorage.removeItem("uhr-lvlstars"); }catch(e){}
const lvlCount=(lg,l)=>(medals[lg]&&medals[lg][l])||0;
const hasMedal=(lg,l,x)=>[1,2,3,4].some(k=>k>=l&&lvlCount(lg,k)>=x.n);
const bestMedal=l=>[...MEDALS].reverse().find(x=>hasMedal(lang,l,x));
let streak={last:"",n:0}; try{streak=JSON.parse(localStorage.getItem("uhr-streak"))||streak}catch(e){}
const dayKey=d=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const yesterday=()=>{const d=new Date(); d.setDate(d.getDate()-1); return dayKey(d);};
function bumpStreak(){
  const today=dayKey(new Date());
  if(streak.last===today) return;
  streak={last:today,n:streak.last===yesterday()?streak.n+1:1};
  try{localStorage.setItem("uhr-streak",JSON.stringify(streak))}catch(e){}
}
const liveStreak=()=>streak.last===dayKey(new Date())||streak.last===yesterday()?streak.n:0;
function openAlbum(fresh,freshLvl){
  const t=T(), al=$("album");
  if(al.open||$("settings").open) return;
  const fm=freshLvl&&MEDALS.find(x=>x.n===lvlCount(lang,freshLvl));
  $("albTitle").textContent=fm?t.newMedal(fm.e,t.lvlShort[freshLvl]):fresh?t.newBadge(fresh):t.album;
  $("medLabel").textContent=t.medals+" · "+strip(langLabel(lang)).replace(/­/g,"").replace(/&shy;/g,""); // the medals of the language in use
  $("medals").innerHTML=[1,2,3,4].map(l=>{ const c=lvlCount(lang,l), got=MEDALS.filter(x=>hasMedal(lang,l,x)).map(x=>x.e).join(" ");
    return `<div class="lvm${l===lvl?" cur":""}" role="img" aria-label="${t.lvlLong[l]}: ★ ${c}${got?" "+got:""}"><span class="ln" aria-hidden="true">${t.lvlShort[l]}</span><span class="ls" aria-hidden="true">★ ${c}</span><span class="mm" aria-hidden="true">${MEDALS.map(x=>`<i class="${hasMedal(lang,l,x)?"got":""}${fm&&x===fm&&l<=freshLvl&&(l===freshLvl||lvlCount(lang,l)<fm.n)?" fresh":""}">${x.e}</i>`).join("")}</span></div>`; }).join("");
  $("albStars").textContent="★ "+score;
  const sk=liveStreak(); $("albStreak").textContent=sk?t.streak(sk):"";
  $("badges").innerHTML=BADGES.map(b=>`<div class="badge${score>=b.n?" got":""}${b.n===fresh?" fresh":""}" role="img" aria-label="${b.n} ★${score>=b.n?" ✓":""}"><span class="em" aria-hidden="true">${b.e}</span><span class="bn" aria-hidden="true">★ ${b.n}</span></div>`).join("");
  const nx=BADGES.find(b=>b.n>score); $("albNext").textContent=nx?t.nextBadge(nx.n-score):t.allBadges;
  hush(); if(al.showModal) al.showModal(); else al.setAttribute("open","");
}

function setMode(md){
  hush(); locked=false; $("say").classList.remove("ask","warn"); document.body.dataset.mode=md;
  if(md==="lern"&&mode!=="lern"){h=practice.h;m=practice.m;day=practice.day}
  mode=md; saveState();
  document.querySelectorAll(".tabs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.mode===md));
  $("controls").hidden=md==="luege"; $("check").hidden=md!=="stell"; $("opts").hidden=md!=="luege";
  $("hint").hidden=md==="luege"; $("now").hidden=md!=="lern";
  $("fb").textContent=""; $("nextRow").hidden=true; $("showRow").hidden=true;
  if(md!=="lern") glowHour(null);
  if(md==="lern"){ $("sayLabel").textContent=T().say; draw(); snapM(); syncDock(); } else newTask();
}

/* controls */
const gran=()=>({1:30,2:15,3:5,4:1})[lvl];
function snapM(){ const g=gran(); if(m%g){ setTot(Math.round(tot()/g)*g); draw(); } }
function labelSteps(){ const g=gran(), t=T(); $("mp").textContent="+ "+g; $("mm").textContent="− "+g;
  const md=bestMedal(lvl); $("lvlChip").textContent=t.lvlShort[lvl]+(md?" "+md.e:""); $("gear").setAttribute("aria-label",t.settings+" – "+t.level+": "+t.lvlLong[lvl]);
  $("mp").setAttribute("aria-label",t.minFwd(g)); $("mm").setAttribute("aria-label",t.minBack(g)); }
/* put every fixed text into the chosen language */
function applyLang(){
  const t=T();
  document.documentElement.lang=L().html; document.title=t.doc;
  document.querySelector("h1").innerHTML=t.title;
  $("t-lern").textContent=t.lern; $("t-stell").textContent=t.stell; $("t-luege").textContent=t.luege;
  document.querySelector(".tabs").setAttribute("aria-label",t.mode);
  $("clock").setAttribute("aria-label",t.clock); $("sideA").textContent=t.after; $("sideB").textContent=t.before;
  $("play").setAttribute("aria-label",t.play);
  $("hm").textContent="− "+t.hr; $("hp").textContent="+ "+t.hr;
  $("hm").setAttribute("aria-label",t.hrBack); $("hp").setAttribute("aria-label",t.hrFwd);
  $("go").textContent=t.check; $("next").textContent=t.next; $("hint").innerHTML=t.hint;
  $("setTitle").textContent=t.settings; $("langLabel").textContent=t.lang; $("lvLabel").textContent=t.level;
  $("soundLabel").textContent=t.sound; $("done").textContent=t.done;
  $("now").textContent=t.now; $("now").setAttribute("aria-label",t.nowLabel); $("show").textContent=t.show;
  $("extraLabel").textContent=t.extras; $("mute").setAttribute("aria-label",t.soundLong); $("digi").setAttribute("aria-label",t.digiLong);
  $("albDone").textContent=t.done; setDigi(); $("de").dataset.pre=t.sub;
  document.querySelectorAll(".levels button").forEach(b=>b.firstChild.textContent=t.lvlLong[b.dataset.lvl]+" ");
  document.querySelectorAll("#langs button").forEach(b=>b.setAttribute("aria-checked",b.dataset.lang===lang));
  $("langFlag").innerHTML=langFlag(lang); $("langName").innerHTML=langLabel(lang); $("gearFlag").innerHTML=langFlag(lang);
  $("langTitle").textContent=t.lang; $("langDone").textContent=t.done;
  if(!$("tip").hidden&&tipKind) $("tip").textContent=t[tipKind];
  labelSteps(); setSound(soundOn);
}
let tickT=0;
function step(dm){
  // small steps tick like a clock; bigger ones glide
  clearTimeout(tickT); $("hands").classList.toggle("tick",Math.abs(dm)<=5); tickT=setTimeout(()=>$("hands").classList.remove("tick"),250);
  // turn the hands the way the button says (a half turn would otherwise go backwards)
  mAngle+=dm*6; hAngle+=dm/2;
  setTot(tot()+dm); draw();
}
$("mp").onclick=()=>step(gran()); $("mm").onclick=()=>step(-gran());
$("hp").onclick=()=>step(60); $("hm").onclick=()=>step(-60);
$("go").onclick=()=>{ if(locked) return; if(h%12===target.h%12&&m===target.m){locked=true;win();} else lose(...explain(h,m)); };
$("show").onclick=reveal;
$("now").onclick=()=>{ const d=new Date(), g=gran(); setTot(Math.round((d.getHours()*60+d.getMinutes())/g)*g); draw(); };
$("score").onclick=()=>openAlbum(0,0);
function setDigi(){ $("digi").setAttribute("aria-pressed",digital); $("digiText").textContent=digital?T().on:T().off; }
$("digi").onclick=()=>{ digital=!digital; try{localStorage.setItem("uhr-digi",digital?"on":"off")}catch(e){} setDigi(); setMode(mode); };
$("next").onclick=newTask;
$("play").onclick=speak;
$("mute").onclick=()=>setSound(!soundOn);
const dlg=$("settings");
/* first launch: point at the settings once; gone for good after the tip or the settings are opened */
let tipSeen=true; try{tipSeen=!!localStorage.getItem("uhr-tip")}catch(e){}
let misses=0, tipKind=null; const offered=new Set();
function showTip(kind){ tipKind=kind; $("tip").textContent=T()[kind]; $("tip").hidden=false; $("gear").classList.add("new"); }
function hideTip(){ $("tip").hidden=true; $("gear").classList.remove("new"); try{localStorage.setItem("uhr-tip","1")}catch(e){} }
if(!tipSeen) showTip("tipFirst");
$("tip").onclick=hideTip;
$("gear").onclick=()=>{ hush(); hideTip(); if(dlg.showModal) dlg.showModal(); else dlg.setAttribute("open",""); };
dlg.addEventListener("click",e=>{ if(e.target===dlg) dlg.close(); }); // tap outside closes
$("album").addEventListener("click",e=>{ if(e.target===$("album")) $("album").close(); });
if(tts) speechSynthesis.onvoiceschanged=()=>{};
document.addEventListener("visibilitychange",()=>{if(document.hidden)hush()});
window.addEventListener("pagehide",hush);
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
$("langPick").onclick=()=>{ const d=$("langDlg"); if(d.showModal) d.showModal(); else d.setAttribute("open","");
  const c=d.querySelector('[aria-checked="true"]'); if(c) c.scrollIntoView({block:"nearest"}); };
$("langDlg").addEventListener("click",e=>{ if(e.target===$("langDlg")) $("langDlg").close(); });
document.querySelectorAll("#langs button").forEach(b=>b.onclick=()=>{
  lang=b.dataset.lang; try{localStorage.setItem("uhr-lang",lang)}catch(e){}
  hush(); applyLang(); setMode(mode); $("langDlg").close();
});
document.querySelectorAll(".levels button").forEach(b=>b.onclick=()=>{
  lvl=+b.dataset.lvl; document.querySelectorAll(".levels button").forEach(x=>x.setAttribute("aria-pressed",x===b));
  misses=0; saveState(); labelSteps(); if(mode!=="lern") newTask(); else snapM();
});

/* dragging */
const svg=$("clock"); let drag=null, acc=0, lastA=0, acc0=0, start=0, day0=0, lastTick=0;
/* while dragging, the minute hand jumps whole minutes (6°); a short buzz at each stop of the level
   (every 5 minutes in «5 Min», every half hour in «Halbi»), where phones support it */
function tickPose(){
  const tm=Math.round(acc), g=gran();
  if(tm!==lastTick){
    if(lastTick!==null&&((tm%g)+g)%g===0&&soundOn&&navigator.vibrate) try{navigator.vibrate(15)}catch(e){}
    lastTick=tm;
  }
  pose(tm,tm/60);
}
let dragCTM=null; // the clock's position when the drag started; layout changes can no longer feed back into the angle
function pt(e){const q=new DOMPoint(e.clientX,e.clientY).matrixTransform(dragCTM||svg.getScreenCTM().inverse());return{x:q.x-150,y:q.y-150}}
const angOf=p=>(Math.atan2(p.x,-p.y)*180/Math.PI+360)%360;
const angDiff=(a,b)=>Math.abs(((a-b)%360+540)%360-180);
svg.addEventListener("pointerdown",e=>{
  if(mode==="luege"||locked||!e.isPrimary) return;
  e.preventDefault();
  const p=pt(e), d=Math.hypot(p.x,p.y), a=angOf(p);
  const dH=angDiff(a,((h%12)+m/60)*30), dM=angDiff(a,m*6);
  // hour hand: anywhere near it inside the face; on overlap the inner part means hour
  drag=(d<100 && dH<45 && (dH<dM || d<80)) ? "h" : "m";
  dragCTM=svg.getScreenCTM().inverse();
  svg.setPointerCapture(e.pointerId); $("hands").classList.add("dragging");
  $(drag==="h"?"gh":"gm").classList.add("active");
  if(drag==="m"){ // tap sets the minute directly, without touching the hour
    const nm=Math.round(a/6/gran())*gran()%60; if(nm!==m){m=nm;draw();}
    acc=(h%12)*60+m+((a/6-m)%60+90)%60-30; lastA=a; // finger position in minutes, followed as it turns
    start=(h%12)*60+m; acc0=acc; day0=day;
    lastTick=null; tickPose();
  } else move(e);
});
function move(e){
  if(!drag) return;
  const a=angOf(pt(e)), g=gran();
  // the hands follow the finger smoothly; the time itself is the nearest allowed step (shown live in the phrase)
  if(drag==="m"){
    // follow the finger's actual turning, so passing 12 carries the hour forwards or back
    acc+=(((a-lastA)%360+540)%360-180)/6; lastA=a;
    // any real move goes at least one stop that way; past one stop, the nearest stop wins
    const moved=acc-acc0;
    let t=Math.abs(moved)<=g*.2 ? start : Math.abs(moved)<=g ? start+Math.sign(moved)*g : Math.round(acc/g)*g;
    const before=tot(); setTot(t+day0); if(tot()!==before) draw();
    tickPose();
  } else {
    const nh=Math.round((a-m/2)/30+12)%12||12;
    if(nh!==h){ setTot(tot()+((((nh%12)-(h%12))%12+18)%12-6)*60); draw(); } // shortest way, so passing 12 flips morning/afternoon
    pose(m,a/30);
  }
}
svg.addEventListener("pointermove",move);
const end=()=>{
  const was=drag; if(was)lastDragEnd=Date.now(); drag=null; dragCTM=null;
  $("hands").classList.remove("dragging");$("gh").classList.remove("active");$("gm").classList.remove("active");
  if(was) requestAnimationFrame(draw); // let go: the hands glide to the time they stand for
};
svg.addEventListener("pointerup",end); svg.addEventListener("pointercancel",end);

document.querySelectorAll(".levels button").forEach(x=>x.setAttribute("aria-pressed",+x.dataset.lvl===lvl));
setScore(0); applyLang(); setMode(mode);
// no offline cache when testing locally, so edits show on a plain reload
const local=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
if(local&&"serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister())).catch(()=>{});
else if(document.querySelector('link[rel="manifest"]')&&"serviceWorker" in navigator){
  try{navigator.serviceWorker.register("sw.js").catch(()=>{})}catch(e){}
}
})();
