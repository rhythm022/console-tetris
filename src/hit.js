const { gameRow, gameCol } = require("./config.js");
const { getBottomPoints, getLeftPoints, getRightPoints } = require("./matrix");

 function hitBoundary(initialPoint, points) {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const row = initialPoint.y + point.y;
    const col = initialPoint.x + point.x;

    if (col < 0) {
      return true;
    }

    if (row >= gameRow || col >= gameCol) {
      return true;
    }
  }

  return false;
}

 function hitBox(initialPoint, points, map) {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const row = initialPoint.y + point.y;
    const col = initialPoint.x + point.x;

    if (col < 0 || row < 0 || col >= gameCol || row >= gameRow) continue;

    if (map[row][col] < 0) {
      return true;
    }
  }

  return false;
}

function nextBottomPoints(box) {
  let bottomPoints = getBottomPoints(box.shape);
  return bottomPoints.map((point) => {
    return {
      x: point.x,
      y: point.y + 1,
    };
  });
}

 function hitBottomBox(box, map) {
  return hitBox({ x: box.x, y: box.y }, nextBottomPoints(box), map);
}

// -1 那么肯定就是方块了
 function hitBottomBoundary(box) {
  return hitBoundary({ x: box.x, y: box.y }, nextBottomPoints(box));
}

function nextLeftPoints(box) {
  let leftPoints = getLeftPoints(box.shape);
  return leftPoints.map((point) => {
    return {
      x: point.x - 1,
      y: point.y,
    };
  });
}

 function hitLeftBox(box, map) {
  return hitBox({ x: box.x, y: box.y }, nextLeftPoints(box), map);
}

 function hitLeftBoundary(box) {
  return hitBoundary({ x: box.x, y: box.y }, nextLeftPoints(box));
}

 function hitRightBoundary(box) {
  function nextRightPoints() {
    let rightPoints = getRightPoints(box.shape);
    return rightPoints.map((point) => {
      return {
        x: point.x + 1,
        y: point.y,
      };
    });
  }

  return hitBoundary({ x: box.x, y: box.y }, nextRightPoints());
}


module.exports ={
  hitBoundary,
  hitBox,
  hitBottomBox,
  hitBottomBoundary,
  hitLeftBox,
  hitLeftBoundary,
  hitRightBoundary,
}