'use strict';

var React = require('react');
var moment = require('moment');

var Navbar = require('navbar');
var Grid = require('grid');
var Buttons = require('buttons');

module.exports = React.createClass({
	
	calendarBlur: function() {
		this.props.setVisible(false);
	},
	
	render: function() {
		return (
			<div
				className={this.props.className + '__calendar'}
				onBlur={this.calendarBlur}>
				<Navbar
					className={this.props.className}
					moment={this.props.moment}
					level={this.props.level}
					setMoment={this.props.setMoment}
					setLevel={this.props.setLevel}
					setVisible={this.props.setVisible} />
				<Grid
					className={this.props.className}
					moment={this.props.moment}
					level={this.props.level}
					setMoment={this.props.setMoment}
					setLevel={this.props.setLevel}
					setVisible={this.props.setVisible} />
				<Buttons
					className={this.props.className}
					setMoment={this.props.setMoment}
					setVisible={this.props.setVisible} />
			</div>
		);
	}
	
});
