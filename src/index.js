#! /usr/bin/env node

const { draw, listenKey } = require("./console");
const { createPlayground } = require("./playground");
const { createSpeed } = require("./utils/speed");
const { tock } = require("./utils/ticktock");
const { createTiming } = require("./utils/time");
const { gameRow, gameCol, boxDownIntervalTime } = require("./utils/config");


function main() {
  const speed = createSpeed(boxDownIntervalTime)
  const timing = createTiming(speed);

  const playground = createPlayground(gameCol, gameRow);
  playground.enterBox();

  listenKey({
    left: playground.leftMoveBox,
    right: playground.rightMoveBox,
    space: playground.rotateBox,
    up: speed.setHighSpeed,
    down: speed.setQuicker,
    esc: gameOver,
  })


  tock(timeSlice => {
    if (timing(timeSlice)) {
      const down = playground.downMoveBox();
      if (down) {// active box downing
        draw(playground.view)

      } else {
        playground.mendPlayground();
        draw(playground.view)

        if (!playground.isBoxBeyondPlayground) {// will enter next box
          speed.restore();
          playground.enterBox();

        } else {
          gameOver()

        }
      }

    }
  });
}

function gameOver() {
  console.log("\r\n　　　　👻 💀 👽 游戏结束 👾 🤖 🎃");
  process.exit(0)
}

main()
