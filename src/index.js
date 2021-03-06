import deepExtend          from 'deep-extend';
import BSON                from 'bson';
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
	constructor(config = {}, formatters = defaultFormatters, stream = process.stdout) {
		const formattersClasses = { ...defaultFormatters, ...formatters };
		this.config             = deepExtend({}, defaultConfig, config);
		
		this.optionLineFormatter = new formattersClasses.OptionLineFormatter(this.config);
		this.arrayFormatter      = new formattersClasses.ArrayFormatter(this.config);
		this.errorFormatter      = new formattersClasses.ErrorFormatter(this.config);
		this.objectFormatter     = new formattersClasses.ObjectFormatter(this.config);
		
		this.objectsForCircularChecks = new WeakMap();
		this.stream = stream;
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
			if (this.config.convertArrayLikeObject) {
				return this.objectFormatter.format(variable, depth, this.formatVariable.bind(this));
			}
			
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
		
		if (variable instanceof BSON.ObjectId //eslint-disable-line no-mixed-operators
			|| variable.constructor && variable.constructor.name.toLowerCase() === 'objectid' //eslint-disable-line no-mixed-operators
		) {
			const startSequence = this.config.colors.object.system('ObjectId("');
			const endSequence   = this.config.colors.object.system('")');
			
			return `${startSequence}${variable.toString()}${endSequence}`;
		}
		
		if (typeof variable === 'object') {
			if (this.objectsForCircularChecks.has(variable)) {
				if (this.objectsForCircularChecks.get(variable) < depth + 1) {
					return this.config.colors.object.system('Circular');
				}
			}
			
			this.objectsForCircularChecks.set(variable, depth + 1);
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
		this.objectsForCircularChecks = new WeakMap();
		return this.stream.write(this.createStringFromVariable(data));
	}
}
