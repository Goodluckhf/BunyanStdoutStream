import { expect }   from 'chai';
import bunyan       from 'bunyan';

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
