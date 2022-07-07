function getBottomPoints(matrix) {
  let result = [];
  const col = matrix[0].length;
  const row = matrix.length;
  for (let i = 0; i < col; i++) {
    for (let j = row - 1; j >= 0; j--) {
      const point = matrix[j][i];
      if (point) {
        result.push({ x: i, y: j });
        break;
      }
    }
  }
  return result;
}

function getLeftPoints(matrix) {
  let result = [];
  const col = matrix[0].length;
  const row = matrix.length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j]) {
        result.push({
          x: j,
          y: i,
        });
        break;
      }
    }
  }
  return result;
}

function getRightPoints(matrix) {
  let result = [];
  const col = matrix[0].length;
  const row = matrix.length;

  for (let i = 0; i < row; i++) {
    for (let j = col - 1; j >= 0; j--) {
      if (matrix[i][j]) {
        result.push({
          x: j,
          y: i,
        });
        break;
      }
    }
  }
  return result;
}

const mapFn = {
  left: getLeftPoints,
  right: getRightPoints,
  bottom: getBottomPoints,
};

function getPointsHandler(direction) {
  return mapFn[direction];
}



function rotate(matrix) {
  //逆时针旋转 90 度
  //列 = 行
  //行 = n - 1 - 列(j);  n表示总行数
  var temp = [];
  var len = matrix.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      var k = len - 1 - j;
      if (!temp[k]) {
        temp[k] = [];
      }
      temp[k][i] = matrix[i][j];
    }
  }

  return temp;
}

function rotate180(matrix) {
  //逆时针旋转 180 度
  //行 = h - 1 - 行(i);  h表示总行数
  //列 = n - 1 - 列(j);  n表示总列数
  var temp = [];
  var len = matrix.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      var k = len - 1 - i;
      if (!temp[k]) {
        temp[k] = [];
      }
      temp[k][len - 1 - j] = matrix[i][j];
    }
  }

  return temp;
}

function rotate270(matrix) {
  //逆时针旋转 270 度
  //行 = 列
  //列 = n - 1 - 行(i);  n表示总列数
  var temp = [];
  var len = matrix.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      var k = len - 1 - i;
      if (!temp[j]) {
        temp[j] = [];
      }
      temp[j][k] = matrix[i][j];
    }
  }

  return temp;
}


module.exports = {
  getPointsHandler,
  rotate,
  rotate180,
  rotate270,
}