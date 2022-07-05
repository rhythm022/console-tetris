 function intervaler(time) {
  let t = 0;
  return (n) => {
    t += n;
    if (t >= time) {
      t = 0;
      return true;
    }
    return false;
  };
}


module.exports = {
  intervaler
}