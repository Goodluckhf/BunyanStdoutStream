// eslint-disable-next-line import/no-extraneous-dependencies
import bunyan from 'bunyan';
import BSON from 'bson';
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
		_id: BSON.ObjectId('5b6f28ac588b35524fd5edee'),
		
		testNestedObject: {
			value: 10,
		},
		otherNestedObject: {
			value      : true,
			stringValue: 'sad',
		},
		array             : [1, 3, 'fi', () => {}],
		systemValue       : null,
		anotherSystemValue: undefined,
	};
	
	logger.error({
		error,
		message     : 'log description',
		anotherValue: 'string',
	});
}());
