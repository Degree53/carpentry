'use strict';

var React = require('react');
var Navbar = require('./navbar');
var Grid = require('./grid');
var Buttons = require('./buttons');

module.exports = React.createClass({
	
	displayName: 'Calendar',
	
	getInitialState: function() {
		var initDate = this.props.date;
		
		return {
			viewDate: initDate,
			level: 0
		};
	},
	
	// Fix for IE changing focus to child elements which
	// would incorrectly trigger blur and hide the calendar
	onCalendarMouseDown: function(e) {
		e.preventDefault();
	},
	
	setViewDate: function(date ) {
		this.setState({ viewDate: date });
	},
	
	setLevel: function(value) {
		var newLevel = this.state.level + value;
		if (0 <= newLevel && newLevel <= 2)
			this.setState({ level: newLevel });
	},
	
	render: function() {
		return (
			<div
				className={this.props.className + '__calendar'}
				style={this.styles.calendar}
				onMouseDown={this.onCalendarMouseDown}>
				<Navbar
					className={this.props.className}
					locale={this.props.locale}
					viewDate={this.state.viewDate}
					level={this.state.level}
					setViewDate={this.setViewDate}
					setLevel={this.setLevel} />
				<Grid
					className={this.props.className}
					locale={this.props.locale}
					firstDoW={this.props.firstDoW}
					setDate={this.props.setDate}
					setVisible={this.props.setVisible}
					viewDate={this.state.viewDate}
					level={this.state.level}
					setViewDate={this.setViewDate}
					setLevel={this.setLevel} />
				<Buttons
					className={this.props.className} />
			</div>
		);
	},
	
	styles: {
		calendar: {
			boxSizing: 'border-box',
			position: 'absolute',
			textAlign: 'center'
		}
	}
	
});
