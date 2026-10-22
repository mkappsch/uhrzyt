/* ภาษาไทย (Thai). Please have it proofread by a native speaker.
   Everyday Thai names the hour by the time of day (เช้า, บ่าย, ทุ่ม, ตี), which an analog clock cannot show.
   This uses the neutral form that works for every hour: สามนาฬิกา · สามนาฬิกาสิบห้านาที · สามนาฬิกาครึ่ง.
   Thai always counts forward, so it never names the next hour (next: 60). Thai writes words without spaces. */
(()=>{
const {min:M, hour:HR}=Uhrzyt; // mark the minute part (orange) and the hour part (blue) of a phrase
const U=["","หนึ่ง","สอง","สาม","สี่","ห้า","หก","เจ็ด","แปด","เก้า"];
const num=n=>{ // Thai number words up to 59: 11 สิบเอ็ด, 20 ยี่สิบ, 21 ยี่สิบเอ็ด
  if(n<10) return U[n];
  const t=Math.floor(n/10), o=n%10;
  return (t===1?"":t===2?"ยี่":U[t])+"สิบ"+(o===1?"เอ็ด":U[o]);
};
const TH=Array.from({length:13},(_,i)=>num(i===0?12:i)+"นาฬิกา");
Uhrzyt.addLanguage("th",{
  name:"ภาษาไทย", flag:'<svg viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="9" height="6" fill="#a51931"/><rect y="1" width="9" height="4" fill="#f4f5f8"/><rect y="2" width="9" height="2" fill="#2d2a4a"/></svg>',
  html:"th", tts:"th-TH", voice:/th[-_]TH/i, voiceAny:/^th/i, read:"th", second:"ch", next:60, hours:TH, clock:"",
  say(h,m){ const H=h%12||12, now=HR(TH[H]);
    if(m===0) return now;
    if(m===30) return `${now}${M("ครึ่ง")}`;
    return `${now}${M(num(m)+"นาที")}`; },
  texts:{doc:"ฝึกดูเวลา",title:"ฝึก<span>ดูเวลา</span>",mode:"โหมด",lern:"ฝึก",stell:"ตั้งเวลา",luege:"กี่โมง?",
    say:"เราพูดว่า",setTo:"ตั้งนาฬิกาเป็น",ask:"ตอนนี้กี่โมง?",right:"ถูกต้อง",check:"ตรวจ",next:"ต่อไป",
    miss:"เกือบแล้ว! ลองอีกครั้ง",wins:["เก่งมาก!","ยอดเยี่ยม!","ถูกต้อง!","เยี่ยมเลย!"],sub:"Züritüütsch: ",
    hint:'ลาก<b class="m">เข็มยาวสีส้ม</b>เพื่อตั้งนาที และลาก<b class="h">เข็มสั้นสีฟ้า</b>เพื่อตั้งชั่วโมง',
    after:"",before:"",clock:"นาฬิกา",play:"อ่านออกเสียง",hr:"ชม.",hrBack:"ถอยหลังหนึ่งชั่วโมง",hrFwd:"เดินหน้าหนึ่งชั่วโมง",
    minBack:n=>`ถอยหลัง ${n} นาที`,minFwd:n=>`เดินหน้า ${n} นาที`,
    settings:"ตั้งค่า",level:"ระดับ",lang:"ภาษา",sound:"เสียง",on:"เปิด",off:"ปิด",done:"เสร็จ",
    lvlLong:{1:"ชั่วโมงและครึ่ง",2:"+ สิบห้านาที",3:"ทุก 5 นาที",4:"ทุกนาที"},lvlShort:{1:"ครึ่ง",2:"15 นาที",3:"5 นาที",4:"1 นาที"},
    tipFirst:"ตั้งระดับ ภาษา และเสียงได้ที่นี่",tipHard:"ยากไปไหม? เลือกระดับที่ง่ายกว่าได้ที่นี่",
    now:"ตอนนี้",nowLabel:"ตั้งเป็นเวลาปัจจุบัน",show:"เฉลย",shown:"แบบนี้",
    hourWrong:"นาทีถูก ชั่วโมงยังไม่ถูก",minWrong:"ชั่วโมงถูก นาทียังไม่ถูก",bothWrong:"ดูเข็มทั้งสองอีกครั้งนะ",
    notYet:n=>`ยังไม่ถึง${n}!`,almost:n=>`เข็มสั้นเกือบถึง${n}แล้ว`,
    extras:"เพิ่มเติม",soundLong:"เสียงเมื่อตอบถูกและผิด",digiLong:"เวลาดิจิทัล 24 ชั่วโมง",
    parts:{night:"ตอนกลางคืน",morning:"ตอนเช้า",forenoon:"ตอนสาย",noon:"ตอนเที่ยง",afternoon:"ตอนบ่าย",evening:"ตอนเย็น"},
    album:"ดาวของฉัน",newBadge:n=>`🎉 ${n} ดาว!`,streak:n=>`🔥 ${n} วันติดกัน`,
    nextBadge:n=>`อีก ${n} ดาวจะได้สติกเกอร์ใหม่`,allBadges:"สะสมสติกเกอร์ครบแล้ว!",
    medals:"เหรียญแต่ละระดับ",newMedal:(e,l)=>`${e} เหรียญ “${l}”!`}
});
})();
