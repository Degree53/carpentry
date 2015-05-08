'use strict';

var React = require('react');
var Utils = require('./utils');

module.exports = React.createClass({
	
	displayName: 'Buttons',
	
	onTodayClick: function() {
		var today = Utils.cloneDate(new Date());
		
		this.props.setDate(today);
		this.props.setVisible(false);
	},
	
	render: function() {
		return (
			<div className={this.props.className + '__buttons'}>
				<div
					className={this.props.className + '__today'}
					style={this.styles.today}
					onClick={this.onTodayClick}>
					{this.props.locale.today}
				</div>
			</div>
		);
	},
	
	styles: {
		today: {
			display: 'inline-block',
			cursor: 'pointer'
		}
	}
	
});
