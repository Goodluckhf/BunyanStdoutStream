# BunyanStdoutStream
[![Build Status](https://travis-ci.org/Goodluckhf/BunyanStdoutStream.svg?branch=master)](https://travis-ci.org/Goodluckhf/BunyanStdoutStream)
[![Coverage Status](https://coveralls.io/repos/github/Goodluckhf/BunyanStdoutStream/badge.svg?branch=master)](https://coveralls.io/github/Goodluckhf/BunyanStdoutStream?branch=master)

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
