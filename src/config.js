import clc from 'cli-color';

export default {
	
	// Maximum nested object parsing
	maxDepth: 5,
	
	colors: {
		date: date => clc.blackBright(date),
		
		stackHighlight: line => clc.xterm(203)(line),
		
		// info
		30: {
			level : clc.bgBlue('i'),
			source: source => clc.blue(source),
		},
		
		// warning
		40: {
			level : clc.bgYellow('w'),
			source: source => clc.yellow(source),
		},
		
		// error
		50: {
			level : clc.bgRed('e'),
			source: source => clc.red(source),
		},
		
		object: {
			
			// Indent (like "\n| ")
			indent: (count = 1, isEOL = true) => {
				const line = count % 2 !== 0 ? '|' : '¦';
				return isEOL ? `\n${line} ` : `${line} `;
			},
			
			// Object key
			key: (key, count) => {
				return count % 2 === 0 ? clc.cyan(key) : clc.cyanBright(key);
			},
			
			// System value (null, undefined...)
			system: val => clc.yellowBright(val),
		},
	},
	
	// Default bunyan keys
	// These keys will not apear in 1st level
	excludeKeys: ['name', 'hostname', 'pid', 'v', 'time', 'msg', 'level', 'message'],
	
	
	// replacing paths in errors stack
	baseDir: './',
};
