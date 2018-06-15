import { expect }      from 'chai';
import ObjectFormatter from '../../src/formatters/Object';
import config          from '../../src/config';

describe('ObjectFormatter', function () {
	beforeEach(() => {
		this.formatter = new ObjectFormatter(config);
	});
	
	it('The type of value should be "Object"', () => {
		const format = () => {
			this.formatter.format(true);
		};
		
		expect(format).to.throw(Error);
	});
	
	it('result should be a string', () => {
		const result = this.formatter.format({});
		expect(result).to.be.a('string');
	});
	
	it('result should include key', () => {
		const key = 'custom-big-strange-key';
		const result = this.formatter.format({
			[key]: 19,
		}, 0, val => val);
		
		expect(result).to.include(key);
	});
	
	it('result shoukd include value', () => {
		const value = 'custom-big-strange-value';
		const result = this.formatter.format({
			key: value,
		}, 0, val => val);
		
		expect(result).to.include(value);
	});
});
