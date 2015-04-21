'use strict';

var React = require('react');

module.exports = React.createClass({
	
	getInitialState: function() {
		var value = this.props.value.toFixed(2);
		var initIndex = value.indexOf('.');
		
		return {
			index: initIndex
		};
	},
	
	handleFocus: function() {
		// Empty value if equal to 0
		if (parseFloat(this.props.value) === 0)
			this.props.setValue(null);
	},
	
	handleKeyPress: function(e) {
		// Limit input to digits and decimal points
		if (!e.key.match(/\d|\.|decimal/)) e.preventDefault();
		
		// Update index of decimal point
		this.setState({ index: e.target.value.indexOf('.') });
	},
	
	handlePaste: function(e) {
		e.preventDefault();
	},
	
	handleChange: function(e) {
		var value = e.target.value;
		var newIndex = value.indexOf('.');
		
		// Prevent two decimal points
		if (newIndex !== value.lastIndexOf('.')) {
			if (newIndex < this.state.index)
				// Remove second decimal point
				value = value.replace(/^(\d*\.\d*)(\.)(\d*)$/, '$1$3');
			else
				// Remove first decimal point
				value = value.replace(/^(\d*)(\.)(\d*\.\d*)$/, '$1$3');
		}
		
		// Prevent more than two digits after decimal point
		value = value.replace(/^(\d*\.\d{2})\d+$/, '$1');
		
		this.props.setValue(value);
	},
	
	handleBlur: function(e) {
		// Ensure value is valid decimal
		var value = e.target.value
			.replace(/^([^\.]*)$/, '$1.')
			.replace(/^(\.\d*)$/, '0$1')
			.replace(/^0+(\d+\.?\d*)$/, '$1')
			.replace(/^(\d*\.)$/, '$10')
			.replace(/^(\d*\.\d)$/, '$10');
		
		this.props.setValue(value);
	},
	
	render: function() {
		return (
			<input
				className="CarpentryDecimalInput"
				type="text"
				value={this.props.value}
				disabled={this.props.disabled}
				onFocus={this.handleFocus}
				onKeyPress={this.handleKeyPress}
				onPaste={this.handlePaste}
				onChange={this.handleChange}
				onBlur={this.handleBlur} />
		);
	}
	
});
