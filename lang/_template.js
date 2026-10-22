/* TEMPLATE for a new language — copy this file to lang/<code>.js and fill it in.
   Step by step: see LANGUAGES.md. This file itself is not loaded by the app.

   Everything here is an example in English. Replace the words, keep the structure.
   Run tools/language-check.html to find missing texts or broken time rules. */
(()=>{
const {min:M, hour:HR}=Uhrzyt; // M("…") marks the minute part of a phrase (orange), HR("…") the hour part (blue)

/* Hour names, index 0–12 (index 0 and 12 are both "twelve"). Also used in the help texts
   «It's not four yet!» and «The short hand is nearly at four.», so write them as they fit there. */
const HOURS=["twelve","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];
/* Minute words, index 1–29 (index 0 unused). Extend if your language needs more. */
const MINS=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty",
  "twenty-one","twenty-two","twenty-three","twenty-four","twenty-five","twenty-six","twenty-seven","twenty-eight","twenty-nine"];

Uhrzyt.addLanguage("xx",{                 // a short code, e.g. "it", "es", "ch-be" (Bärndütsch); must be unique
  name:"Language",                         // the language's own name, as shown in the language list ("Italiano")
  // dialects of one language can share a heading in the list:
  // group:"Schwiizer&shy;dütsch", groupFlag:'<svg …>', dialect:"Bärn",
  flag:'<svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="3" height="2" fill="#888"/></svg>', // a small SVG, shown round
  html:"xx",                               // language tag for the page, e.g. "it", "de-CH"
  tts:"xx-XX",                             // language for reading aloud if no matching voice is found, e.g. "it-IT"
  voice:/xx[-_]XX/i, voiceAny:/^xx/i,      // preferred voice, then any voice of the language
  read:"xx",                               // whose phrase is read aloud (usually this code; Swiss German reads "de")
  second:"ch",                             // code of a language shown as second line under each phrase, or null
  next:31,                                 // from which minute the phrase names the NEXT hour (English: 31 «twenty-nine to four»,
                                           //  German: 21 «neun vor halb vier», French: 35 «quatre heures moins vingt-cinq»;
                                           //  60 if it never names the next hour, like Thai)
  hours:HOURS,
  clock:"",                                // added after a digital time for reading aloud (German: " Uhr")

  /* How a time is said. h = 1–12, m = 0–59. Return text with the hour part in HR(…) and the minute part in M(…).
     H is the current hour, N the next one. Check every minute in tools/language-check.html. */
  say(h,m){ const H=h%12||12, N=H%12+1, now=HR(HOURS[H]), next=HR(HOURS[N]), mins=k=>k===1?"one minute":MINS[k];
    if(m===0) return `It's ${now} o'clock`;
    if(m===15) return `${M("quarter past")} ${now}`;
    if(m===30) return `${M("half past")} ${now}`;
    if(m===45) return `${M("quarter to")} ${next}`;
    if(m<30) return `${M(mins(m)+" past")} ${now}`;
    return `${M(mins(60-m)+" to")} ${next}`; },

  /* Every text of the app. Missing ones fall back to English. Keep ${…} placeholders and HTML tags as they are. */
  texts:{
    doc:"Tell the Time", title:"Tell <span>the time</span>",           // browser tab title; app title (the <span> part is orange)
    mode:"Mode", lern:"Practise", stell:"Set clock", luege:"What time?", // the three tabs — keep them short
    say:"We say", setTo:"Set the clock to", ask:"What time is it?", right:"Right",
    check:"Check", next:"Next",
    miss:"Almost! Try again.", wins:["Great!","Well done!","Exactly!","Brilliant!"], // exactly 4 cheers
    sub:"Züritüütsch: ",                   // prefix of the second line (matches "second" above; "" if none)
    hint:'Drag the <b class="m">long orange hand</b> for the minutes and the <b class="h">short blue hand</b> for the hours. Right is “past”, left is “to”.',
    after:"past", before:"to",             // words on the right / left half of the clock face
    clock:"Clock", play:"Read aloud",
    hr:"hr", hrBack:"One hour back", hrFwd:"One hour forward",
    minBack:n=>`${n} minute${n>1?"s":""} back`, minFwd:n=>`${n} minute${n>1?"s":""} forward`,
    settings:"Settings", level:"Level", lang:"Language", sound:"Sounds", on:"On", off:"Off", done:"Done",
    lvlLong:{1:"Hours & halves",2:"+ quarters",3:"Every 5 minutes",4:"Every minute"},
    lvlShort:{1:"Halves",2:"Quarters",3:"5 min",4:"1 min"},           // short, shown on the settings button
    tipFirst:"Here you can change the level, language and sounds.", tipHard:"Too hard? Pick an easier level here.",
    now:"Now", nowLabel:"Set the clock to now",                         // "now" must fit a small button
    show:"Show me", shown:"Here's how",
    hourWrong:"Minutes right, hour not.", minWrong:"Hour right, minutes not.", bothWrong:"Look at both hands again.",
    notYet:n=>`It's not ${n} yet!`, almost:n=>`The short hand is nearly at ${n}.`, // n is an entry of HOURS
    extras:"Extras", soundLong:"Sounds for right & wrong", digiLong:"Digital time, 24 hours",
    parts:{night:"at night",morning:"in the morning",forenoon:"in the morning",noon:"at noon",afternoon:"in the afternoon",evening:"in the evening"},
    album:"Your stars", newBadge:n=>`🎉 ${n} stars!`, streak:n=>`🔥 ${n} day${n>1?"s":""} in a row`,
    nextBadge:n=>`${n} more star${n>1?"s":""} to the next sticker`, allBadges:"All stickers collected!",
    medals:"Medals per level", newMedal:(e,l)=>`${e} Medal “${l}”!`
  }
});
})();
