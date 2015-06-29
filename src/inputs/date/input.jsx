'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'Input',
	
	getDateFormatted: function() {
		var year = this.props.selectedDate.getFullYear().toString();
		var yr = year.match(/\d\d(\d\d)/)[1];
		var month = (this.props.selectedDate.getMonth() + 1).toString();
		var monthPadded = month.length < 2 ? '0' + month : month;
		var day = this.props.selectedDate.getDate().toString();
		var dayPadded = day.length < 2 ? '0' + day : day;
		return this.props.format
			.replace(/[Yy]{4}/, year)
			.replace(/[Yy]{2}/, yr)
			.replace(/[Mm]{2}/, monthPadded)
			.replace(/[Mm]/, month)
			.replace(/[Dd]{2}/, dayPadded)
			.replace(/[Dd]/, day);
	},
	
	onInputChange: function() {
		// TODO Handle input behaviour
	},
	
	render: function() {
		return (
			<input className={this.props.className + '__input'} size={this.props.size}
				value={this.getDateFormatted()} onChange={this.onInputChange} />
		);
	}
	
});
