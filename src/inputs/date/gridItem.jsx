'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'DateGridItem',
	
	getGridItem: function() {
		var day = this.props.date.getDate();
		var selectedDay = this.props.selectedDate.getDate();
		var month = this.props.date.getMonth();
		var selectedMonth = this.props.selectedDate.getMonth();
		var year = this.props.date.getFullYear();
		var selectedYear = this.props.selectedDate.getFullYear();
		var selected = ' notSelected';
		
		switch (this.props.level) {
			case 0:
				var isThisMonth = this.props.isCurrentMonth ?
					' isThisMonth' : ' notThisMonth';
				if (day === selectedDay && month === selectedMonth &&
					year === selectedYear) selected = ' isSelected';
				
				return (
					<div
						className={this.props.className + '__day' +
							isThisMonth + selected}
						style={this.styles.gridElement}
						onClick={this.onDayClick}>
						{this.props.date.getDate()}
					</div>
				);
			case 1:
				if (month === selectedMonth && year === selectedYear)
					selected = ' selected';
				
				return (
					<div
						className={this.props.className + '__month' + selected}
						style={this.styles.gridElement}
						onClick={this.onMonthClick}>
						{this.props.locale.monthNames[month]}
					</div>
				);
			case 2:
				if (year === selectedYear) selected = ' selected';
				
				return (
					<div
						className={this.props.className + '__year' + selected}
						style={this.styles.gridElement}
						onClick={this.onYearClick}>
						{this.props.date.getFullYear()}
					</div>
				);
		}
	},
	
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
