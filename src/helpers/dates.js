export default {
	
	getPrevMonth(date) {
		let prevMonth = new Date(date.getTime());
		
		prevMonth.setMonth(date.getMonth() - 1);
		
		return prevMonth;
	},
	
	getNextMonth(date) {
		let nextMonth = new Date(date.getTime());
		
		nextMonth.setMonth(date.getMonth() + 1);
		
		return nextMonth;
	},
	
	getPrevYear(date) {
		let prevYear = new Date(date.getTime());
		
		prevYear.setFullYear(date.getFullYear() - 1);
		
		return prevYear;
	},
	
	getNextYear(date) {
		let nextYear = new Date(date.getTime());
		
		nextYear.setFullYear(date.getFullYear() + 1);
		
		return nextYear;
	},
	
	getPrevDecade(date) {
		let prevDecade = new Date(date.getTime());
		
		prevDecade.setFullYear(date.getFullYear() - 10);
		
		return prevDecade;
	},
	
	getNextDecade(date) {
		let nextDecade = new Date(date.getTime());
		
		nextDecade.setFullYear(date.getFullYear() + 10);
		
		return nextDecade;
	},
	
	getDatesInMonth(date, startDay) {
		let firstDay = new Date(date.getFullYear(),
			date.getMonth(), 1).getDay();
		
		let offset = 1 - (startDay < firstDay ?
		    firstDay - startDay : firstDay + 7 - startDay);
		
		return Array.apply(null, new Array(42)).map(() => {
			let newDate = new Date(date.getTime());
			newDate.setDate(offset++);
			return newDate;
		});
	},
	
	getMonthsInYear(date) {
		let i = 0;
		
		return Array.apply(null, new Array(12)).map(() => {
			let newDate = new Date(date.getTime());
			newDate.setMonth(i++);
			return newDate;
		});
	},
	
	getYearsInDecade(date) {
		let firstYear = new Date(date.getTime());
		firstYear.setFullYear(firstYear.getFullYear() - 10);
		firstYear.setFullYear(firstYear.toISOString().slice(0, 3) + 9);
		
		let i = 0;
		
		return Array.apply(null, new Array(12)).map(() => {
			let newDate = new Date(firstYear.getTime());
			newDate.setFullYear(newDate.getFullYear() + i++);
			return newDate;
		});
	},
	
	toFormattedString(date, formatStr) {
		const year = String(date.getFullYear());
		const shortYear = year.match(/\d\d(\d\d)/)[1];
		const month = String(date.getMonth() + 1);
		const monthPadded = month.length < 2 ? '0' + month : month;
		const day = String(date.getDate());
		const dayPadded = day.length < 2 ? '0' + day : day;
		
		return formatStr
			.replace(/[Yy]{4}/, year)
			.replace(/[Yy]{2}/, shortYear)
			.replace(/[Mm]{2}/, monthPadded)
			.replace(/[Mm]/, month)
			.replace(/[Dd]{2}/, dayPadded)
			.replace(/[Dd]/, day);
	}
	
};
