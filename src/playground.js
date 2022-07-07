const {
  hitLeftBox,
  hitLeftBoundary,
  hitRightBox,
  hitRightBoundary,
  hitBottomBox,
  hitBottomBoundary,
} = require("./utils/hit");
const { createBox } = require("./box");


function createPlayground(x, y) {
  const playground = []
  for (let i = 0; i < y; i++) {
    playground[i] = [];
    for (let j = 0; j < x; j++) {
      playground[i][j] = 0;
    }
  }
  let activeBox;
  return {
    enterBox() {
      activeBox = createBox();
    },
    rotateBox() {
      activeBox.rotate()
    },
    leftMoveBox() {
      if (hitLeftBoundary(activeBox, playground) || hitLeftBox(activeBox, playground)) return false;
      activeBox.x--;
    },
    rightMoveBox() {
      if (hitRightBoundary(activeBox, playground) || hitRightBox(activeBox, playground)) return false;
      activeBox.x++;
    },
    downMoveBox() {
      if (hitBottomBoundary(activeBox, playground) || hitBottomBox(activeBox, playground)) return false;
      activeBox.y++;
      return true
    },
    get isBoxBeyondPlayground() {
      return activeBox.y < 0
    },
    mendPlayground() {
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
    },
    get view() {
      const res = JSON.parse(JSON.stringify(playground))

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

          if (res[point_y][point_x] === 0) {
            res[point_y][point_x] = shape[i][j];

          }
        }
      }

      return res
    }
  }
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
}