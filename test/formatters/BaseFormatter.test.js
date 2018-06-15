import { expect }    from 'chai';
import { cloneDeep } from 'lodash';

import BaseFormatter from '../../src/formatters/BaseFormatter';
import config        from '../../src/config';

describe('BaseFormatter', function () {
	beforeEach(() => {
		this.config    = cloneDeep(config);
		this.config.colors.object.indent = () => '|';
		
		this.formatter = new BaseFormatter(this.config);
	});
	
	it('format method should be invoked from a subclass', () => {
		expect(this.formatter.format).to.throw(Error);
	});
	
	it('_buildIndentString should return correct indent string', () => {
		expect(this.formatter._buildIndentString(3)).to.be.equal('|||');
		expect(this.formatter._buildIndentString(4)).to.be.equal('||||');
		expect(this.formatter._buildIndentString(10)).to.be.equal('||||||||||');
	});
});
