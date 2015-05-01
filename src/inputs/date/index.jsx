'use strict';

var React = require('react');
var Utils = require('./utils');
var Calendar = require('./calendar');

module.exports = React.createClass({
	
	displayName: 'DateInput',
	
	propTypes: {
		className: React.PropTypes.string,
		// format: React.PropTypes.string,
		setDate: React.PropTypes.func.isRequired,
		locale: React.PropTypes.shape({
			dayNames: React.PropTypes.arrayOf(React.PropTypes.string),
			monthNames: React.PropTypes.arrayOf(React.PropTypes.string)
		})//,
		// weekStart: React.PropTypes.number,
		// dateRange: React.PropTypes.shape({
		// 	firstDate: React.PropTypes.object,
		// 	lastDate: React.PropTypes.object
		// }),
		// minDate: React.PropTypes.string,
		// maxDate: React.PropTypes.string
	},
	
	getDefaultProps: function() {
		return {
			className: 'DateInput',
			// format: 'YYYY-MM-DD',
			locale: {
				dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			}//,
			// weekStart: 1,
			// dateRange: null,
			// minDate: null,
			// maxDate: null
		};
	},
	
	getInitialState: function() {
		var initDate = Utils.cloneDate(new Date());
		
		return {
			date: initDate,
			visible: false
		};
	},
	
	setDate: function(date) {
		this.setState({ date: date });
		this.props.setDate(date);
	},
	
	setVisible: function(visible) {
		this.setState({ visible: visible });
	},
	
	onIconClick: function() {
		this.setVisible(!this.state.visible);
	},
	
	render: function() {
		return (
			<div className={this.props.className}>
				<input className={this.props.className + '__input'} />
				<div
					className={this.props.className + '__icon'}
					onClick={this.onIconClick}>
					
				</div>
				<Calendar
					className={this.props.className}
					locale={this.props.locale}
					date={this.state.date}
					setDate={this.setDate}
					setVisible={this.setVisible} />
			</div>
		);
	}
	
});
