# cw-logger-winston

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/cw-logger-winston.svg?style=flat-square
[npm-url]: https://npmjs.org/package/cw-logger-winston
[travis-image]: https://img.shields.io/travis/zubincheung/cw-logger-winston.svg?style=flat-square
[travis-url]: https://travis-ci.org/zubincheung/cw-logger-winston
[codecov-image]: https://img.shields.io/codecov/c/github/zubincheung/cw-logger-winston.svg?style=flat-square
[codecov-url]: https://codecov.io/github/zubincheung/cw-logger-winston?branch=master
[david-image]: https://img.shields.io/david/zubincheung/cw-logger-winston.svg?style=flat-square
[david-url]: https://david-dm.org/zubincheung/cw-logger-winston
[snyk-image]: https://snyk.io/test/npm/cw-logger-winston/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/cw-logger-winston
[download-image]: https://img.shields.io/npm/dm/cw-logger-winston.svg?style=flat-square
[download-url]: https://npmjs.org/package/cw-logger-winston

logger use winston

## Install

```bash
npm install cw-logger-winston --save
```

## Using

```js
const CWLogger=require('cw-logger-winston').CWLogger;

const logger = new CWLogger({
  name: 'app';
  filePath:'./logs';
  consoleLevel: 'error';
});
logger.info('foo');
logger.error(new Error('error 1'))
```

or

```js
const CWLogger=require('cw-logger-winston').CWLogger;
const logger = new CWLogger({
  name: 'app';
  filePath:'./logs';
  consoleLevel: 'error';
});
logger.set('module1').info('foo');

logger.set('module2');
logger.get('module2').info('foo')
```

## License

[MIT](./LICENSE).
