'use strict';

var React = require('react');
var Utils = require('./utils');
var DateGridItem = require('./dateGridItem');

module.exports = React.createClass({
	
	displayName: 'DateGrid',
	
	getGridHead: function() {
		var weekdays = this.props.locale.dayNames.slice(0);
		weekdays = weekdays.concat(weekdays.splice(0, this.props.firstDoW));
		
		var weekdayElems = weekdays.map(function(name, i) {
			return (
				<div
					className={this.props.className + '__weekday'}
					style={this.styles.gridCell}
					key={i}>
					{name}
				</div>
			);
		}, this);
		
		return (
			<div
				className={this.props.className + '__gridHead'}
				style={this.styles.gridHead}>
				<div
					className={this.props.className + '__gridHeadRow'}
					style={this.styles.gridHeadRow}>
					{weekdayElems}
				</div>
			</div>
		);
	},
	
	getDayElems: function() {
		var weeks = Utils.getMonthDates(this.props.viewDate,
			this.props.firstDoW);
		for (var i = 0; i < 6; i++)
			weeks.push(weeks.splice(0, 7));
			
		return weeks.map(function(week, i) {
			var dateElems = week.map(function(date, j) {
				return (
					<DateGridItem
						className={this.props.className}
						setDate={this.props.setDate}
						setVisible={this.props.setVisible}
						date={date}
						level={this.props.level}
						key={i + '.' + j} />
				);
			}, this);
			
			return (
				<div
					className={this.props.className}
					style={this.styles.gridBodyRow}>
					{dateElems}
				</div>
			);
		}, this);
	},
	
	getMonthElems: function() {
		var months = Utils.getYearMonths(this.props.viewDate);
		for (var i = 0; i < 3; i++)
			months.push(months.splice(0, 4));
		
		return months.map(function(month, i) {
			var dateElems = month.map(function(date, j) {
				return (
					<DateGridItem
						className={this.props.className}
						locale={this.props.locale}
						date={date}
						level={this.props.level}
						setViewDate={this.props.setViewDate}
						setLevel={this.props.setLevel}
						key={i + '.' + j} />
				);
			}, this);
			
			return (
				<div
					className={this.props.className}
					style={this.styles.gridBodyRow}>
					{dateElems}
				</div>
			);
		}, this);
	},
	
	getYearElems: function() {
		var years = Utils.getDecadeYears(this.props.viewDate);
		for (var i = 0; i < 3; i++)
			years.push(years.splice(0, 4));
		
		return years.map(function(year, i) {
			var dateElems = year.map(function(date, j) {
				return (
					<DateGridItem
						className={this.props.className}
						locale={this.props.locale}
						date={date}
						level={this.props.level}
						setViewDate={this.props.setViewDate}
						setLevel={this.props.setLevel}
						key={i + '.' + j} />
				);
			}, this);
			
			return (
				<div
					className={this.props.className}
					style={this.styles.gridBodyRow}>
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
				<div
					className={this.props.className + '__gridBody'}
					style={this.styles.gridBody}>
					{this.getGridItems()}
				</div>
			</div>
		);
	},
	
	styles: {
		grid: {
			display: 'table',
			width: '100%'
		},
		gridHead: {
			display: 'table-header-group'
		},
		gridHeadRow: {
			display: 'table-row'
		},
		gridBody: {
			display: 'table-row-group'
		},
		gridBodyRow: {
			display: 'table-row'
		},
		gridCell: {
			display: 'table-cell'
		}
	}
	
});
