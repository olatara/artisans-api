// responseFormatter.js
const responseFormatter = (req, res, next) => {
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  next();
};

module.exports = responseFormatter;
