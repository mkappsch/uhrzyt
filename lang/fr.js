/* Français (French). */
(()=>{
const {min:M, hour:HR}=Uhrzyt; // mark the minute part (orange) and the hour part (blue) of a phrase
const FRH=["douze heures","une heure","deux heures","trois heures","quatre heures","cinq heures","six heures","sept heures","huit heures","neuf heures","dix heures","onze heures","douze heures"];
const FRM=["","une","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf","vingt",
  "vingt et une","vingt-deux","vingt-trois","vingt-quatre","vingt-cinq","vingt-six","vingt-sept","vingt-huit","vingt-neuf","trente","trente et une","trente-deux","trente-trois","trente-quatre"];
Uhrzyt.addLanguage("fr",{
  name:"Français", flag:'<svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="1" height="2" fill="#002395"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#ed2939"/></svg>', html:"fr", tts:"fr-FR", voice:/fr[-_]FR/i, voiceAny:/^fr/i, read:"fr", second:"ch", next:35, hours:FRH, clock:"",
    // the hour first, then the minutes up to :34; from :35 back from the next hour:
    // trois heures cinq · trois heures et quart · trois heures et demie · quatre heures moins vingt-cinq · quatre heures moins le quart
    say(h,m){ const H=h%12||12, N=H%12+1, hh=HR(FRH[H]), nh=HR(FRH[N]);
      if(m===0) return `Il est ${hh}`;
      if(m===15) return `${hh} ${M("et quart")}`;
      if(m===30) return `${hh} ${M("et demie")}`;
      if(m===45) return `${nh} ${M("moins le quart")}`;
      if(m<35) return `${hh} ${M(FRM[m])}`;
      return `${nh} ${M("moins "+FRM[60-m])}`; },
  texts:{doc:"Lire l'heure",title:"Lire <span>l'heure</span>",mode:"Mode",lern:"S'exercer",stell:"Régler",luege:"Quelle heure\u00a0?",
    say:"On dit",setTo:"Règle l'horloge sur",ask:"Quelle heure est-il\u00a0?",right:"Juste",check:"Vérifier",next:"Suivant",
    miss:"Presque\u00a0! Réessaie.",wins:["Super\u00a0!","Bravo\u00a0!","Exactement\u00a0!","Bien joué\u00a0!"],sub:"Züritüütsch\u00a0: ",
    hint:'Tire la <b class="m">grande aiguille orange</b> pour les minutes et la <b class="h">petite aiguille bleue</b> pour les heures. À droite, c\'est «\u00a0après\u00a0», à gauche «\u00a0moins\u00a0».',
    after:"après",before:"moins",clock:"Horloge",play:"Lire à voix haute",hr:"h",hrBack:"Une heure en arrière",hrFwd:"Une heure en avant",
    minBack:n=>`${n} minute${n>1?"s":""} en arrière`,minFwd:n=>`${n} minute${n>1?"s":""} en avant`,
    settings:"Réglages",level:"Niveau",lang:"Langue",sound:"Sons",on:"Oui",off:"Non",done:"OK",
    lvlLong:{1:"Heures & demies",2:"+ quarts",3:"Toutes les 5 minutes",4:"Chaque minute"},lvlShort:{1:"Demies",2:"Quarts",3:"5 min",4:"1 min"},
    tipFirst:"Ici, tu peux régler le niveau, la langue et les sons.",tipHard:"Trop difficile\u00a0? Choisis ici un niveau plus facile.",
    now:"Actuel",nowLabel:"Régler sur l'heure actuelle",show:"Montre-moi",shown:"Voilà",
    hourWrong:"Minutes justes, heure non.",minWrong:"Heure juste, minutes non.",bothWrong:"Regarde bien les deux aiguilles.",
    notYet:n=>`Il n'est pas encore ${n}\u00a0!`,almost:n=>`La petite aiguille est presque à ${n}.`,
    extras:"Extras",soundLong:"Sons pour juste & faux",digiLong:"Heure digitale sur 24 heures",
    parts:{night:"la nuit",morning:"le matin",forenoon:"le matin",noon:"à midi",afternoon:"l'après-midi",evening:"le soir"},
    album:"Tes étoiles",newBadge:n=>`🎉 ${n} étoiles\u00a0!`,streak:n=>`🔥 ${n} jour${n>1?"s":""} de suite`,
    nextBadge:n=>`Encore ${n} étoile${n>1?"s":""} jusqu'au prochain autocollant`,allBadges:"Tous les autocollants sont collectés\u00a0!",
    medals:"Médailles par niveau",newMedal:(e,l)=>`${e} Médaille «\u00a0${l}\u00a0»\u00a0!`}
});
})();
