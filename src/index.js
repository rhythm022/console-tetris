// 游戏
const { createPlayground, mendPlayground, merge } = require("./playground");
const { createBox } = require("./Box");
const { ticktock, stopTick } = require("./ticktock");
const { intervaler } = require("./utils");
const { listenKey } = require('./keyboard')
const { display } = require('./display')
const {
  leftMoveBox,
  rightMoveBox,
  bottomMoveBox
} = require('./handlers')
const { superUpSpeed, resetSpeed } = require("./gameState");
const needDownMove = intervaler(1000);

let activeBox;
let playground;

function main() {
  playground = createPlayground(8, 8);
  activeBox = createBox();

  display(() => merge(activeBox, playground))

  listenKey({
    left: () => leftMoveBox(activeBox, playground),
    right: () => rightMoveBox(activeBox, playground),
    up: () => activeBox.rotate(),
    space: () => activeBox.rotate(),
    down: superUpSpeed,
    esc: () => process.exit(0),
  })

  ticktock(d => {
    if (needDownMove(d)) {
      const downMoved = bottomMoveBox(activeBox, playground);

      if (!downMoved) {
        resetSpeed();
        mendPlayground(activeBox, playground);


        if (activeBox.y < 0) {
          gameOver()
        } else {
          activeBox = createBox();

        }
      }
    }
  });

}


function gameOver() {
  // 清理 ticker
  stopTick();

  setTimeout(() => {
    console.log("game over");

  })
}



main()
