const handlers = [];
const T = 0

let id = setTimeout(tick, T);


let startTime = Date.now();
function tick() {
  handlers.forEach(h => {
    h(Date.now() - startTime);
  });

  startTime = Date.now();
  id = setTimeout(tick, T);
};


function ticktock(fn) {
  handlers.push(fn);
}

function stopTick() {
  handlers.length = 0
  clearTimeout(id)
}


module.exports = {
  ticktock,
  stopTick,
}