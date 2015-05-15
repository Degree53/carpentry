'use strict';

var React = require('react');
var GlobalUtils = require('../../utils');
var Utils = require('./utils');
var Input = require('./input');
var Calendar = require('./calendar');

module.exports = React.createClass({
	
	displayName: 'DateInput',
	
	propTypes: {
		// Default element attributes
		className: React.PropTypes.string,
		size: React.PropTypes.number,
		// Layout and localisation
		layout: React.PropTypes.number,
		locale: React.PropTypes.shape({
			dayNames: React.PropTypes.arrayOf(React.PropTypes.string),
			monthNames: React.PropTypes.arrayOf(React.PropTypes.string),
			today: React.PropTypes.string
		}),
		firstDoW: React.PropTypes.number,
		format: React.PropTypes.string,
		// Required functionality
		iconSrc: React.PropTypes.string.isRequired,
		setDate: React.PropTypes.func.isRequired
		// Optional functionality
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
			size: 10,
			layout: 0,
			locale: {
				dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				today: 'Today'
			},
			firstDoW: 1,
			format: 'YYYY-MM-DD'
			// dateRange: null,
			// minDate: null,
			// maxDate: null
		};
	},
	
	getInitialState: function() {
		var initDate = Utils.cloneDate(new Date());
		
		return {
			selectedDate: initDate,
			visible: false
		};
	},
	
	setDate: function(date) {
		this.setState({ selectedDate: date });
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
		e.target.focus();
		this.setVisible(true);
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
					<Input
						className={this.props.className}
						size={this.props.size}
						format={this.props.format}
						selectedDate={this.state.selectedDate}
						setDate={this.setDate} />
					{this.props.iconSrc !== null ?
						<img
							className={this.props.className + '__icon'}
							style={GlobalUtils.merge([
								this.styles.icon,
								this.props.layout === 1 && this.styles.iconInside
							])}
							src={this.props.iconSrc}
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
							selectedDate={this.state.selectedDate}
							setDate={this.setDate}
							setVisible={this.setVisible} />
						: false}
				</div>
			</div>
		);
	},
	
	styles: {
		dateInput: {
			display: 'inline-table',
			position: 'relative'
		},
		dateInputCell: {
			display: 'table-cell'
		},
		icon: {
			display: 'inline-block',
			verticalAlign: 'middle',
			cursor: 'pointer'
		},
		iconInside: {
			position: 'absolute',
			right: 0
		}
	}
	
});
