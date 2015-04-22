'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'DecimalInput',
	
	propTypes: {
		value: React.PropTypes.number.isRequired,
		disabled: React.PropTypes.bool,
		setValue: React.PropTypes.func.isRequired
	},
	
	getDefaultProps: function() {
		return {
			disabled: false
		};
	},
	
	getInitialState: function() {
		// Initialise decimal point index state
		var initValue = this.props.value.toFixed(2);
		var initIndex = initValue.indexOf('.');
		
		return {
			value: initValue,
			index: initIndex
		};
	},
	
	handleFocus: function() {
		// Empty value if equal to 0
		if (this.props.value === 0)
			this.setState({
				value: '',
				index: -1
			});
	},
	
	handleKeyPress: function(e) {
		// Limit input to digits and decimal points
		if (!e.key.match(/\d|\.|decimal/)) e.preventDefault();
		
		// Update index of decimal point
		this.setState({ index: e.target.value.indexOf('.') });
	},
	
	handlePaste: function(e) {
		// TODO Validate paste content
		
		e.preventDefault();
	},
	
	handleChange: function(e) {
		var value = e.target.value;
		var firstIndex = value.indexOf('.');
		
		// Prevent two decimal points
		if (firstIndex !== value.lastIndexOf('.')) {
			if (firstIndex !== this.state.index)
				// Remove second decimal point
				value = value.replace(/^(\d*\.\d*)(\.)(\d*)$/, '$1$3');
			else
				// Remove first decimal point
				value = value.replace(/^(\d*)(\.)(\d*\.\d*)$/, '$1$3');
		}
		
		// Prevent more than two digits after decimal point
		value = value.replace(/^(\d*\.\d{2})\d+$/, '$1');
		
		this.setState({
			value: value,
			index: value.indexOf('.')
		});
		
		if (value && !isNaN(value))
			this.props.setValue(parseFloat(value));
	},
	
	handleBlur: function(e) {
		// Ensure value is valid decimal
		var value = e.target.value
			.replace(/^([^\.]*)$/, '$1.')
			.replace(/^(\.\d*)$/, '0$1')
			.replace(/^0+(\d+\.?\d*)$/, '$1')
			.replace(/^(\d*\.)$/, '$10')
			.replace(/^(\d*\.\d)$/, '$10');
		
		this.setState({
			value: value,
			index: value.indexOf('.')
		});
		
		if (value && !isNaN(value))
			this.props.setValue(parseFloat(value));
	},
	
	render: function() {
		return (
			<input
				className="DecimalInput"
				type="text"
				value={this.state.value}
				disabled={this.props.disabled}
				onFocus={this.handleFocus}
				onKeyPress={this.handleKeyPress}
				onPaste={this.handlePaste}
				onChange={this.handleChange}
				onBlur={this.handleBlur} />
		);
	}
	
});
