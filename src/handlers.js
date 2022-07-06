const {
    hitBottomBoundary,
    hitLeftBoundary,
    hitRightBoundary,
    hitBottomBox,
    hitLeftBox,
} = require("./hit");
const { removeTicker } = require("./ticktock");



function leftMoveBox(box, area) {
    if (hitLeftBoundary(box) || hitLeftBox(box, area)) return false;
    box.x--;
}
function rightMoveBox(box) {
    if (hitRightBoundary(box)) return false;
    box.x++;
}
function downMoveBox(box, area) {
    if (hitBottomBoundary(box) || hitBottomBox(box, area)) return false;
    box.y++;
    return true
}


module.exports = {
    leftMoveBox,
    rightMoveBox,
    downMoveBox
}