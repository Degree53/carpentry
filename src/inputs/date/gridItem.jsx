'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'DateGridItem',
	
	onDateClick: function() {
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
		switch (this.props.level) {
			case 0:
				return (
					<div
						className={this.props.className + '__dateCell'}
						style={this.styles.dateCell}
						onClick={this.onDateClick}>
						<div className={this.props.className + '__date'}>
							{this.props.date.getDate()}
						</div>
					</div>
				);
			case 1:
				return (
					<div
						className={this.props.className + '__monthCell'}
						style={this.styles.dateCell}
						onClick={this.onMonthClick}>
						<div className={this.props.className + '__month'}>
							{this.props.locale.monthNames[this.props.date.getMonth()]}
						</div>
					</div>
				);
			case 2:
				return (
					<div
						className={this.props.className + '__yearCell'}
						style={this.styles.dateCell}
						onClick={this.onYearClick}>
						<div className={this.props.className + '__year'}>
							{this.props.date.getFullYear()}
						</div>
					</div>
				);
		}
	},
	
	styles: {
		dateCell: {
			boxSizing: 'border-box',
			display: 'table-cell',
			cursor: 'pointer'
		}
	}
	
});
