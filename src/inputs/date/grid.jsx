'use strict';

var React = require('react');
var Utils = require('./utils');

module.exports = React.createClass({
	
	displayName: 'Grid',
	
	getGridHead: function() {
		var weekdays = this.props.locale.dayNames;
		var weekdayElems = weekdays.map(function(name, i) {
			return (
				<div
					className={this.props.className + '__weekday'}
					key={i}>
					{name}
				</div>
			);
		}, this);
		
		return (
			<div className={this.props.className + '__gridHead'}>
				{weekdayElems}
			</div>
		);
	},
	
	getDayElems: function() {
		var days = Utils.getMonthDates(this.props.viewDate);
		return days.map(function(date, i) {
			return (
				<div
					className={this.props.className + '__day'}
					key={i}>
					{date.getDate()}
				</div>
			);
		}, this);
	},
	
	getMonthElems: function() {
		var months = Utils.getYearMonths(this.props.viewDate);
		return months.map(function(date, i) {
			return (
				<div
					className={this.props.className + '__month'}
					key={i}>
					{this.props.locale.monthNames[date.getMonth()]}
				</div>
			);
		}, this);
	},
	
	getYearElems: function() {
		var years = Utils.getDecadeYears(this.props.viewDate);
		return years.map(function(date, i) {
			return (
				<div
					className={this.props.className + '__year'}
					keu={i}>
					{date.getFullYear()}
				</div>
			);
		}, this);
	},
	
	getGridItems: function() {
		switch (this.props.level) {
			case 0:
				return this.getDayElems();
			case 1:
				return this.getMonthElems();
			case 2:
				return this.getYearElems();
		}
	},
	
	render: function() {
		return (
			<div className={this.props.className + '__grid'}>
				{this.props.level === 0 ? this.getGridHead() : false}
				<div className={this.props.className + '__gridBody'}>
					{this.getGridItems()}
				</div>
			</div>
		);
	}
	
});
