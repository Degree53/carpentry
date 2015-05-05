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
						className={this.props.className + '__gridCell'}
						style={this.styles.gridCell}>
						<div
							className={this.props.className + '__date'}
							style={this.styles.gridElement}
							onClick={this.onDateClick}>
							{this.props.date.getDate()}
						</div>
					</div>
				);
			case 1:
				return (
					<div
						className={this.props.className + '__gridCell'}
						style={this.styles.gridCell}>
						<div
							className={this.props.className + '__month'}
							style={this.styles.gridElement}
							onClick={this.onMonthClick}>
							{this.props.locale.monthNames[this.props.date.getMonth()]}
						</div>
					</div>
				);
			case 2:
				return (
					<div
						className={this.props.className + '__gridCell'}
						style={this.styles.gridCell}>
						<div
							className={this.props.className + '__year'}
							style={this.styles.gridElement}
							onClick={this.onYearClick}>
							{this.props.date.getFullYear()}
						</div>
					</div>
				);
		}
	},
	
	styles: {
		gridCell: {
			boxSizing: 'border-box',
			display: 'table-cell'
		},
		gridElement: {
			boxSizing: 'border-box',
			cursor: 'pointer'
		}
	}
	
});
