'use strict';

var React = require('react');
var GlobalUtils = require('../../utils');

module.exports = React.createClass({
	
	displayName: 'DecimalInput',
	
	propTypes: {
		className: React.PropTypes.string,
		value: React.PropTypes.number,
		numOfPlaces: React.PropTypes.number,
		isDisabled: React.PropTypes.bool,
		setValue: React.PropTypes.func.isRequired,
		onFocus: React.PropTypes.func,
		onBlur: React.PropTypes.func
	},
	
	getDefaultProps: function() {
		return {
			className: 'DecimalInput',
			value: 0,
			numOfPlaces: 2,
			isDisabled: false,
			onFocus: null,
			onBlur: null
		};
	},
	
	getInitialState: function() {
		var initDecimal = this.props.value.toFixed(this.props.numOfPlaces);
		var initIndex = initDecimal.indexOf('.');
		
		return { decimal: initDecimal, index: initIndex, cursor: 0 };
	},
	
	componentWillReceiveProps: function(nextProps) {
		// Update decimal and index if not currently focused
		if (React.findDOMNode(this) !== document.activeElement) {
			
			var newDecimal = nextProps.value.toFixed(this.props.numOfPlaces);
			var newIndex = newDecimal.indexOf('.');
			
			this.setState({ decimal: newDecimal, index: newIndex });
		}
	},
	
	componentDidUpdate: function(prevProps, prevState) {
		if (this.state.cursor !== prevState.cursor) {
			
			var input = React.findDOMNode(this);
			
			input.selectionStart = this.state.cursor;
			input.selectionEnd = this.state.cursor;
		}
	},
	
	setValue: function(newDecimal) {
		// Store decimal, index and cursor position in state
		var newIndex = newDecimal.indexOf('.');
		var position = React.findDOMNode(this).selectionStart;
		
		this.setState({ decimal: newDecimal, index: newIndex, cursor: position });
		
		if (GlobalUtils.isNum(newDecimal)) this.props.setValue(Number(newDecimal));
	},
	
	onInputFocus: function() {
		// Empty decimal if equal to 0
		if (parseFloat(this.state.decimal) === 0)
			this.setState({	decimal: '', index: -1, cursor: 0 });
		
		if (this.props.onFocus) this.props.onFocus();
	},
	
	onInputKeyPress: function(e) {
		// Limit input to digits and decimal points
		var char = String.fromCharCode(e.charCode);
		if (!char.match(/\d|\./)) e.preventDefault();
		
		// Update index of decimal point
		this.setState({ index: e.target.value.indexOf('.') });
	},
	
	onInputPaste: function(e) {
		e.preventDefault();
	},
	
	onInputChange: function(e) {
		var decimal = e.target.value;
		var firstIndex = decimal.indexOf('.');
		
		// Prevent two decimal points
		if (firstIndex !== decimal.lastIndexOf('.')) {
			
			if (firstIndex === this.state.index)
				// Remove first decimal point
				decimal = decimal.replace(/^(\d*)\.(\d*\.\d*)$/, '$1$2');
			else
				// Remove second decimal point
				decimal = decimal.replace(/^(\d*\.\d*)\.(\d*)$/, '$1$2');
		}
		
		// Prevent excess digits after decimal place
		var regex = '^(\\d*\\.\\d{' + this.props.numOfPlaces + '})\\d+$';
		decimal = decimal.replace(new RegExp(regex), '$1');
		
		this.setValue(decimal);
	},
	
	onInputBlur: function() {
		var newDecimal = this.props.value.toFixed(this.props.numOfPlaces);
		var newIndex = newDecimal.indexOf('.');
		
		this.setState({ decimal: newDecimal, index: newIndex });
		
		if (this.props.onBlur) this.props.onBlur();
	},
	
	render: function() {
		return (
			<input
				className={this.props.className}
				value={this.state.decimal}
				disabled={this.props.isDisabled}
				onFocus={this.onInputFocus}
				onKeyPress={this.onInputKeyPress}
				onPaste={this.onInputPaste}
				onChange={this.onInputChange}
				onBlur={this.onInputBlur} />
		);
	}
	
});
