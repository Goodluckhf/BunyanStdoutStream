import BaseFormatter from './BaseFormatter';

export default class ErrorFormatter extends BaseFormatter {
	formatErrorStack(stack, depth) {
		const stackArray = stack.split('\n').slice(1).map((stackItem) => {
			return stackItem
				.replace(`${process.cwd()}/`, this.config.baseDir)
				.replace(/^\s*/, `${this._buildIndentString(depth + 1)}`);
		});
		return stackArray.join('');
	}
	
	/**
	 * @param data
	 * @param depth
	 * @param formatVariable universal method dependency
	 * @returns {string}
	 */
	format(data, depth, formatVariable) {
		if (!(data instanceof Error)) {
			throw new Error('The type of value should be "Error"');
		}
		// stack can be present in different key
		const stackKey = Object.keys(data).find((key) => {
			return /^stack/.test(key) && typeof data[key] === 'string';
		});
		
		if (stackKey) {
			// eslint-disable-next-line no-param-reassign
			data[stackKey] = this.formatErrorStack(data[stackKey], depth + 1);
		}
		
		const keyValuesString = formatVariable({
			message: data.message,
			...data,
		}, depth);
		
		return  `${keyValuesString}` +
				`${this._buildIndentString(depth + 1)}` +
				`${this.config.colors.object.key('stack', 1)}: ${this.formatErrorStack(data.stack, depth + 1)}`;
	}
}
