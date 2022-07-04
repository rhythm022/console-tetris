const { rotate} = require('./matrix')
class Box {
  constructor(shape,rotateStrategys) {
    this.x = 0;
    this.y = 0;
    this.rotateIndex = 0;

    this.shape = shape
    this.rotateStrategys = rotateStrategys;
  }

  
  rotate() {
    const rotate = this.rotateStrategys[this.rotateIndex];

    this.shape = rotate(this.shape);

    this.rotateIndex = (this.rotateIndex + 1) % this.rotateStrategys.length;
  }
}


const boxInfos = {
  1: {
    shape: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    // 90 -> 270
    rotateStrategy: [rotate, (v) => rotate(rotate(rotate(v)))],
  },
  2: {
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
};


// 随机创建box
function createBox() {
  const len = Object.keys(boxInfos).length;
  const key = Math.floor(Math.random() * len) + 1;

  const boxInfo = boxInfos[key];

  return new Box(boxInfo.shape,boxInfo.rotateStrategy);
}

module.exports = {
  Box,
  createBox
}
