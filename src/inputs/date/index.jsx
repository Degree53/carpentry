'use strict';

var React = require('react');
// var moment = require('moment');

var Calendar = require('./calendar');

module.exports = React.createClass({
	
	displayName: 'DateInput',
	
	propTypes: {
		className: React.PropTypes.string,
		format: React.PropTypes.string,
		initDate: React.PropTypes.object,
		setDate: React.PropTypes.function.isRequired,
		// locale: React.PropTypes.string,
		weekStart: React.PropTypes.number,
		minDate: React.PropTypes.string,
		maxDate: React.PropTypes.string
	},
	
	getDefaultProps: function() {
		return {
			className: 'DateInput',
			format: 'YYYY-MM-DD',
			initDate: new Date(),
			// locale: 'en',
			weekStart: 1,
			minDate: null,
			maxDate: null
		};
	},
	
	getInitialState: function() {
		// var initMoment = moment(this.props.initDate);
		// this.updateLocale(this.props.locale, this.props.weekStart);
		
		return {
			date: this.props.initDate,
			level: 0,
			visible: false
		};
	},
	
	// componentWillReceiveProps: function(nextProps) {
	// 	this.updateLocale(nextProps.locale, nextProps.weekStart);
	// },
	
	// updateLocale: function(locale, weekStart) {
	// 	// Hack for reordering weekday names because weekdaysMin()
	// 	// ignores moment.locale.week.dow property
	// 	moment.locale(locale);
	//
	// 	var weekdays = moment.weekdaysMin();
	// 	weekdays = weekdays.concat(weekdays.splice(0, weekStart));
	//
	// 	moment.locale(locale, { weekdaysMin: weekdays });
	// },
	
	setDate: function(date) {
		this.setState({ date: date });
	},
	
	setLevel: function(level) {
		this.setState({ level: level });
	},
	
	setVisible: function(visible) {
		this.setState({ visible: visible });
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
	
	render: function() {
		// var displayDate = moment(this.state.date)
		// 	.format(this.props.format);
		
		return (
			<div className={this.props.className}>
				<input
					className={this.props.className + '__input'}
					value={displayDate}
					onFocus={this.inputFocus}
					onKeyPress={this.inputKeyPress}
					onPaste={this.inputPaste}
					onChange={this.inputChange}
					onBlur={this.inputBlur} />
				<div
					className={this.props.className + '__icon'}
					onClick={this.iconClick}>
					
				</div>
				<Calendar
					className={this.props.className}
					date={this.state.date}
					level={this.state.level}
					setMoment={this.setMoment}
					setLevel={this.setLevel}
					setVisible={this.setVisible} />
			</div>
		);
	}
	
});
