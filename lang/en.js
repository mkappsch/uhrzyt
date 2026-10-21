/* English. */
(()=>{
const {min:M, hour:HR}=Uhrzyt; // mark the minute part (orange) and the hour part (blue) of a phrase
const EN=["twelve","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];
const ENM=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty",
  "twenty-one","twenty-two","twenty-three","twenty-four","twenty-five","twenty-six","twenty-seven","twenty-eight","twenty-nine"];
Uhrzyt.addLanguage("en",{
  name:"English", flag:'<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" stroke="#c8102e" stroke-width="2"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>', html:"en", tts:"en-GB", voice:/en[-_]GB/i, voiceAny:/^en/i, read:"en", second:"ch", next:31, hours:EN, clock:"",
    // past the hour up to half past, then to the next hour: five past three · half past three · twenty to four
    say(h,m){ const H=h%12||12, N=H%12+1, he=HR(EN[H]), ne=HR(EN[N]), mins=k=>k===1?"one minute":ENM[k];
      if(m===0) return `It's ${he} o'clock`;
      if(m===15) return `${M("quarter past")} ${he}`;
      if(m===30) return `${M("half past")} ${he}`;
      if(m===45) return `${M("quarter to")} ${ne}`;
      if(m<30) return `${M(mins(m)+" past")} ${he}`;
      return `${M(mins(60-m)+" to")} ${ne}`; },
  texts:{doc:"Tell the Time",title:"Tell <span>the time</span>",mode:"Mode",lern:"Practise",stell:"Set clock",luege:"What time?",
    say:"We say",setTo:"Set the clock to",ask:"What time is it?",right:"Right",check:"Check",next:"Next",
    miss:"Almost! Try again.",wins:["Great!","Well done!","Exactly!","Brilliant!"],sub:"Züritüütsch: ",
    hint:'Drag the <b class="m">long orange hand</b> for the minutes and the <b class="h">short blue hand</b> for the hours. Right is “past”, left is “to”.',
    after:"past",before:"to",clock:"Clock",play:"Read aloud",hr:"hr",hrBack:"One hour back",hrFwd:"One hour forward",
    minBack:n=>`${n} minute${n>1?"s":""} back`,minFwd:n=>`${n} minute${n>1?"s":""} forward`,
    settings:"Settings",level:"Level",lang:"Language",sound:"Sounds",on:"On",off:"Off",done:"Done",
    lvlLong:{1:"Hours & halves",2:"+ quarters",3:"Every 5 minutes",4:"Every minute"},lvlShort:{1:"Halves",2:"Quarters",3:"5 min",4:"1 min"},
    tipFirst:"Here you can change the level, language and sounds.",tipHard:"Too hard? Pick an easier level here.",
    now:"Now",nowLabel:"Set the clock to now",show:"Show me",shown:"Here's how",
    hourWrong:"Minutes right, hour not.",minWrong:"Hour right, minutes not.",bothWrong:"Look at both hands again.",
    notYet:n=>`It's not ${n} yet!`,almost:n=>`The short hand is nearly at ${n}.`,
    extras:"Extras",soundLong:"Sounds for right & wrong",digiLong:"Digital time, 24 hours",
    parts:{night:"at night",morning:"in the morning",forenoon:"in the morning",noon:"at noon",afternoon:"in the afternoon",evening:"in the evening"},
    album:"Your stars",newBadge:n=>`🎉 ${n} stars!`,streak:n=>`🔥 ${n} day${n>1?"s":""} in a row`,
    nextBadge:n=>`${n} more star${n>1?"s":""} to the next sticker`,allBadges:"All stickers collected!",
    medals:"Medals per level",newMedal:(e,l)=>`${e} Medal “${l}”!`}
});
})();
