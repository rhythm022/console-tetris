const { gameRow, gameCol } = require("./config");

function createPlayground(x, y) {
  const res = []
  for (let i = 0; i < x; i++) {
    res[i] = [];
    for (let j = 0; j < y; j++) {
      res[i][j] = 0;
    }
  }
  return res
}

function mendPlayground(activeBox, playground) {
  const Y = playground.length
  const X = playground[0].length

  const shape = activeBox.shape;
  const shapeY = shape.length
  const shapeX = shape[0].length
  for (let i = 0; i < shapeY; i++) {
    for (let j = 0; j < shapeX; j++) {
      const point_y = activeBox.y + i;
      const point_x = activeBox.x + j;

      if (
        point_y >= Y ||
        point_y < 0 ||
        point_x >= X ||
        point_x < 0
      ) continue;
      if (shape[i][j] === 0) continue;

      if (playground[point_y][point_x] >= 0) {
        playground[point_y][point_x] = -1;
      }
    }
  }

  eliminateLine(playground)
}


function merge(activeBox, playground) {
  const Y = playground.length
  const X = playground[0].length

  for (let i = 0; i < Y; i++) {
    for (let j = 0; j < X; j++) {
      if (playground[i][j] > 0) {// 保留 -1
        playground[i][j] = 0;
      }
    }
  }

  const shape = activeBox.shape;
  const shapeY = shape.length
  const shapeX = shape[0].length
  for (let i = 0; i < shapeY; i++) {
    for (let j = 0; j < shapeX; j++) {
      const point_y = activeBox.y + i;
      const point_x = activeBox.x + j;

      if (
        point_y >= Y ||
        point_y < 0 ||
        point_x >= X ||
        point_x < 0
      ) continue;

      if (playground[point_y][point_x] === 0) {
        playground[point_y][point_x] = shape[i][j];

      }

    }
  }

  return playground
}


// 消除行的逻辑
// 1. map -> row -> -1 -> 是可以消除的
// 2. array -> 多行的话如何消除呢？

function eliminateLine(playground) {
  // 2. 消除行
  const lines = getFullLines(playground);
  const mapCol = playground[0].length;

  for (let i = 0; i < lines.length; i++) {
    playground.splice(lines[i], 1);
    // 需要补充一个 array
    const arr = new Array(mapCol).fill(0);
    playground.unshift(arr);
  }
}

 function getFullLines(playground) {
  const row = playground.length;
  const r = [];
  for (let i = 0; i < row; i++) {
    // col
    // -1
    // every
    const boo = playground[i].every((v) => {
      return v === -1;
    });

    if (boo) {
      r.push(i);
    }
  }

  return r;
}


module.exports = {
  createPlayground,
  mendPlayground,
  merge
}