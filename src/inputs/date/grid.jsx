'use strict';

var React = require('react');
var DateUtils = require('./utils');
var GridItem = require('./gridItem');

module.exports = React.createClass({
	
	displayName: 'DateGrid',
	
	renderGridHead: function() {
		if (this.props.level === 0) {
			var weekdays = this.props.dayNames.slice(0);
			weekdays = weekdays.concat(weekdays.splice(0, this.props.firstDoW));
			
			var weekdayElems = weekdays.map(function(name, i) {
				return (
					<div className={this.props.className + '__headCell'} style={this.styles.headCell}
						key={i}>
						<div className={this.props.className + '__weekday'} style={this.styles.headContent}>
							{name}
						</div>
					</div>
				);
			}, this);
			
			return (
				<div className={this.props.className + '__headRow'} style={this.styles.head}>
					{weekdayElems}
				</div>
			);
		}
	},
	
	getGridDates: function() {
		switch (this.props.level) {
			case 0:
				var days = DateUtils.getMonthDates(this.props.viewDate, this.props.firstDoW);
				
				for (var i = 0; i < 6; i++) days.push(days.splice(0, 7));
				
				return days;
			case 1:
				var months = DateUtils.getYearMonths(this.props.viewDate);
				
				for (var j = 0; j < 3; j++) months.push(months.splice(0, 4));
				
				return months;
			case 2:
				var years = DateUtils.getDecadeYears(this.props.viewDate);
				
				for (var k = 0; k < 3; k++) years.push(years.splice(0, 4));
				
				return years;
		}
	},
	
	renderGridElems: function() {
		var rows = this.getGridDates();
		
		return rows.map(function(row, i) {
			var dateElems = row.map(function(date, j) {
				return (
					<GridItem className={this.props.className} monthNames={this.props.monthNames}
						selectedDate={this.props.selectedDate} setValue={this.props.setValue}
						setVisible={this.props.setVisible} viewDate={this.props.viewDate}
						level={this.props.level} setViewDate={this.props.setViewDate}
						setLevel={this.props.setLevel} date={date} key={j} />
				);
			}, this);
			
			return (
				<div className={this.props.className + '__bodyRow'} style={this.styles.body}
					key={i}>
					{dateElems}
				</div>
			);
		}, this);
	},
	
	render: function() {
		return (
			<div className={this.props.className + '__grid'} style={this.styles.grid}>
				{this.renderGridHead()}
				{this.renderGridElems()}
			</div>
		);
	},
	
	styles: {
		grid: {
			display: 'table'
		},
		head: {
			display: 'table-row',
			cursor: 'default'
		},
		headCell: {
			display: 'table-cell',
			verticalAlign: 'middle'
		},
		headContent: {
			display: 'inline-block'
		},
		body: {
			display: 'table-row'
		}
	}
	
});
