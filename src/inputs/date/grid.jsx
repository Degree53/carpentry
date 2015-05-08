'use strict';

var React = require('react');
var Utils = require('./utils');
var GridItem = require('./gridItem');

module.exports = React.createClass({
	
	displayName: 'DateGrid',
	
	getGridHead: function() {
		var firstDoW = 0 < this.props.firstDoW && this.props.firstDoW < 7 ?
			this.props.firstDoW : 1;
		var weekdays = this.props.locale.dayNames.slice(0);
		
		weekdays = weekdays.concat(weekdays.splice(0, firstDoW));
		
		var weekdayElems = weekdays.map(function(name, i) {
			return (
				<div
					className={this.props.className + '__headCell'}
					style={this.styles.headCell}
					key={i}>
					<div
						className={this.props.className + '__weekday'}
						style={this.styles.headElement}>
						{name}
					</div>
				</div>
			);
		}, this);
		
		return (
			<div
				className={this.props.className + '__headRow'}
				style={this.styles.head}>
				{weekdayElems}
			</div>
		);
	},
	
	getDayElems: function() {
		var firstDoW = 0 < this.props.firstDoW && this.props.firstDoW < 7 ?
			this.props.firstDoW : 1;
		var weeks = Utils.getMonthDates(this.props.viewDate, firstDoW);
		
		for (var i = 0; i < 6; i++)	weeks.push(weeks.splice(0, 7));
			
		return weeks.map(function(week, i) {
			var dateElems = week.map(function(date, j) {
				return (
					<GridItem
						className={this.props.className}
						selectedDate={this.props.selectedDate}
						setDate={this.props.setDate}
						setVisible={this.props.setVisible}
						date={date}
						level={this.props.level}
						key={j} />
				);
			}, this);
			
			return (
				<div
					className={this.props.className + '__bodyRow'}
					style={this.styles.body}
					key={i}>
					{dateElems}
				</div>
			);
		}, this);
	},
	
	getMonthElems: function() {
		var months = Utils.getYearMonths(this.props.viewDate);
		
		for (var i = 0; i < 3; i++)	months.push(months.splice(0, 4));
		
		return months.map(function(month, i) {
			var dateElems = month.map(function(date, j) {
				return (
					<GridItem
						className={this.props.className}
						locale={this.props.locale}
						selectedDate={this.props.selectedDate}
						date={date}
						level={this.props.level}
						setViewDate={this.props.setViewDate}
						setLevel={this.props.setLevel}
						key={j} />
				);
			}, this);
			
			return (
				<div
					className={this.props.className + '__bodyRow'}
					style={this.styles.body}
					key={i}>
					{dateElems}
				</div>
			);
		}, this);
	},
	
	getYearElems: function() {
		var years = Utils.getDecadeYears(this.props.viewDate);
		
		for (var i = 0; i < 3; i++)	years.push(years.splice(0, 4));
		
		return years.map(function(year, i) {
			var dateElems = year.map(function(date, j) {
				return (
					<GridItem
						className={this.props.className}
						locale={this.props.locale}
						selectedDate={this.props.selectedDate}
						date={date}
						level={this.props.level}
						setViewDate={this.props.setViewDate}
						setLevel={this.props.setLevel}
						key={j} />
				);
			}, this);
			
			return (
				<div
					className={this.props.className + '__bodyRow'}
					style={this.styles.body}
					key={i}>
					{dateElems}
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
			<div
				className={this.props.className + '__grid'}
				style={this.styles.grid}>
				{this.props.level === 0 ? this.getGridHead() : false}
				{this.getGridItems()}
			</div>
		);
	},
	
	styles: {
		grid: {
			display: 'table',
			width: '100%'
		},
		head: {
			display: 'table-row',
			cursor: 'default'
		},
		headCell: {
			display: 'table-cell',
			verticalAlign: 'middle'
		},
		headElement: {
			display: 'inline-block'
		},
		body: {
			display: 'table-row'
		}
	}
	
});
