'use strict';

module.exports = {
	
	cloneDate: function(date) {
		var yr = date.getFullYear();
		var mth = date.getMonth();
		var dy = date.getDate();
		
		var newDate = new Date(yr, mth, dy);
		
		return newDate;
	},
	
	getPrevYear: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setMonth(0);
		newDate.setDate(0);
		newDate.setDate(date.getDate());
		newDate.setMonth(date.getMonth());
		
		return newDate;
	},
	
	getNextYear: function(date) {
		var newDate = this.cloneDate(date);
		
		newDate.setMonth(12);
		newDate.setDate(date.getDate());
		newDate.setMonth(date.getMonth());
		
		return newDate;
	},
	
	getFirstOfDecade: function(date, decade) {
		var newDate = this.getPrevYear(date);
		decade.unshift(newDate);
		debugger;
		var year = newDate.getFullYear();
	
		if (!year.toString().match(/9$/))
			this.getFirstOfDecade(newDate, decade);
		else {
			debugger;
			this.getLastOfDecade(date, decade);
		}
	},
	
	getLastOfDecade: function(date, decade) {
		var newDate = this.getNextYear(date);
		decade.push(newDate);
		debugger;
		var year = newDate.getFullYear();
	
		if (!year.toString().match(/0$/))
			this.getLastOfDecade(newDate, decade);
	},
	
	getDecade: function(date) {
		var decade = [date];
		this.getFirstOfDecade(date, decade);
		debugger;
		return decade;
	},
	
	getDecadeString: function(date) {
		var decade = this.getDecade(date);
		return decade[0].getFullYear() + ' - ' +
			decade[decade.length - 1].getFullYear();
	}
	
};
