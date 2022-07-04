// 游戏
const { initMap, addBoxToMap } =require("./map");
const { Box, createBox } =require("./Box");
const { render } =require("./renderer");
const { getChar } =require("./console");
const { addTicker, removeTicker } =require("./ticker");
const { intervalTimer } =require("./utils");
const { eliminateLine } =require("./eliminateLine");
const { gameState, superUpSpeed, resetSpeed, upSpeed } =require("./gameState");
const {
  hitBottomBoundary,
  hitLeftBoundary,
  hitRightBoundary,
  hitBottomBox,
  hitLeftBox,
} =require("./hit");

let activeBox = null;
let _map = null;
startGame([]) 
 function startGame(map) {
  initMap(map);
  _map = map;
  activeBox = addBox();

  addTicker(handleTicker);

  (async function (){
    while(true){
        let bytes =(await getChar()).split('').map(char=>char.charCodeAt(0))
        if(bytes[0] === 27 && bytes[1] === 91){
            if(bytes[2] === 65){// up
              activeBox.rotate();
            }else
            if(bytes[2] === 66){// down
              superUpSpeed();
            }else
            if(bytes[2] === 67){// right
              rightMoveBox();
            }else
            if(bytes[2] === 68){// left
              leftMoveBox();
            }
    

        }
        if(bytes[0] === 32 && bytes.length === 1){
          activeBox.rotate();
        }
        if(bytes[0] === 27 && bytes.length === 1){// esc
            process.exit(0)
        }
     
        // console.log(bytes)

    }
})()
}

const needDownMove = intervalTimer();
function handleTicker(n) {
  if (needDownMove(n, gameState.downIntervalTime)) {
    bottomMoveBox();
  }

  render(activeBox, _map);
}

function rightMoveBox() {
  if (hitRightBoundary(activeBox)) return;
  activeBox.x++;
}

function leftMoveBox() {
  if (hitLeftBoundary(activeBox) || hitLeftBox(activeBox, _map)) return;
  activeBox.x--;
}

function bottomMoveBox() {
  // 碰到边界的时候不可以在移动了!!
  if (hitBottomBoundary(activeBox) || hitBottomBox(activeBox, _map)) {
    resetSpeed();

    addBoxToMap(activeBox, _map);
    eliminateLine(_map);

    if (activeBox.y < 0) {
      gameOver();
      return;
    }

    activeBox = addBox();
    return;
  }

  activeBox.y++;
}

function addBox() {
  return createBox();
}

function gameOver() {
  console.log("game over");
  // 清理 ticker
  removeTicker(handleTicker);
}



