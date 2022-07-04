let startTime = Date.now();
const tickerHandler = () => {
  tickers.forEach((ticker) => {
    ticker(Date.now() - startTime);
  });
  startTime = Date.now();
  setTimeout(tickerHandler,200);
};

setTimeout(tickerHandler);

const tickers = [];
 function addTicker(fn) {
  tickers.push(fn);
}

 function removeTicker(fn) {
  const index = tickers.indexOf(fn);
  if (index !== -1) {
    tickers.splice(index, 1);
  }
}


module.exports = {
  addTicker,
  removeTicker,
}