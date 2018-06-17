import { expect }     from 'chai';

import ErrorFormatter from '../../src/formatters/Error';
import Stream from '../../src/index';
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
	
	it('should parse stack if it presents with different key', () => {
		const error = new Error('error here');
		error.stackDifferent = error.stack;
		const stream = new Stream(config);
		const result = this.formatter.format(error, 0, stream.formatVariable.bind(stream));
		expect(result).to.include('stackDifferent').and.not.include(process.cwd());
	});
});
