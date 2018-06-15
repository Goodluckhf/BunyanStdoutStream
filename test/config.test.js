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
});
