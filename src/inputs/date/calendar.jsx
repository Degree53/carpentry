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
	
	onCalendarBlur: function() {
		this.props.setVisible(false);
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
				onBlur={this.onCalendarBlur}>
				<Navbar
					className={this.props.className}
					locale={this.props.locale}
					setDate={this.props.setDate}
					viewDate={this.state.viewDate}
					level={this.state.level}
					setViewDate={this.setViewDate}
					setLevel={this.setLevel} />
				<Grid
					className={this.props.className}
					locale={this.props.locale}
					setDate={this.props.setDate}
					viewDate={this.state.viewDate}
					level={this.state.level}
					setViewDate={this.setViewDate}
					setLevel={this.setLevel} />
				<Buttons
					className={this.props.className} />
			</div>
		);
	}
	
});
