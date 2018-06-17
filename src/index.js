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
		const formattersClasses = { ...defaultFormatters, ...formatters };
		this.config             = deepExtend(defaultConfig, config);
		
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
	
	formatVariable(variable, depth = 0) {
		if (depth === this.config.maxDepth) {
			return this.config.colors.object.system('Max depth');
		}
		
		if (Array.isArray(variable)) {
			return this.arrayFormatter.format(variable, depth, this.formatVariable.bind(this));
		}
		
		if (variable instanceof Error) {
			return this.errorFormatter.format(variable, depth, this.formatVariable.bind(this));
		}
		
		if (variable === null) {
			return this.config.colors.object.system('null');
		}
		
		if (typeof variable === 'undefined') {
			return this.config.colors.object.system('undefined');
		}
		
		if (typeof variable === 'function') {
			return this.config.colors.object.system('Function');
		}
		
		if (typeof variable === 'object') {
			return this.objectFormatter.format(variable, depth, this.formatVariable.bind(this));
		}
		
		if (typeof  variable === 'string') {
			return `"${variable}"`;
		}
		
		return variable;
	}
	
	createStringFromVariable(data) {
		let resultString = '';
		const optionLine = this.optionLineFormatter.format(data);
		resultString = `${resultString}${optionLine}`;
		
		const objectForDisplay = this[excludeDefaultKeysS](data);
		if (Object.keys(objectForDisplay).length === 0) {
			return `${resultString}\n`;
		}
		
		resultString = `${resultString}${this.formatVariable(objectForDisplay, 0)}`;
		return `${resultString}\n`;
	}
	
	write(data) {
		this.stream.write(this.createStringFromVariable(data));
	}
}
