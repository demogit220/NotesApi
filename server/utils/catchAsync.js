module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next); // this is where all the magic happens}
};
