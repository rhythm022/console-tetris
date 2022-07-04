const { gameRow, gameCol } =require("./config");

 function initMap(map) {
  for (let i = 0; i < gameRow; i++) {
    map[i] = [];
    for (let j = 0; j < gameCol; j++) {
      map[i][j] = 0;
    }
  }
}

 function addBoxToMap(box, map) {
  // box points -> change map value
  const row = box.shape.length;
  const col = box.shape[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const mRow = box.y + i;
      const mCol = box.x + j;

      if (mRow < 0 || mCol >= gameCol) continue;
      // 必须是空的时候才可以添加
      if (!box.shape[i][j]) continue;

      if (map[mRow][mCol] >= 0) {
        map[mRow][mCol] = -1;
      }
    }
  }
}



module.exports = {
  initMap,
  addBoxToMap
}