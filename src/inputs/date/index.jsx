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
		}),
		firstDoW: React.PropTypes.number,
		// dateRange: React.PropTypes.shape({
		// 	firstDate: React.PropTypes.object,
		// 	lastDate: React.PropTypes.object
		// }),
		// minDate: React.PropTypes.string,
		// maxDate: React.PropTypes.string,
		iconURL: React.PropTypes.string
	},
	
	getDefaultProps: function() {
		return {
			className: 'DateInput',
			// format: 'YYYY-MM-DD',
			locale: {
				dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			firstDoW: 1,
			// dateRange: null,
			// minDate: null,
			// maxDate: null,
			iconURL: null
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
	
	// Fix for IE changing focus to child elements which
	// would incorrectly trigger blur and hide the calendar
	onIconMouseDown: function(e) {
		e.preventDefault();
	},
	
	onIconClick: function(e) {
		if (!this.state.visible) {
			this.setVisible(true);
			e.target.focus();
		}
		else {
			this.setVisible(false);
			e.target.blur();
		}
	},
	
	onIconFocus: function() {
		this.setVisible(true);
	},
	
	onIconBlur: function() {
		this.setVisible(false);
	},
	
	render: function() {
		return (
			<div
				className={this.props.className}
				style={this.styles.dateInput}>
				<div
					className={this.props.className + '__cell'}
					style={this.styles.dateInputCell}>
					<input
						className={this.props.className + '__input'}
						style={this.styles.input} />
					{this.props.iconURL !== null ?
						<img
							className={this.props.className + '__icon'}
							style={this.styles.icon}
							src={this.props.iconURL}
							tabIndex={0}
							onMouseDown={this.onIconMouseDown}
							onClick={this.onIconClick}
							onFocus={this.onIconFocus}
							onBlur={this.onIconBlur} />
						: false}
					{this.state.visible ?
						<Calendar
							className={this.props.className}
							locale={this.props.locale}
							firstDoW={this.props.firstDoW}
							date={this.state.date}
							setDate={this.setDate}
							setVisible={this.setVisible} />
						: false}
				</div>
			</div>
		);
	},
	
	styles: {
		dateInput: {
			boxSizing: 'border-box',
			display: 'inline-table',
			position: 'relative'
		},
		dateInputCell: {
			boxSizing: 'border-box',
			display: 'table-cell'
		},
		input: {
			boxSizing: 'border-box',
			verticalAlign: 'middle'
		},
		icon: {
			boxSizing: 'border-box',
			display: 'inline-block',
			verticalAlign: 'middle',
			cursor: 'pointer'
		}
	}
	
});
