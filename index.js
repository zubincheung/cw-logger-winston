module.exports.CWLogger = require('./lib/cw-logger');
module.exports.levels = require('./lib/level');

const log = new module.exports.CWLogger({
  consoleFormatter: meta => {
    return `${meta.hostname} ${meta.pid} ${meta.level} (${meta.ms}) [${meta.module}] ${
      meta.message
    }`;
  },
});
log.error(new Error('23332'));
