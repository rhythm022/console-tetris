const {
    hitLeftBox,
    hitLeftBoundary,
    hitRightBox,
    hitRightBoundary,
    hitBottomBox,
    hitBottomBoundary,
} = require("./utils/hit");


function leftMoveBox(box, area) {
    if (hitLeftBoundary(box, area) || hitLeftBox(box, area)) return false;
    box.x--;
}
function rightMoveBox(box, area) {
    if (hitRightBoundary(box, area)|| hitRightBox(box, area)) return false;
    box.x++;
}
function downMoveBox(box, area) {
    if (hitBottomBoundary(box, area) || hitBottomBox(box, area)) return false;
    box.y++;
    return true
}


module.exports = {
    leftMoveBox,
    rightMoveBox,
    downMoveBox
}