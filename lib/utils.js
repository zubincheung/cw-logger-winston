const util = require('util');

/**
 * Like `Object.assign`, but don't copy `undefined` value
 */
module.exports.assign = (target, ...sources) => {
  if (!target) {
    return {};
  }
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (!source) continue;
    const keys = Object.keys(source);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      if (source[key] !== undefined && source[key] !== null) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

module.exports.concatLog = (...args) => {
  const errStack = [''];
  const msg = args
    .map(arg => {
      if (arg instanceof Error) {
        errStack.push(arg.stack);
        return `${arg.name}: ${arg.message}`;
      }
      if (util.isObject(arg)) {
        return JSON.stringify(arg);
      }
      return arg;
    })
    .join(' ');
  return `${msg}${errStack.join('\n')}`;
};
