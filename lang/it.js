/* Italiano (Italian). Please have it proofread by a native speaker. */
(()=>{
const {min:M, hour:HR}=Uhrzyt; // mark the minute part (orange) and the hour part (blue) of a phrase
/* hours with their article: «le tre», «l'una» */
const IT=["le dodici","l'una","le due","le tre","le quattro","le cinque","le sei","le sette","le otto","le nove","le dieci","le undici","le dodici"];
const ITM=["","un minuto","due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici","tredici","quattordici","quindici","sedici","diciassette","diciotto","diciannove","venti",
  "ventuno","ventidue","ventitré","ventiquattro","venticinque","ventisei","ventisette","ventotto","ventinove","trenta","trentuno","trentadue","trentatré","trentaquattro"];
Uhrzyt.addLanguage("it",{
  name:"Italiano", flag:'<svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#ce2b37"/></svg>',
  html:"it", tts:"it-IT", voice:/it[-_]IT/i, voiceAny:/^it/i, read:"it", second:"ch", next:35, hours:IT, clock:"",
  // the hour, then «e» and the minutes up to :34; from :35 the next hour «meno»:
  // sono le tre · le tre e un quarto · le tre e mezza · le quattro meno venticinque · le quattro meno un quarto
  say(h,m){ const H=h%12||12, N=H%12+1, now=HR(IT[H]), next=HR(IT[N]);
    if(m===0) return H===1?`È ${now}`:`Sono ${now}`;
    if(m===15) return `${now} ${M("e un quarto")}`;
    if(m===30) return `${now} ${M("e mezza")}`;
    if(m===45) return `${next} ${M("meno un quarto")}`;
    if(m<35) return `${now} ${M("e "+ITM[m])}`;
    return `${next} ${M("meno "+ITM[60-m])}`; },
  texts:{doc:"Leggere l'ora",title:"Leggere <span>l'ora</span>",mode:"Modalità",lern:"Esercizio",stell:"Regola",luege:"Che ore?",
    say:"Si dice",setTo:"Regola l'orologio su",ask:"Che ore sono?",right:"Giusto",check:"Verifica",next:"Avanti",
    miss:"Quasi! Riprova.",wins:["Super!","Bravo!","Esatto!","Ottimo!"],sub:"Züritüütsch: ",
    hint:'Trascina la <b class="m">lancetta lunga arancione</b> per i minuti e la <b class="h">lancetta corta blu</b> per le ore. A destra «e», a sinistra «meno».',
    after:"e",before:"meno",clock:"Orologio",play:"Leggi ad alta voce",hr:"h",hrBack:"Un'ora indietro",hrFwd:"Un'ora avanti",
    minBack:n=>`${n} minut${n>1?"i":"o"} indietro`,minFwd:n=>`${n} minut${n>1?"i":"o"} avanti`,
    settings:"Impostazioni",level:"Livello",lang:"Lingua",sound:"Suoni",on:"Sì",off:"No",done:"Fatto",
    lvlLong:{1:"Ore e mezze",2:"+ quarti",3:"Ogni 5 minuti",4:"Ogni minuto"},lvlShort:{1:"Mezze",2:"Quarti",3:"5 min",4:"1 min"},
    tipFirst:"Qui puoi scegliere livello, lingua e suoni.",tipHard:"Troppo difficile? Scegli qui un livello più facile.",
    now:"Ora",nowLabel:"Imposta l'ora attuale",show:"Mostrami",shown:"Ecco",
    hourWrong:"Minuti giusti, ora no.",minWrong:"Ora giusta, minuti no.",bothWrong:"Guarda le due lancette.",
    notYet:n=>`Non ${n==="l'una"?"è":"sono"} ancora ${n}!`,almost:n=>`La lancetta corta è quasi ${n.replace(/^le /,"alle ").replace(/^l'/,"all'")}.`,
    extras:"Extra",soundLong:"Suoni per giusto e sbagliato",digiLong:"Ora digitale a 24 ore",
    parts:{night:"di notte",morning:"di mattina",forenoon:"di mattina",noon:"a mezzogiorno",afternoon:"di pomeriggio",evening:"di sera"},
    album:"Le tue stelle",newBadge:n=>`🎉 ${n} stelle!`,streak:n=>`🔥 ${n} giorn${n>1?"i":"o"} di fila`,
    nextBadge:n=>`Ancora ${n} stell${n>1?"e":"a"} per il prossimo adesivo`,allBadges:"Hai raccolto tutti gli adesivi!",
    medals:"Medaglie per livello",newMedal:(e,l)=>`${e} Medaglia «${l}»!`}
});
})();
