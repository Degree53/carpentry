'use strict';

var React = require('react');
// var moment = require('moment');

module.exports = React.createClass({
	
	getGridHead: function() {
		return (
			<div className={this.props.className + '__gridHead'}>
				<div className={this.props.className + '__gridRow'}>
					{/* this.getWeekDays() */}
				</div>
			</div>
		);
	},
	
	getGridItems: function() {
		
	},
	
	render: function() {
		return (
			<div
				className={this.props.className + '__grid'}
				onClick={this.gridClick}>
				{this.props.level === 0 ? this.getGridHead() : false}
				<div className={this.props.className + '__gridBody'}>
					{this.getGridItems()}
				</div>
			</div>
		);
	}
	
});
