const device = require('device');

const deviceMiddleware = (req, res, next) => {
  res.locals.device_type = device(req.get('User-Agent')).type;
  next();
};

module.exports = { deviceMiddleware };
