const utils = require('../lib/utils');

describe('test/utils.test.js', () => {
  describe('assign', () => {
    it('should assign object', () => {
      expect(utils.assign({ a: 1, c: 1 }, { a: 2, b: 2 })).toEqual({ a: 2, b: 2, c: 1 });
      expect(utils.assign({ a: 1, c: { d: 1 } }, { a: 2, b: { d: 1 }, c: { d: 2 } })).toEqual({
        a: 2,
        b: { d: 1 },
        c: { d: 2 },
      });
    });

    it('do not assign if target is undefined and null', () => {
      expect(utils.assign(null, { a: 1 })).toEqual({});
      expect(utils.assign(undefined, { a: 1 })).toEqual({});
    });

    it('do not assign undefined and null value', () => {
      expect(utils.assign({ a: 1 }, { a: 2, b: null })).toEqual({ a: 2 });
      expect(utils.assign({ a: 1 }, { a: 2, b: undefined })).toEqual({ a: 2 });
    });
  });

  describe('concatLog', () => {
    it('should return string', () => {
      expect(utils.concatLog('log', 1)).toBe('log 1');
      expect(utils.concatLog('log', { a: 1 })).toBe('log ' + JSON.stringify({ a: 1 }));
      const err = new Error('err1');
      expect(utils.concatLog('log', err)).toBe(`log ${err.name}: ${err.message}\n${err.stack}`);
    });
  });
});
