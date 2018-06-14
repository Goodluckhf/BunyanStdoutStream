import deepExtend          from 'deep-extend';
import defaultConfig       from './config';
import OptionLineFormatter from './formatters/OptionLine';
import ArrayFormatter      from './formatters/Array';
import ErrorFormatter      from './formatters/Error';
import ObjectFormatter     from './formatters/Object';

const defaultFormatters = {
	OptionLineFormatter,
	ArrayFormatter,
	ErrorFormatter,
	ObjectFormatter,
};

const excludeDefaultKeysS = Symbol('excludeDefaultKeys');

export default class BunyanStdoutStream {
	constructor(config = {}, formatters = defaultFormatters) {
		const formattersClasses = { ...defaultFormatters, formatters };
		this.config = Object.freeze(deepExtend(defaultConfig, config));
		
		this.optionLineFormatter = new formattersClasses.OptionLineFormatter(this.config);
		this.arrayFormatter      = new formattersClasses.ArrayFormatter(this.config);
		this.errorFormatter      = new formattersClasses.ErrorFormatter(this.config);
		this.objectFormatter     = new formattersClasses.ObjectFormatter(this.config);
		
		// maybe extract as dependency
		this.stream = process.stdout;
	}
	
	[excludeDefaultKeysS](object) {
		return Object.keys(object).reduce((ob, key) => {
			if (this.config.excludeKeys.includes(key)) {
				return ob;
			}
			
			return { ...ob, [key]: object[key] };
		}, {});
	}
	
	formatVariable(variable, depth) {
		if (depth === this.config.maxDepth) {
			return this.config.colors.object.system('Max depth');
		}
		
		let displayString = '';
		if (Array.isArray(variable)) {
			displayString = this.arrayFormatter.format(variable, depth, this.formatVariable.bind(this));
		} else if (variable instanceof Error) {
			displayString = this.errorFormatter.format(variable, depth, this.formatVariable.bind(this));
		} else if (variable === null) {
			displayString = this.config.colors.object.system('null');
		} else if (typeof variable === 'undefined') {
			displayString = this.config.colors.object.system('undefined');
		} else if (typeof variable === 'function') {
			displayString = this.config.colors.object.system('Function');
		} else if (typeof variable === 'object') {
			displayString = this.objectFormatter.format(variable, depth, this.formatVariable.bind(this));
		}  else {
			displayString = variable;
		}
		return displayString;
	}
	
	write(data) {
		const optionLine = this.optionLineFormatter.format(data);
		this.stream.write(`${optionLine}`);
		
		const objectForDisplay = this[excludeDefaultKeysS](data);
		if (Object.keys(objectForDisplay).length === 0) {
			this.stream.write('\n');
			return;
		}
		
		this.stream.write(this.formatVariable(objectForDisplay, 0));
		this.stream.write('\n');
	}
}
