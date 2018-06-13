export default class {
	constructor(config) {
		this.config = config;
	}
	
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
