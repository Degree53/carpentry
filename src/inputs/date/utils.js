'use strict';

module.exports = {
	
	cloneDate: function(date) {
		var yr = date.getFullYear();
		var mth = date.getMonth();
		var dy = date.getDate();
		
		var newDate = new Date(yr, mth, dy);
		
		return newDate;
	},
	
	getPrevDate: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setDate(date.getDate() - 1);
		
		return newDate;
	},
	
	getNextDate: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setDate(date.getDate() + 1);
		
		return newDate;
	},
	
	getLastDate: function(date) {
		var lastDay = this.getNextMonth(date);
		
		lastDay.setDate(0);
		
		return lastDay;
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
	
	getMonthDates: function(date) {
		var month = [date];
		var lastIndex = this.getLastDate(date).getDate();
		
		while (month[0].getDate() !== 1)
			month.unshift(this.getPrevDate(month[0]));
		
		while (month[month.length - 1].getDate() !== lastIndex)
			month.push(this.getNextDate(month[month.length - 1]));
		
		return month;
	},
	
	getYearMonths: function(date) {
		var year = [date];
		
		while (year[0].getMonth() !== 0)
			year.unshift(this.getPrevMonth(year[0]));
		
		while (year[year.length - 1].getMonth() !== 11)
			year.push(this.getNextMonth(year[year.length - 1]));
		
		return year;
	},
	
	getDecadeYears: function(date) {
		var decade = [date];
		
		while (decade[0].toISOString()[3] !== '0')
			decade.unshift(this.getPrevYear(decade[0]));
		
		while (decade[decade.length - 1].toISOString()[3] !== '9')
			decade.push(this.getNextYear(decade[decade.length - 1]));
		
		decade.unshift(this.getPrevYear(decade[0]));
		decade.push(this.getNextYear(decade[decade.length - 1]));
		
		return decade;
	}
	
};
