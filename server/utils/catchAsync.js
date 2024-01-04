
module.exports = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next); // this is where all the magic happens}
    };
  };
  