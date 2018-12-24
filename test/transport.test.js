const Transport = require('../lib/transport');
const util = require('util');

const options = {
  name: 'app',
  module: '',
  filePath: './logs',
  formatter: meta => {
    meta.module = meta.module ? ` [${meta.module}]` : '';
    return `${meta.timestamp} ${meta.level} ${meta.hostname} ${meta.pid} (${meta.ms})${
      meta.module
    } ${meta.message}`;
  },
  consoleLevel: 'error',
  outputJSON: false,
};

describe('test/transport.test.js', () => {
  it('transport', () => {
    expect(util.isFunction(Transport)).toBeTruthy();
  });

  it('Transport instance has property transports', () => {
    const tp = new Transport(options);
    expect(tp).toHaveProperty('transports');
    expect(util.isArray(tp.transports));
  });
});
