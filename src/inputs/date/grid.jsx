'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'Grid',
	
	getGridHead: function() {
		var weekdays = this.props.locale.dayNames;
		var weekdayElems = weekdays.map(function(name, i) {
			return (
				<div
					className={this.props.className + '__weekday'}
					key={i}>
					{name}
				</div>
			);
		}, this);
		
		return (
			<div className={this.props.className + '__gridHead'}>
				{weekdayElems}
			</div>
		);
	},
	
	getDayElems: function() {
		
	},
	
	getMonthElems: function() {
		
	},
	
	getYearElems: function() {
		
	},
	
	getGridItems: function() {
		switch (this.props.level) {
			case 0: return this.getDayElems();
			case 1: return this.getMonthElems();
			case 2: return this.getYearElems();
		}
	},
	
	render: function() {
		return (
			<div className={this.props.className + '__grid'}>
				{this.props.level === 0 ? this.getGridHead() : false}
				{this.getGridItems()}
			</div>
		);
	}
	
});
