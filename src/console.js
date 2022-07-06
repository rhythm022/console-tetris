const ttys = require('ttys')
const { timeUse } = require("./utils");

const stdin = ttys.stdin
const stdout = ttys.stdout


stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')
const rowSide = '🧬'
const colSide = '🧬'
let startTime = Date.now();

function draw(map) {
    clear()
    stdout.write(' ⏲　游戏计时：' + timeUse(startTime))
    stdout.write('\r\n')

    stdout.write(rowSide)
    for (let i = 0; i < 12; i++) {
        stdout.write(rowSide)
    }
    stdout.write(rowSide)
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
    stdout.write(rowSide)
    for (let i = 0; i < 13; i++) {
        stdout.write(rowSide)
    }
    stdout.write(rowSide)
    stdout.write('\r\n')
    stdout.write('🎏🎏 空格：旋转，上：落地，下：加速')
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
    getChar
}