'use strict';

module.exports = {
	
	cloneDate: function(date) {
		var yr = date.getFullYear();
		var mth = date.getMonth();
		var dt = date.getDate();
		
		var newDate = new Date(yr, mth, dt);
		
		return newDate;
	},
	
	getPrevMonth: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setMonth(date.getMonth() - 1);
		
		return newDate;
	},
	
	getNextMonth: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setMonth(date.getMonth() + 1);
		
		return newDate;
	},
	
	getPrevYear: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setFullYear(date.getFullYear() - 1);
		
		return newDate;
	},
	
	getNextYear: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setFullYear(date.getFullYear() + 1);
		
		return newDate;
	},
	
	getPrevDecade: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setFullYear(date.getFullYear() - 10);
		
		return newDate;
	},
	
	getNextDecade: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setFullYear(date.getFullYear() + 10);
		
		return newDate;
	},
	
	getMonthDates: function(date, startDay) {
		var month = [];
		
		var yr = date.getFullYear();
		var mth = date.getMonth();
		var firstDay = new Date(yr, mth, 1).getDay();
		
		var offset = startDay < firstDay ? firstDay - startDay : firstDay + 7 - startDay;
		
		for (var i = -offset; i < (42 - offset); i++) {
			var newDate = this.cloneDate(date);
			newDate.setDate(i + 1);
			month.push(newDate);
		}
		
		return month;
	},
	
	getYearMonths: function(date) {
		var year = [date];
		
		while (year[0].getMonth() !== 0) year.unshift(this.getPrevMonth(year[0]));
		
		while (year[year.length - 1].getMonth() !== 11) year.push(this.getNextMonth(year[year.length - 1]));
		
		return year;
	},
	
	getDecadeYears: function(date) {
		var decade = [date];
		
		while (decade[0].toISOString()[3] !== '0') decade.unshift(this.getPrevYear(decade[0]));
		
		while (decade[decade.length - 1].toISOString()[3] !== '9')
			decade.push(this.getNextYear(decade[decade.length - 1]));
		
		decade.unshift(this.getPrevYear(decade[0]));
		decade.push(this.getNextYear(decade[decade.length - 1]));
		
		return decade;
	}
	
};
