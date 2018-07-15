import { expect }     from 'chai';

import ArrayFormatter from '../../src/formatters/Array';
import config         from '../../src/config';

describe('Array formatter', function () {
	beforeEach(() => {
		this.formatter = new ArrayFormatter(config);
	});
	
	it('should throw error if recieve not array', () => {
		const format = () => {
			this.formatter.format('a');
		};
		
		expect(format).to.throw(Error);
	});
	
	it('result should be a string', () => {
		const result = this.formatter.format([1, 2], 1, value => value);
		expect(result).to.be.a('string');
	});
	
	it('result should include "Object" string if element is type of "Object"', () => {
		const result = this.formatter.format([{}]);
		expect(result).to.include('Object');
	});
});
