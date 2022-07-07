const { draw, listenKey } = require("./console");
const { createPlayground, mendPlayground, merge } = require("./playground");
const { createBox } = require("./box");
const { tock } = require("./utils/ticktock");
const { intervaler } = require("./utils/time");
const {
  leftMoveBox,
  rightMoveBox,
  downMoveBox
} = require('./handlers')
const { superQuickSpeed, quickerSpeed, resetSpeed, getDownInterval } = require("./speed");
const { gameRow, gameCol } = require("./utils/config");
const needDownMove = intervaler();

let activeBox;
let playground;

function main() {
  playground = createPlayground(gameCol, gameRow);
  activeBox = createBox();

  listenKey({
    space: () => activeBox.rotate(),
    left: () => leftMoveBox(activeBox, playground),
    right: () => rightMoveBox(activeBox, playground),
    up: superQuickSpeed,
    down: quickerSpeed,
    esc: gameOver,
  })


  tock(d => {
    if (needDownMove(d, getDownInterval())) {
      const canDown = downMoveBox(activeBox, playground);
      if (!canDown) {
        mendPlayground(activeBox, playground);
        flush()

        if (activeBox.y < 0) {
          gameOver()
        } else {
          resetSpeed();
          activeBox = createBox();

        }
      } else {
        flush()
      }
    }
  });
}

function flush() {
  draw(merge(activeBox, playground))
}

function gameOver() {
  console.log("\r\n　　　　👻 💀 👽 游戏结束 👾 🤖 🎃");
  process.exit(0)
}

main()
