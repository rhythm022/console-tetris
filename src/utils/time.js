const intervalToDuration = require('date-fns/intervalToDuration')


function intervaler() {
  let t = 0;
  return (delta, targetTime) => {
    t += delta;
    
    if (t >= targetTime) {
      t = 0;
      return true;
    }
    return false;
  };
}


function timeUse(base = Date.now()){
  return function (){
    const t = intervalToDuration({
      start: base,
      end: Date.now()
    })
  
    return `${t.hours}:${t.minutes}:${t.seconds}`
  }
}

module.exports = {
  intervaler,
  timeUse
}