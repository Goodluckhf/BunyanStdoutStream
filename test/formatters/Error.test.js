import { expect }     from 'chai';

import ErrorFormatter from '../../src/formatters/Error';
import config         from '../../src/config';

describe('ErrorFormatter', function () {
	beforeEach(() => {
		this.formatter = new ErrorFormatter(config);
	});
	
	it('The type of value should be "Error"', () => {
		const format = () => {
			this.formatter.format('');
		};
		
		expect(format).to.throw(Error);
	});
	
	it('result should be a string', () => {
		const result = this.formatter.format(new Error(), 0, () => '');
		expect(result).to.be.a('string');
	});
});
