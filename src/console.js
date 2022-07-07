const ttys = require('ttys')
const { timeUse } = require("./utils/time");

const stdin = ttys.stdin
const stdout = ttys.stdout


stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')
const rowSide = '🍸'
const colSide = '🍸'
let gameTimeUse = timeUse();

function draw(map) {
    clear()
    stdout.write('　　　　　　⏲　游戏计时：' + gameTimeUse())
    stdout.write('\r\n')
    stdout.write('　')
    for (let i = 0; i < map[0].length; i++) stdout.write(rowSide)
    stdout.write('\r\n')

    map.forEach(row => {
        stdout.write(colSide)
        row.forEach(point => {
            if (point === 0) {
                stdout.write('　')
            } else {
                stdout.write('❎')
            }
        })
        stdout.write(colSide)
        stdout.write('\r\n')
    })
    stdout.write('　')
    for (let i = 0; i < map[0].length; i++) stdout.write(rowSide)
    stdout.write('\r\n')
    stdout.write('　　🎏🎏 空格：旋转，上：落地，下：加速')
}
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
function up(n = 1) {
    stdout.write('\033[' + n + 'A')
}
function down(n = 1) {
    stdout.write('\033[' + n + 'B')
}
function right(n = 1) {
    stdout.write('\033[' + n + 'C')
}
function left(n = 1) {
    stdout.write('\033[' + n + 'D')
}
function clear() {
    stdout.write('\033c')
    stdout.write('\033[?25l')
}
function getChar() {
    return new Promise(resolve => {
        stdin.once('data', (key) => {
            resolve(key)
        })
    })
}

module.exports = {
    draw,
    listenKey
}