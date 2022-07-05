
const { ticktock } = require('./ticktock')
const { draw } = require("./console");

function display(fn) {
    ticktock(() => {
        draw(fn())
    })
}


module.exports = {
    display
}