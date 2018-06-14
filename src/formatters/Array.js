import BaseFormatter from './BaseFormatter';

export default class ArrayFormatter extends BaseFormatter {
	format(array) {
		const arrayString = array.map((item) => {
			if (typeof item === 'object') {
				return this.config.colors.object.system('Object');
			}
			
			return item;
		});
		
		return `[${arrayString.join(', ')}]`;
	}
}
