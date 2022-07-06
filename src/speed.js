const { downIntervalTime } = require('./config')
const minVal = 300;

let factor = 0.5
let _downIntervalTime = downIntervalTime

function getDownInterval() {
  return _downIntervalTime
}
function quickerSpeed() {
  if (_downIntervalTime > minVal) {
    _downIntervalTime *= factor;

  }
}

function resetSpeed() {
  _downIntervalTime = downIntervalTime;

}

function superQuickSpeed() {
  _downIntervalTime = 1;
}


module.exports = {
  getDownInterval,
  quickerSpeed,
  resetSpeed,
  superQuickSpeed,
}
