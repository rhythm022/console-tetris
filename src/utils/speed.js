const MINVAL = 300;
const FACTOR = 0.5

let interval
function createSpeed(intervalTime){// 间隔越短，速度越快
  interval = intervalTime
  
  function restore() {
    interval = intervalTime;
  
  }
  function setQuicker() {
    if (interval > MINVAL) {
      interval *= FACTOR;
  
    }
  }
  function setHighSpeed() {
    interval = 1;
  }

  return {
    get interval(){
      return interval
    },
    restore,
    setQuicker,
    setHighSpeed,
  }
}

module.exports = {
  createSpeed
}
