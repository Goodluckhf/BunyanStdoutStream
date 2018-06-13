import deepExtend          from 'deep-extend';
import defaultConfig       from './config';
import OptionLineFormatter from './formatters/OptionLine';
import ArrayFormatter      from './formatters/Array';

const defaultFormatters = {
	OptionLineFormatter,
	ArrayFormatter,
};

export default class BunyanStdoutStream {
	constructor(config = {}, formatters = defaultFormatters) {
		const formattersClasses = { ...defaultFormatters, formatters };
		this.config = Object.freeze(deepExtend(defaultConfig, config));
		
		this.optionLineFormatter = new formattersClasses.OptionLineFormatter(this.config);
		this.arrayFormatter      = new formattersClasses.ArrayFormatter(this.config);
	}
	
	_buildIndentString(count) {
		const indentString = Array.from({ length: count - 1 }).reduce((str, _, key) => {
			return `${str}${this.config.colors.object.indent(key, false)}`;
		}, '');
		
		return `${this.config.colors.object.indent()}${indentString}`;
	}
	
	/*write(data) {
	
	}*/
}
