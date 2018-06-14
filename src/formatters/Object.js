import BaseFormatter from './BaseFormatter';

export default class ObjectFormatter extends BaseFormatter {
	format(data, depth, formatVariable) {
		return Object.keys(data).reduce((str, key) => {
			const value = data[key];
			
			const indentString  = this._buildIndentString(depth + 1);
			const displayString = formatVariable(value, depth + 1);
			return `${str}${indentString}${this.config.colors.object.key(key, depth)}: ${displayString}`;
		}, '');
	}
}
