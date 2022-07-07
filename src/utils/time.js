const intervalToDuration = require('date-fns/intervalToDuration')


function createTiming(speed) {
  let t = 0;
  return (delta) => {
    t += delta;

    if (t >= speed.interval) {
      t = 0;
      return true;
    }
    return false;
  };
}


function timeUse(base = Date.now()) {
  return function () {
    const t = intervalToDuration({
      start: base,
      end: Date.now()
    })

    return `${t.hours}:${t.minutes}:${t.seconds}`
  }
}

module.exports = {
  createTiming,
  timeUse
}