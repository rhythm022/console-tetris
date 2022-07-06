const { rotate, rotate270 } = require('./matrix')
class Box {
  constructor(shape, rotateStrategys) {
    this.x = 0;
    this.y = -1;
    this.rotateIndex = 0;

    this.shape = shape
    this.rotateStrategys = rotateStrategys;
  }


  rotate() {
    if (!this.rotateStrategys) return

    const rotate = this.rotateStrategys[this.rotateIndex];

    this.shape = rotate(this.shape);

    this.rotateIndex = (this.rotateIndex + 1) % this.rotateStrategys.length;
  }
}


const boxsInfo = {
  0: {
    type: 0,
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  1: {
    type: 1,
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotateStrategy: [rotate, rotate270],
  },
  2: {
    type: 2,
    shape: [
      [5, 5, 5],
      [0, 5, 0],
      [0, 0, 0],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },
  3: {
    type: 3,
    shape: [
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
    ],
    rotateStrategy: [rotate, rotate270],
  },
  4: {
    type: 4,
    shape: [
      [4, 0, 0],
      [4, 0, 0],
      [4, 4, 0],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },
  5: {
    type: 5,
    shape: [
      [0, 0, 6],
      [0, 0, 6],
      [0, 6, 6],
    ],
    rotateStrategy: [rotate, rotate, rotate, rotate],
  },
};

// 随机创建box
function createBox() {
  const len = Object.keys(boxsInfo).length ;
  const index = Math.floor(Math.random() * len);

  const boxInfo = boxsInfo[index];

  return new Box(boxInfo.shape, boxInfo.rotateStrategy);
}

module.exports = {
  Box,
  createBox
}
