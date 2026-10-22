/* Aargauer Dütsch (Aargau German), shown under the «Schwiizerdütsch» group.
   Counts like Züritüütsch, with Aargau words: drü, zwöi, föif, sebe. Please have it proofread by someone from the Aargau. */
(()=>{
const {min:M, hour:HR}=Uhrzyt; // mark the minute part (orange) and the hour part (blue) of a phrase
const AG=["zwölfi","eis","zwöi","drü","vieri","föifi","sächsi","sebni","achti","nüni","zäni","elfi","zwölfi"];
const AGM=["","eis","zwöi","drü","vier","föif","sächs","sebe","acht","nüün","zäh","elf","zwölf","drizä","vierzä","füfzä","sächzä","sebezä","achzä","nünzä","zwänzg"];
Uhrzyt.addLanguage("ch-ag",{
  group:"Schwiizer&shy;dütsch", groupFlag:'<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" fill="#da291c"/><path fill="#fff" d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z"/></svg>', dialect:"Aargau", name:"Aargauer&shy;dütsch", flag:'<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" fill="#3a8ed4"/><rect width="16" height="32" fill="#111"/><path d="M0 13q4-3 8 0t8 0M0 20q4-3 8 0t8 0" fill="none" stroke="#fff" stroke-width="2.6"/><path fill="#fff" d="M20.5 6.6L21.3 8.9L23.7 8.9L21.8 10.4L22.5 12.8L20.5 11.4L18.5 12.8L19.2 10.4L17.3 8.9L19.7 8.9Z M27.5 6.6L28.3 8.9L30.7 8.9L28.8 10.4L29.5 12.8L27.5 11.4L25.5 12.8L26.2 10.4L24.3 8.9L26.7 8.9Z M24.0 17.1L24.8 19.4L27.2 19.4L25.3 20.9L26.0 23.3L24.0 21.9L22.0 23.3L22.7 20.9L20.8 19.4L23.2 19.4Z"/></svg>', html:"de-CH", tts:"de-CH", voice:/de[-_]CH/i, voiceAny:/^de/i, read:"de", second:"de", next:21, hours:AG, clock:" Uhr",
    // counted towards the nearest landmark: sebe ab drü · sebe vor halbi vieri · sebe ab halbi vieri · drizä vor vieri
    say(h,m){ const H=h%12||12, N=H%12+1, hc=HR(AG[H]), nc=HR(AG[N]);
      if(m===0) return `Es isch ${hc}`;
      if(m===15) return `${M("Viertel ab")} ${hc}`;
      if(m===30) return `${M("halbi")} ${nc}`;
      if(m===45) return `${M("Viertel vor")} ${nc}`;
      if(m<=20) return `${M(AGM[m]+" ab")} ${hc}`;
      if(m<30) return `${M(AGM[30-m]+" vor halbi")} ${nc}`;
      if(m<40) return `${M(AGM[m-30]+" ab halbi")} ${nc}`;
      return `${M(AGM[60-m]+" vor")} ${nc}`; },
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
    hourWrong:"D'Minute stimmt, d'Stund ned.",minWrong:"D'Stund stimmt, d'Minute ned.",bothWrong:"Lueg nomal beidi Zeiger aa.",
    notYet:n=>`Es isch no ned ${n}!`,almost:n=>`De churz Zeiger isch scho fasch bi de ${n}.`,
    extras:"Extras",soundLong:"Tön bi richtig & falsch",digiLong:"Digitali Ziit mit 24 Stund",
    parts:{night:"znacht",morning:"am Morge",forenoon:"am Vormittag",noon:"am Mittag",afternoon:"am Namittag",evening:"am Abig"},
    album:"Dini Stärn",newBadge:n=>`🎉 ${n} Stärn!`,streak:n=>`🔥 ${n} ${n===1?"Tag":"Täg"} hinterenand`,
    nextBadge:n=>`No ${n} Stärn bis zum nöchschte Sticker`,allBadges:"Alli Sticker gsammlet!",
    medals:"Medaille pro Stufe",newMedal:(e,l)=>`${e} Medaille «${l}»!`}
});
})();
