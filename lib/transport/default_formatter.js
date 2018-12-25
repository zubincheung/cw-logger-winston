const winston = require('winston');
const { hostname } = require('os');

module.exports = winston.format.combine(
  winston.format(info => {
    info.hostname = hostname();
    info.pid = process.pid;
    info.level = info.level.toUpperCase();
    return info;
  })(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSSS' }),
  winston.format.ms(),
);
