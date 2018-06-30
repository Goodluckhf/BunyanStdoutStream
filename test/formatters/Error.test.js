import { expect }     from 'chai';
import { cloneDeep }  from 'lodash';

import ErrorFormatter from '../../src/formatters/Error';
import Stream         from '../../src/index';
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
	
	it('should highlight stack line for current project', () => {
		const error        = new Error('error here');
		const clonedConfig = cloneDeep(config);
		clonedConfig.colors.stackHighlight = line => `||${line}||`;
		
		const fileName = __filename.replace(`${process.cwd()}/`, '');
		
		const formatter = new ErrorFormatter(clonedConfig);
		const stack     = formatter.formatErrorStack(error.stack);
		const regExp    = new RegExp(`||.*${fileName}.*||`, 'mg');
		const result    = regExp.test(stack);
		
		return expect(result).to.be.true;
	});
	
	it('should not highlight stack for node_modules', () => {
		const error        = new Error('error here');
		const clonedConfig = cloneDeep(config);
		clonedConfig.colors.stackHighlight = line => `||${line}||`;
		
		const formatter = new ErrorFormatter(clonedConfig);
		const stack     = formatter.formatErrorStack(error.stack);
		const result    = /\|\|.*node_modules.*\|\|/mg.test(stack);
		
		return expect(result).to.be.false;
	});
});
