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
const error = new Error('Error here!');
error.a = {
	b: {
		l: 10,
	},
	c: {
		n: true,
		g: 'sad',
	},
	d  : [1, 3, 'fi'],
	sd : null,
	lol: undefined,
};

error.isMessage = false;
logger.error({ error });
logger.warn({ error });
logger.info('test');
logger.info({ error });
