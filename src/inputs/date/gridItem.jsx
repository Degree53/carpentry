'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'DateGridItem',
	
	onDayClick: function() {
		this.props.setDate(this.props.date);
		this.props.setVisible(false);
	},
	
	onMonthClick: function() {
		this.props.setViewDate(this.props.date);
		this.props.setLevel(-1);
	},
	
	onYearClick: function() {
		this.props.setViewDate(this.props.date);
		this.props.setLevel(-1);
	},
	
	getGridItem: function() {
		var day = this.props.date.getDate();
		var selectedDay = this.props.selectedDate.getDate();
		var month = this.props.date.getMonth();
		var viewMonth = this.props.viewDate.getMonth();
		var selectedMonth = this.props.selectedDate.getMonth();
		var year = this.props.date.getFullYear();
		var selectedYear = this.props.selectedDate.getFullYear();
		var modifiers = '';
		
		switch (this.props.level) {
			case 0:
				if (month === viewMonth) modifiers += ' isThisMonth';
				
				if (day === selectedDay && month === selectedMonth &&
					year === selectedYear) modifiers += ' isSelected';
				
				return (
					<div
						className={this.props.className + '__day' +	modifiers}
						style={this.styles.gridElement}
						onClick={this.onDayClick}>
						{this.props.date.getDate()}
					</div>
				);
			case 1:
				if (month === selectedMonth && year === selectedYear)
					modifiers += ' isSelected';
				
				return (
					<div
						className={this.props.className + '__month' + modifiers}
						style={this.styles.gridElement}
						onClick={this.onMonthClick}>
						{this.props.locale.monthNames[month]}
					</div>
				);
			case 2:
				if (year === selectedYear) modifiers += ' isSelected';
				
				return (
					<div
						className={this.props.className + '__year' + modifiers}
						style={this.styles.gridElement}
						onClick={this.onYearClick}>
						{this.props.date.getFullYear()}
					</div>
				);
		}
	},
	
	render: function() {
		return (
			<div
				className={this.props.className + '__gridCell'}
				style={this.styles.gridCell}>
				{this.getGridItem()}
			</div>
		);
	},
	
	styles: {
		gridCell: {
			display: 'table-cell',
			verticalAlign: 'middle'
		},
		gridElement: {
			display: 'inline-block',
			cursor: 'pointer'
		}
	}
	
});
