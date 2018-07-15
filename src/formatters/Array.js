import BaseFormatter from './BaseFormatter';

export default class ArrayFormatter extends BaseFormatter {
	format(array, depth, formatVariable) {
		if (!Array.isArray(array)) {
			throw new Error('The type of value should be array');
		}
		
		const arrayString = array.map((item) => {
			if (typeof item === 'object') {
				return this.config.colors.object.system('Object');
			}
			
			return formatVariable(item, depth + 1);
		});
		
		return `[${arrayString.join(', ')}]`;
	}
}
