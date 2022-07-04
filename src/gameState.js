const {gameDownIntervalTime} = require('./config')
// speed
 const gameState = {
  downIntervalTime: gameDownIntervalTime,
  factor: 0.3,
};

 function upSpeed() {
  gameState.downIntervalTime *= gameState.factor;
  const minVal = 60;
  if (gameState.downIntervalTime < minVal) {
    gameState.downIntervalTime = minVal;
  }
}

 function resetSpeed() {
  gameState.downIntervalTime = gameDownIntervalTime;
}

 function superUpSpeed() {
  gameState.downIntervalTime = 1;
}


module.exports = {
  gameState,
  upSpeed,
  resetSpeed,
  superUpSpeed,
}
