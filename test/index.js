import bunyan       from 'bunyan';

import { expect }          from 'chai';
import StdoutStream        from '../src';

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
});
