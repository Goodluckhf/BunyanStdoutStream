import moment from 'moment';

export default class {
	constructor(config) {
		this.config = config;
	}
	
	format(data) {
		const timeString = moment(data.time).format('MM.DD HH:mm:ss');
		const source =
				(((new Error().stack)
					.split(/\n\s*[at]*\s*/g))[5])
					.replace(`${process.cwd()}/`, '')
					.match(/\(?(\S*:\d+:\d+)\)?/)[1];
		
		return  `${this.config.colors[data.level].level} ` + // Log level
				`${this.config.colors.date(timeString)} ` + // Time
				`${this.config.colors[data.level].source(source)} ` + // Path source
				`${data.msg || data.message || ''}`;
	}
}
