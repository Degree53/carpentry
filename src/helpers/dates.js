// Various magic numbers are needed for manipulating dates and
// creating data structures that are used for displaying grids...
/* eslint no-magic-numbers: [ 2, {
	"ignore": [ 0, 1, 2, 3, 7, 9, 10, 12, 42 ]
}] */

export default {
	
	getPrevMonth (date) {
		const prevMonth = new Date(date.getTime());
		
		prevMonth.setMonth(date.getMonth() - 1);
		
		return prevMonth;
	},
	
	getNextMonth (date) {
		const nextMonth = new Date(date.getTime());
		
		nextMonth.setMonth(date.getMonth() + 1);
		
		return nextMonth;
	},
	
	getPrevYear (date) {
		const prevYear = new Date(date.getTime());
		
		prevYear.setFullYear(date.getFullYear() - 1);
		
		return prevYear;
	},
	
	getNextYear (date) {
		const nextYear = new Date(date.getTime());
		
		nextYear.setFullYear(date.getFullYear() + 1);
		
		return nextYear;
	},
	
	getPrevDecade (date) {
		const prevDecade = new Date(date.getTime());
		
		prevDecade.setFullYear(date.getFullYear() - 10);
		
		return prevDecade;
	},
	
	getNextDecade (date) {
		const nextDecade = new Date(date.getTime());
		
		nextDecade.setFullYear(date.getFullYear() + 10);
		
		return nextDecade;
	},
	
	getDatesInMonth (date, weekStartDay) {
		let day = 1;
		
		// Offset the day to provide dates from previous month for
		// padding the calendar grid out
		const firstDayOfMonth = new Date(date.getFullYear(),
			date.getMonth(), 1).getDay();
		
		if (weekStartDay < firstDayOfMonth) {
			day -= firstDayOfMonth - weekStartDay;
		} else {
			day -= firstDayOfMonth + 7 - weekStartDay;
		}
		
		const dates = Array(42);
		
		for (let i = 0; i < 42; i++) {
			const newDate = new Date(date.getTime());
			newDate.setDate(day++);
			dates[i] = newDate;
		}
		
		return dates;
	},
	
	getMonthsInYear (date) {
		const months = Array(12);
		
		for (let i = 0; i < 12; i++) {
			const newDate = new Date(date.getTime());
			newDate.setMonth(i);
			months[i] = newDate;
		}
		
		return months;
	},
	
	getYearsInDecade (date) {
		// Get the last year of the previous decade
		const firstYear = new Date(date.getTime());
		firstYear.setFullYear(firstYear.getFullYear() - 10);
		firstYear.setFullYear(firstYear.toISOString().slice(0, 3) + 9);
		
		const years = Array(12);
		
		for (let i = 0; i < 12; i++) {
			const newDate = new Date(firstYear.getTime());
			newDate.setFullYear(newDate.getFullYear() + i);
			years[i] = newDate;
		}
		
		return years;
	},
	
	toFormattedString (date, formatStr) {
		const year = String(date.getFullYear());
		const shortYear = year.match(/\d\d(\d\d)/)[1];
		const month = String(date.getMonth() + 1);
		const monthPadded = month.length < 2 ? `0${month}` : month;
		const day = String(date.getDate());
		const dayPadded = day.length < 2 ? `0${day}` : day;
		
		return formatStr
			.replace(/[Yy]{4}/, year)
			.replace(/[Yy]{2}/, shortYear)
			.replace(/[Mm]{2}/, monthPadded)
			.replace(/[Mm]/, month)
			.replace(/[Dd]{2}/, dayPadded)
			.replace(/[Dd]/, day);
	}
	
};
