const { getClientIp } = require('@supercharge/request-ip');

const getIp = (req, res, next) => {
  req.body.ip = getClientIp(req);
  next();
}

module.exports = {
  getIp
}