const { downIntervalTime } = require('./utils/config')
const MIN_VAL = 300;
const FACTOR = 0.5

let _downIntervalTime = downIntervalTime

function getDownInterval() {
  return _downIntervalTime
}
function quickerSpeed() {
  if (_downIntervalTime > MIN_VAL) {
    _downIntervalTime *= FACTOR;

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
