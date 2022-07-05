
const { getChar } = require("./console");

function listenKey({
    up,
    down,
    left,
    right,
    space,
    esc
}) {
    (async function () {
        while (true) {
            let bytes = (await getChar()).split('').map(char => char.charCodeAt(0))
            if (bytes[0] === 27 && bytes[1] === 91) {
                if (bytes[2] === 65) {// up
                    up();
                } else if (bytes[2] === 66) {// down
                    down();
                } else if (bytes[2] === 67) {// right
                    right();
                } else if (bytes[2] === 68) {// left
                    left();
                }
            }
            if (bytes[0] === 32 && bytes.length === 1) {
                space();
            }
            if (bytes[0] === 27 && bytes.length === 1) {// esc
                esc()
            }
        }
    })()
}

module.exports = {
    listenKey
}