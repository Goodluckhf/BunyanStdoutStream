import moment        from 'moment';
import BaseFormatter from './BaseFormatter';

export default class OptionLineFormatter extends BaseFormatter {
	format(data) {
		const timeString = moment(data.time).format('MM.DD HH:mm:ss');
		const source =
				(((new Error().stack)
					.split(/\n\s*[at]*\s*/g))[6])
					.replace(`${process.cwd()}/`, this.config.baseDir)
					.match(/\(?(\S*:\d+:\d+)\)?/)[1];
		
		return  `${this.config.colors[data.level].level} ` + // Log level
				`${this.config.colors.date(timeString)} ` + // Time
				`${this.config.colors[data.level].source(source)} ` + // Path source
				`${data.msg || data.message || ''}`;
	}
}
