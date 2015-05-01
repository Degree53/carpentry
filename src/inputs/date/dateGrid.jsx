'use strict';

var React = require('react');
var Utils = require('./utils');
var DateGridItem = require('./dateGridItem');

module.exports = React.createClass({
	
	displayName: 'DateGrid',
	
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
				<DateGridItem
					className={this.props.className}
					setDate={this.props.setDate}
					setVisible={this.props.setVisible}
					date={date}
					level={this.props.level}
					key={i} />
			);
		}, this);
	},
	
	getMonthElems: function() {
		var months = Utils.getYearMonths(this.props.viewDate);
		return months.map(function(date, i) {
			return (
				<DateGridItem
					className={this.props.className}
					locale={this.props.locale}
					date={date}
					level={this.props.level}
					setViewDate={this.props.setViewDate}
					setLevel={this.props.setLevel}
					key={i} />
			);
		}, this);
	},
	
	getYearElems: function() {
		var years = Utils.getDecadeYears(this.props.viewDate);
		return years.map(function(date, i) {
			return (
				<DateGridItem
					className={this.props.className}
					locale={this.props.locale}
					date={date}
					level={this.props.level}
					setViewDate={this.props.setViewDate}
					setLevel={this.props.setLevel}
					key={i} />
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
