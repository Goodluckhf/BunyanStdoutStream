import { expect }    from 'chai';
import { cloneDeep } from 'lodash';

import OptionLineFormatter from '../../src/formatters/OptionLine';
import config              from '../../src/config';

describe('OptionLineFormatter', function () {
	beforeEach(() => {
		const clonedConfig   = cloneDeep(config);
		clonedConfig.baseDir = '-__test_Base_dir__-';
		this.config          = clonedConfig;
		
		this.formatter = new OptionLineFormatter(clonedConfig);
		this.data      = {
			time : new Date(),
			level: 30,
			msg  : '-__test__-',
		};
	});
	
	it('result string should include msg', () => {
		const result = this.formatter.format(this.data);
		expect(result).to.be.a('string').and.to.include(this.data.msg);
	});
	
	it('result string should include replaced base directory', () => {
		const result = this.formatter.format(this.data);
		expect(result).to.include(this.config.baseDir);
	});
	
	it('message can be take from "message" property', () => {
		delete this.data.msg;
		this.data.message = '____test_____';
		const result = this.formatter.format(this.data);
		expect(result).to.be.a('string').and.to.include(this.data.message);
	});
});
