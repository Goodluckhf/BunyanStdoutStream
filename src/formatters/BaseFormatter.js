export default class BaseFormatter {
	constructor(config) {
		this.config = config;
	}
	
	// eslint-disable-next-line class-methods-use-this
	format() {
		throw new Error('Not implemented');
	}
	
	_buildIndentString(count) {
		const indentString = Array.from({ length: count - 1 }).reduce((str, _, key) => `${str}${this.config.colors.object.indent(key, false)}`, '');
		
		return `${this.config.colors.object.indent()}${indentString}`;
	}
}
