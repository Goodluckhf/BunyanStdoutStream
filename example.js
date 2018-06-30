// eslint-disable-next-line import/no-extraneous-dependencies
import bunyan from 'bunyan';
import StdoutStream from './src/';

const logger = bunyan.createLogger({
	name   : 'exampleLogger',
	streams: [
		{
			level : 'trace',
			type  : 'raw',
			stream: new StdoutStream(),
		},
	],
	serializers: bunyan.stdSerializers,
});

(function test() {
	const error = new Error('Error here!');
	error.extraParams = {
		testNestedObject: {
			value: 10,
		},
		otherNestedObject: {
			value      : true,
			stringValue: 'sad',
		},
		array             : [1, 3, 'fi'],
		systemValue       : null,
		anotherSystemValue: undefined,
	};
	
	logger.error({ error });
	logger.warn({ error });
	logger.info('test');
	logger.info({ error });
}());
