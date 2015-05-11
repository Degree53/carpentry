'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'DecimalInput',
	
	propTypes: {
		className: React.PropTypes.string,
		decimal: React.PropTypes.number.isRequired,
		disabled: React.PropTypes.bool,
		setDecimal: React.PropTypes.func.isRequired
	},
	
	getDefaultProps: function() {
		return {
			className: 'DecimalInput',
			disabled: false
		};
	},
	
	getInitialState: function() {
		// Initialise decimal point index state
		var initDecimal = this.props.decimal.toFixed(2);
		var initIndex = initDecimal.indexOf('.');
		
		return {
			decimal: initDecimal,
			index: initIndex
		};
	},
	
	onInputFocus: function() {
		// Empty decimal if equal to 0
		if (this.props.decimal === 0)
			this.setState({
				decimal: '',
				index: -1
			});
	},
	
	onInputKeyPress: function(e) {
		// Limit input to digits and decimal points
		if (!e.key.match(/\d|\.|decimal/)) e.preventDefault();
		
		// Update index of decimal point
		this.setState({ index: e.target.value.indexOf('.') });
	},
	
	onInputPaste: function(e) {
		// TODO Validate paste content
		
		e.preventDefault();
	},
	
	onInputChange: function(e) {
		var decimal = e.target.value;
		var firstIndex = decimal.indexOf('.');
		
		// Prevent two decimal points
		if (firstIndex !== decimal.lastIndexOf('.')) {
			if (firstIndex !== this.state.index)
				// Remove second decimal point
				decimal = decimal.replace(/^(\d*\.\d*)(\.)(\d*)$/, '$1$3');
			else
				// Remove first decimal point
				decimal = decimal.replace(/^(\d*)(\.)(\d*\.\d*)$/, '$1$3');
		}
		
		// Prevent more than two digits after decimal point
		decimal = decimal.replace(/^(\d*\.\d{2})\d+$/, '$1');
		
		this.setState({
			decimal: decimal,
			index: decimal.indexOf('.')
		});
		
		if (decimal && !isNaN(decimal))
			this.props.setDecimal(parseFloat(decimal));
	},
	
	onInputBlur: function(e) {
		// Ensure value is valid decimal
		var decimal = e.target.value
			.replace(/^([^\.]*)$/, '$1.')
			.replace(/^(\.\d*)$/, '0$1')
			.replace(/^0+(\d+\.?\d*)$/, '$1')
			.replace(/^(\d*\.)$/, '$10')
			.replace(/^(\d*\.\d)$/, '$10');
		
		this.setState({
			decimal: decimal,
			index: decimal.indexOf('.')
		});
		
		if (decimal && !isNaN(decimal))
			this.props.setDecimal(parseFloat(decimal));
	},
	
	render: function() {
		return (
			<input
				className={this.props.className}
				value={this.state.decimal}
				disabled={this.props.disabled}
				onFocus={this.onInputFocus}
				onKeyPress={this.onInputKeyPress}
				onPaste={this.onInputPaste}
				onChange={this.onInputChange}
				onBlur={this.onInputBlur} />
		);
	}
	
});
