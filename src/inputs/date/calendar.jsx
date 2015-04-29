'use strict';

var React = require('react');

var Navbar = require('./navbar');
var Grid = require('./grid');
var Buttons = require('./buttons');

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
					date={this.props.date}
					level={this.props.level}
					setDate={this.props.setDate}
					setLevel={this.props.setLevel}
					setVisible={this.props.setVisible} />
				<Grid
					className={this.props.className}
					date={this.props.date}
					level={this.props.level}
					setDate={this.props.setDate}
					setLevel={this.props.setLevel}
					setVisible={this.props.setVisible} />
				<Buttons
					className={this.props.className}
					setDate={this.props.setDate}
					setVisible={this.props.setVisible} />
			</div>
		);
	}
	
});
