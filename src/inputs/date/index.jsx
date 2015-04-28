'use strict';

var React = require('react');
var moment = require('moment');

var Calendar = require('calendar');

module.exports = React.createClass({
	
	displayName: 'DateInput',
	
	propTypes: {
		className: React.PropTypes.string,
		format: React.PropTypes.string,
		initDate: React.PropTypes.string,
		minDate: React.PropTypes.string,
		maxDate: React.PropTypes.string
	},
	
	getDefaultProps: function() {
		// Default to ISO format
		var isoDate = new Date().toISOString();
		// Remove time from isoDate string
		isoDate = isoDate.split('T')[0];
		
		return {
			className: 'DateInput',
			format: 'YYYY-MM-DD',
			initDate: isoDate,
			minDate: null,
			maxDate: null
		};
	},
	
	getInitialState: function() {
		var initMoment = moment(this.props.initDate,
			this.props.format);
			
		return {
			moment: initMoment,
			level: 0,
			visible: false
		};
	},
	
	inputFocus: function() {
		
	},
	
	inputKeyPress: function() {
		
	},
	
	inputPaste: function() {
		
	},
	
	inputChange: function() {
		
	},
	
	inputBlur: function() {
		
	},
	
	iconClick: function() {
		this.setVisible(true);
	},
	
	setMoment: function(moment) {
		this.setState({ moment: moment });
	},
	
	setLevel: function(level) {
		this.setState({ level: level });
	},
	
	setVisible: function(visible) {
		this.setState({ visible: visible });
	},
	
	render: function() {
		return (
			<div className={this.props.className}>
				<input
					type="text"
					className={this.props.className + '__input'}
					value={this.state.moment.format(this.props.format)}
					onFocus={this.inputFocus}
					onKeyPress={this.inputKeyPress}
					onPaste={this.inputPaste}
					onChange={this.inputChange}
					onBlur={this.inputBlur} />
				<div
					className={this.props.className + '__icon'}
					onClick={this.iconClick}>
					{/* icon */}
				</div>
				<Calendar
					className={this.props.className}
					moment={this.state.moment}
					level={this.state.level}
					setMoment={this.setMoment}
					setLevel={this.setLevel}
					setVisible={this.setVisible} />
			</div>
		);
	}
	
});
