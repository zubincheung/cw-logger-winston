# cw-logger-winston

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

[MIT](./LICENSE.txt).
