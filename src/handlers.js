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
    box.x -= 2;
}
function rightMoveBox(box) {
    if (hitRightBoundary(box)) return false;
    box.x += 2;
}
function bottomMoveBox(box, area) {
    if (hitBottomBoundary(box) || hitBottomBox(box, area)) return false;
    box.y++;
    return true
}


module.exports = {
    leftMoveBox,
    rightMoveBox,
    bottomMoveBox
}