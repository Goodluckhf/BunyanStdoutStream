import { expect }         from 'chai';
import BSON               from 'bson';
import { cloneDeep }      from 'lodash';
import BunyanStdoutStream from '../src';
import config             from '../src/config';

describe('BunyanStdoutStream', function () {
	beforeEach(() => {
		this.bunyanStream = new BunyanStdoutStream();
	});
	
	it('method "createStringFromVariable" should return string', () => {
		const result = this.bunyanStream.createStringFromVariable({
			level: 30,
		});
		expect(result).to.be.a('string');
	});
	
	it('method "createStringFromVariable" should return string if has extra keys', () => {
		const result = this.bunyanStream.createStringFromVariable({
			level: 30,
			test : 123,
		});
		expect(result).to.be.a('string');
	});
	
	
	it('Should parse objectId string', () => {
		const objectIdString = '5b6f28ac588b35524fd5edee';
		const testValue = { id: new BSON.ObjectId(objectIdString) };
		const result    = this.bunyanStream.formatVariable(testValue);
		expect(result).to.be.include(objectIdString);
	});
	
	describe('method "formatVariable"', () => {
		const testValues = [
			'test',
			[1, 2],
			{ a: 1 },
			null,
			undefined,
			() => {},
			{ i: { l: { n: { m: { t: { o: [] } } } } } },
			new Error(''),
		];
		
		testValues.forEach((testValue) => {
			it(`should return string if recieve: ${testValue}`, () => {
				const result = this.bunyanStream.formatVariable(testValue);
				expect(result).to.be.a('string');
			});
		});
		
		it('should return "circular"', () => {
			const clonnedConfig = cloneDeep(config);
			clonnedConfig.object = {
				indent: () => '',
				key   : () => '',
				system: () => '',
			};
			this.bunyanStream.config = clonnedConfig;
			const object1 = {};
			const object2 = {};
			object1.fu = object2;
			object2.fu = object1;
			const result = this.bunyanStream.formatVariable(object1);
			expect(result).to.include('Circular');
		});
		
		it('should not return "circular" if the same object exists on the same level', () => {
			const clonnedConfig = cloneDeep(config);
			clonnedConfig.object = {
				indent: () => '',
				key   : () => '',
				system: () => '',
			};
			this.bunyanStream.config = clonnedConfig;
			const object1 = { a: 1 };
			
			const result = this.bunyanStream.formatVariable([object1, object1]);
			expect(result).to.not.include('Circular');
		});
	});
});
