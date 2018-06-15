import bunyan       from 'bunyan';

import { expect }   from 'chai';
import clc          from 'cli-color';
import StdoutStream from '../src';

describe('integration with bunyan', () => {
	it('Should not throw error', () => {
		const createLogger = () => {
			bunyan.createLogger({
				name   : 'logger',
				streams: [
					{
						level : 'trace',
						type  : 'raw',
						stream: new StdoutStream(),
					},
				],
			});
		};
		
		expect(createLogger).to.not.throw();
	});
});

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
});
