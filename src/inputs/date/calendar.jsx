'use strict';

var React = require('react');
var Navbar = require('./navbar');
var Grid = require('./grid');
var Buttons = require('./buttons');

module.exports = React.createClass({
	
	displayName: 'Calendar',
	
	getInitialState: function() {
		return {
			level: 0
		};
	},
	
	onCalendarBlur: function() {
		this.props.setVisible(false);
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
					date={this.props.date}
					level={this.state.level}
					setLevel={this.setLevel} />
				<Grid
					className={this.props.className}
					locale={this.props.locale}
					level={this.state.level} />
				<Buttons
					className={this.props.className} />
			</div>
		);
	}
	
});
