const T = 16
let tockIds = []

function tock(fn, time = T) {
  let prevTime = Date.now()

  const id = setInterval(() => {
    let present = Date.now()

    fn(present - prevTime)
    prevTime = present
  }, time)

  tockIds.push(id)
  return id
};

function stopTock() {
  tockIds.forEach(id => {
    clearTimeout(id)

  })
}

module.exports = {
  tock,
  stopTock,
}