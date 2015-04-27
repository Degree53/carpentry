'use strict';

var React = require('react');
var moment = require('moment');

var DaysPanel = React.createClass({
	
	render: function() {
		return (
			<div
				className={this.props.className + '__days'}
				onClick={this.dayClick}>
				<div className={this.props.className + '__daysHead'}>
					<div className={this.props.className + '__daysRow'}>
						{this.getWeekdays()}
					</div>
				</div>
				<div className={this.props.className + '__daysBody'}>
					{this.getDays()}
				</div>
			</div>
		);
	}
	
});

var MonthsPanel = React.createClass({
	
	render: function() {
		return (
			<div
				className={this.props.className + '__months'}
				onClick={this.monthClick}>
				<div className={this.props.className + '__monthsBody'}>
					
				</div>
			</div>
		);
	}
	
});

var YearsPanel = React.createClass({
	
	render: function() {
		return (
			<div
				className={this.props.className + '__years'}
				onClick={this.yearClick}>
				<div className={this.props.className + '__yearsBody'}>
					
				</div>
			</div>
		);
	}
	
});

module.exports = React.createClass({
	
	displayName: 'DateInput',
	
	propTypes: {
		className: React.PropTypes.string,
		config: React.PropTypes.shape({
			format: React.PropTypes.string,
			initDate: React.PropTypes.string,
			minDate: React.PropTypes.string,
			maxDate: React.PropTypes.string
		})
	},
	
	getDefaultProps: function() {
		// Default to ISO format
		var isoDate = new Date().toISOString();
		// Remove time from isoDate string
		isoDate = isoDate.split('T')[0];
		
		return {
			className: 'DateInput',
			config: {
				format: 'YYYY-MM-DD',
				initDate: isoDate,
				minDate: null,
				maxDate: null
			}
		};
	},
	
	getInitialState: function() {
		var initMoment = moment(this.props.config.initDate,
			this.props.config.format);
			
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
	
	calendarBlur: function() {
		this.setVisible(false);
	},
	
	setMoment: function(moment) {
		this.setState({ moment: moment });
	},
	
	setLevel: function(level) {
		this.setState({ level: level });
	},
	
	setVisible: function(isVisible) {
		this.setState({ visible: isVisible });
	},
	
	getPanel: function(level) {
		switch (level) {
			case 0: return (
				<DaysPanel
					className={this.props.className}
					moment={this.state.moment}
					setMoment={this.setMoment}
					setLevel={this.setLevel}
					setVisible={this.setVisible} />
			);
			case 1: return (
				<MonthsPanel
					className={this.props.className}
					moment={this.state.moment}
					setMoment={this.setMoment}
					setLevel={this.setLevel} />
			);
			case 2: return (
				<YearsPanel
					className={this.props.className}
					moment={this.state.moment}
					setMoment={this.setMoment}
					setLevel={this.setLevel} />
			);
		}
	},
	
	render: function() {
		return (
			<div className={this.props.className}>
				<input
					type="text"
					className={this.props.className + '__input'}
					value={this.state.moment.format(this.props.config.format)}
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
				<div
					className={this.props.className + '__calendar'}
					onBlur={this.calendarBlur}>
					{this.getPanel(this.state.level)}
				</div>
			</div>
		);
	}
	
});
