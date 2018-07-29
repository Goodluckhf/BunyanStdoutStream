import clc          from 'cli-color';
import { expect }   from 'chai';

import StdoutStream from '../src';

describe('Config', () => {
	it('Formatter can be changed from config', () => {
		class CustomFormatter {}
		
		const stdoutStream = new StdoutStream({}, { OptionLineFormatter: CustomFormatter });
		expect(stdoutStream.optionLineFormatter).to.be.instanceOf(CustomFormatter);
	});
	
	it('config color can be change', () => {
		const expectedValue = clc.red('test');
		const stdoutStream = new StdoutStream({
			colors: {
				30: {
					level: expectedValue,
				},
			},
		});
		
		expect(stdoutStream.config.colors[30].level).to.be.equal(expectedValue);
	});
	
	it('result should be formatted like object if set config value', () => {
		const object = { 0: 'test1', 1: { a: 'test2' } };
		const array  = ['test1', { a: 'test2' }];
		const stdoutSteam = new StdoutStream({
			convertArrayLikeObject: true,
		}, {}, { write: value => value });
		
		expect(stdoutSteam.write({ level: 30, data: array }))
			.to.be.equal(stdoutSteam.write({ level: 30, data: object }));
	});
	
	it('result should not be formatted like object if config value set false', () => {
		const object = { 0: 'test1', 1: { a: 'test2' } };
		const array  = ['test1', { a: 'test2' }];
		const stdoutSteam = new StdoutStream({
			convertArrayLikeObject: false,
		}, {}, { write: value => value });
		
		expect(stdoutSteam.write({ level: 30, data: array }))
			.to.not.be.equal(stdoutSteam.write({ level: 30, data: object }));
	});
});
