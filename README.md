# BunyanStdoutStream

![Travis](https://img.shields.io/travis/Goodluckhf/BunyanStdoutStream/master.svg?style=flat-square)
![Coveralls github branch](https://img.shields.io/coveralls/github/Goodluckhf/BunyanStdoutStream/master.svg?style=flat-square)
![node](https://img.shields.io/node/v/bunyan-stdout-stream.svg?style=flat-square)
![npm](https://img.shields.io/npm/v/bunyan-stdout-stream.svg?style=flat-square)

![GitHub top language](https://img.shields.io/github/languages/top/Goodluckhf/BunyanStdoutStream.svg?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Goodluckhf/BunyanStdoutStream.svg?style=flat-square)
![David](https://img.shields.io/david/Goodluckhf/BunyanStdoutStream.svg?style=flat-square)
![David](https://img.shields.io/david/dev/Goodluckhf/BunyanStdoutStream.svg?style=flat-square)

![license](https://img.shields.io/github/license/Goodluckhf/BunyanStdoutStream.svg?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/Goodluckhf/BunyanStdoutStream.svg?style=flat-square)
![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)



During developing you usually put logs to stdout.
But it's very uncomfortable to read default bunyan logs.
So I've developed `StdoutStream` for bunyan which will prettify your logs.

## Example

![example](/example.png)

will printed in your terminal:
![example](/example_terminal.png)

## Install
1. install via npm
```bash
$ npm i bunyan-stdout-stream
```

2. instsall bunyan logger

```bash
$ npm i bunyan
```

3. create logger in you project
```javascript
import StdoutStream from 'bunyan-stdout-stream';
import bunyan       from 'bunyan';

const logger = bunyan.createLogger({
	name   : 'exampleLogger',
	streams: [
		{
			level : 'trace',
			type  : 'raw',
			stream: new StdoutStream(),
		},
	]
});
```

## Customisation

You can customize colors and other options by putting your config, which will be deeply merge with default config:

```javascript
new StdoutStream({
    maxDepth: 7,
    colors: {
    	date: date => date
    },
})
```
All properties of config you can find -> https://github.com/Goodluckhf/BunyanStdoutStream/blob/master/src/config.js

Also you can change any of formatter class.
You have to extend it from `BaseFormatter`:
```javascript
import BaseFormatter from 'bunyan-stdout-stream/formatters/BaseFormatter';

class CustomErrorFormatter extends BaseFormatter {
	// The only method you have to define
	format(error) {
		return error.toString();
	}
}

new StdoutStream({}, {
	errorFormatter: CustomErrorFormatter
});
```
List of formatters: 
* `OptionLineFormatter` - first line of log message
* `ArrayFormatter` - formatter of array
* `ErrorFormatter` - formatter of error
* `ObjectFormatter` - formatter of object (key:val)
