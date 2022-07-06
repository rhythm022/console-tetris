const { draw } = require("./console");
const { createPlayground, mendPlayground, merge } = require("./playground");
const { createBox } = require("./Box");
const { tock, stopTock } = require("./ticktock");
const { intervaler } = require("./utils");
const { listenKey } = require('./keyboard')
const {
  leftMoveBox,
  rightMoveBox,
  downMoveBox
} = require('./handlers')
const { superQuickSpeed, quickerSpeed, resetSpeed, getDownInterval } = require("./speed");
const { gameRow, gameCol } = require("./config");
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
    up: () => { superQuickSpeed(); flush() },
    down: () => { quickerSpeed(); flush() },
    esc: () => process.exit(0),
  })


  tock(d => {
    if (needDownMove(d, getDownInterval())) {
      const canDown = downMoveBox(activeBox, playground);
      if (!canDown) {
        mendPlayground(activeBox, playground);
        flush()

        if (activeBox.y < 0) {
          stopTock();
          console.log("\r\n👻 💀 👽 Game Over 👾 🤖 🎃");
        } else {
          resetSpeed();
          activeBox = createBox();

        }
      }else{
        flush()
      }
    }
  });
}

function flush() {
  draw(merge(activeBox, playground))
}


main()
