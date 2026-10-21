/* Hochdeutsch (Standard German). */
(()=>{
const {min:M, hour:HR}=Uhrzyt; // mark the minute part (orange) and the hour part (blue) of a phrase
const DE=["zwölf","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf"];
const DEM=["","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn","zwanzig"];
Uhrzyt.addLanguage("de",{
  name:"Hoch&shy;deutsch", flag:'<svg viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#dd0000"/><rect y="2" width="5" height="1" fill="#ffce00"/></svg>', html:"de", tts:"de-DE", voice:/de[-_]DE/i, voiceAny:/^de/i, read:"de", second:null, next:21, hours:DE, clock:" Uhr",
    say(h,m){ const H=h%12||12, N=H%12+1, hd=HR(H===1&&m===0?"ein":DE[H]), nd=HR(DE[N]);
      if(m===0) return `Es ist ${hd} Uhr`;
      if(m===15) return `${M("Viertel nach")} ${hd}`;
      if(m===30) return `${M("halb")} ${nd}`;
      if(m===45) return `${M("Viertel vor")} ${nd}`;
      if(m<=20) return `${M(DEM[m]+" nach")} ${hd}`;
      if(m<30) return `${M(DEM[30-m]+" vor halb")} ${nd}`;
      if(m<40) return `${M(DEM[m-30]+" nach halb")} ${nd}`;
      return `${M(DEM[60-m]+" vor")} ${nd}`; },
  texts:{doc:"Uhrzeit lernen",title:"Uhrzeit <span>lernen</span>",mode:"Modus",lern:"Üben",stell:"Uhr stellen",luege:"Wie spät?",
    say:"Man sagt",setTo:"Stell die Uhr auf",ask:"Wie spät ist es?",right:"Richtig",check:"Prüfen",next:"Nächste Aufgabe",
    miss:"Fast! Versuch es nochmal.",wins:["Super!","Bravo!","Genau so!","Toll gemacht!"],sub:"",
    hint:'Zieh den <b class="m">langen orangen Zeiger</b> für die Minuten und den <b class="h">kurzen blauen Zeiger</b> für die Stunden. Rechts ist „nach“, links ist „vor“.',
    after:"nach",before:"vor",clock:"Uhr",play:"Vorlesen",hr:"Std",hrBack:"Eine Stunde zurück",hrFwd:"Eine Stunde vorwärts",
    minBack:n=>n+" Minuten zurück",minFwd:n=>n+" Minuten vorwärts",
    settings:"Einstellungen",level:"Stufe",lang:"Sprache",sound:"Töne",on:"An",off:"Aus",done:"Fertig",
    lvlLong:{1:"Ganze & Halbe",2:"+ Viertel",3:"Alle 5 Minuten",4:"Alle Minuten"},lvlShort:{1:"Halbe",2:"Viertel",3:"5 Min",4:"1 Min"},
    tipFirst:"Hier kannst du Stufe, Sprache und Töne einstellen.",tipHard:"Zu schwer? Hier kannst du eine leichtere Stufe wählen.",
    now:"Jetzt",nowLabel:"Uhr auf jetzt stellen",show:"Zeig es mir",shown:"So geht's",
    hourWrong:"Minuten richtig, Stunde nicht.",minWrong:"Stunde richtig, Minuten nicht.",bothWrong:"Schau dir beide Zeiger an.",
    notYet:n=>`Es ist noch nicht ${n}!`,almost:n=>`Der kurze Zeiger ist schon fast bei der ${n}.`,
    extras:"Extras",soundLong:"Töne bei richtig & falsch",digiLong:"Digitale Zeit mit 24 Stunden",
    parts:{night:"in der Nacht",morning:"am Morgen",forenoon:"am Vormittag",noon:"am Mittag",afternoon:"am Nachmittag",evening:"am Abend"},
    album:"Deine Sterne",newBadge:n=>`🎉 ${n} Sterne!`,streak:n=>`🔥 ${n} ${n===1?"Tag":"Tage"} am Stück`,
    nextBadge:n=>`Noch ${n} Sterne bis zum nächsten Sticker`,allBadges:"Alle Sticker gesammelt!",
    medals:"Medaillen pro Stufe",newMedal:(e,l)=>`${e} Medaille „${l}“!`}
});
})();
