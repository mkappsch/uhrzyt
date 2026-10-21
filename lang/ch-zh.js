/* Züritüütsch (Zurich German), shown under the «Schwiizerdütsch» group.
   Its code stays "ch" so saved progress (language, medals) keeps working. */
(()=>{
const {min:M, hour:HR}=Uhrzyt; // mark the minute part (orange) and the hour part (blue) of a phrase
const CH=["zwölfi","eis","zwei","drüü","vieri","füfi","sächsi","sibni","achti","nüüni","zäni","elfi","zwölfi"];
const CHM=["","eis","zwei","drüü","vier","füüf","sächs","sibe","acht","nüün","zäh","elf","zwölf","drizää","vierzää","füfzää","sächzää","sibezää","achzää","nünzää","zwänzg"];
Uhrzyt.addLanguage("ch",{
  // Swiss German dialects share a group in the language list; each dialect is its own block (Bärndütsch, Baseldytsch … can follow)
  group:"Schwiizer&shy;dütsch", groupFlag:'<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" fill="#da291c"/><path fill="#fff" d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z"/></svg>', dialect:"Züri", name:"Züri&shy;tüütsch", flag:'<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" fill="#fff"/><path d="M0 0L32 32H0z" fill="#1d63c2"/></svg>', html:"de-CH", tts:"de-CH", voice:/de[-_]CH/i, voiceAny:/^de/i, read:"de", second:"de", next:21, hours:CH, clock:" Uhr",
    // counted towards the nearest landmark: sibe ab drüü · sibe vor halbi vieri · sibe ab halbi vieri · drizää vor vieri
    say(h,m){ const H=h%12||12, N=H%12+1, hc=HR(CH[H]), nc=HR(CH[N]);
      if(m===0) return `Es isch ${hc}`;
      if(m===15) return `${M("Viertel ab")} ${hc}`;
      if(m===30) return `${M("halbi")} ${nc}`;
      if(m===45) return `${M("Viertel vor")} ${nc}`;
      if(m<=20) return `${M(CHM[m]+" ab")} ${hc}`;
      if(m<30) return `${M(CHM[30-m]+" vor halbi")} ${nc}`;
      if(m<40) return `${M(CHM[m-30]+" ab halbi")} ${nc}`;
      return `${M(CHM[60-m]+" vor")} ${nc}`; },
  texts:{doc:"Uhrzyt Lerne",title:"Uhrzyt <span>lerne</span>",mode:"Modus",lern:"Üebe",stell:"Stell d'Uhr",luege:"Wie spoot?",
    say:"Mer seit",setTo:"Stell d'Uhr uf",ask:"Wie spoot isch es?",right:"Richtig",check:"Prüefe",next:"Nöchschti Uufgab",
    miss:"Fasch! Probier nomal.",wins:["Super!","Bravo!","Genau so!","Toll gmacht!"],sub:"Hochdütsch: ",
    hint:'Zieh de <b class="m">langi oranschi Zeiger</b> für d\'Minute und de <b class="h">churzi blaui Zeiger</b> für d\'Stund. Rächts isch «ab», links isch «vor».',
    after:"ab",before:"vor",clock:"Uhr",play:"Hochdütsch vorläse",hr:"Std",hrBack:"Eis Stund zrugg",hrFwd:"Eis Stund vorwärts",
    minBack:n=>n+" Minute zrugg",minFwd:n=>n+" Minute vorwärts",
    settings:"Iistellige",level:"Stufe",lang:"Sprooch",sound:"Tön",on:"Ii",off:"Us",done:"Fertig",
    lvlLong:{1:"Ganzi & Halbi",2:"+ Viertel",3:"Alli 5 Minute",4:"Alli Minute"},lvlShort:{1:"Halbi",2:"Viertel",3:"5 Min",4:"1 Min"},
    tipFirst:"Do chasch d'Stufe, d'Sprooch und d'Tön iistelle.",tipHard:"Z'schwär? Do chasch e liechteri Stufe wähle.",
    now:"Jetzt",nowLabel:"Uhr uf jetzt stelle",show:"Zeig mer's",shown:"So gaht's",
    hourWrong:"D'Minute stimmt, d'Stund nöd.",minWrong:"D'Stund stimmt, d'Minute nöd.",bothWrong:"Lueg nomal beidi Zeiger aa.",
    notYet:n=>`Es isch no nöd ${n}!`,almost:n=>`De churz Zeiger isch scho fasch bi de ${n}.`,
    extras:"Extras",soundLong:"Tön bi richtig & falsch",digiLong:"Digitali Ziit mit 24 Stund",
    parts:{night:"znacht",morning:"am Morge",forenoon:"am Vormittag",noon:"am Mittag",afternoon:"am Namittag",evening:"am Abig"},
    album:"Dini Stärn",newBadge:n=>`🎉 ${n} Stärn!`,streak:n=>`🔥 ${n} ${n===1?"Tag":"Täg"} hinterenand`,
    nextBadge:n=>`No ${n} Stärn bis zum nöchschte Sticker`,allBadges:"Alli Sticker gsammlet!",
    medals:"Medaille pro Stufe",newMedal:(e,l)=>`${e} Medaille «${l}»!`}
});
})();
