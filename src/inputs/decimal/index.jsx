'use strict';

var React = require('react');
var Utils = require('../../utils');

module.exports = React.createClass({
	
	displayName: 'DecimalInput',
	
	propTypes: {
		className: React.PropTypes.string,
		numOfPlaces: React.PropTypes.number,
		decimal: React.PropTypes.number,
		disabled: React.PropTypes.bool,
		setDecimal: React.PropTypes.func.isRequired,
		onFocus: React.PropTypes.func,
		onBlur: React.PropTypes.func
	},
	
	getDefaultProps: function() {
		return {
			className: 'DecimalInput',
			numOfPlaces: 2,
			decimal: 0,
			disabled: false,
			onFocus: null,
			onBlur: null
		};
	},
	
	getInitialState: function() {
		var initDecimal = this.props.decimal.toFixed(this.props.numOfPlaces);
		var initIndex = initDecimal.indexOf('.');
		
		return { decimal: initDecimal, index: initIndex, cursor: 0 };
	},
	
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.decimal !== this.props.decimal) {
			// Overwrite state upon receiving new props.decimal
			var newDecimal = nextProps.decimal.toFixed(this.props.numOfPlaces);
			var newIndex = newDecimal.indexOf('.');
			var position = React.findDOMNode(this.refs.input).selectionStart;
			
			this.setState({ decimal: newDecimal, index: newIndex, cursor: position });
			
			// Pass decimal to parent if isNum
			if (Utils.isNum(newDecimal)) this.props.setDecimal(parseFloat(newDecimal));
		}
	},
	
	componentDidUpdate: function(prevProps, prevState) {
		if (this.state.cursor !== prevState.cursor) {
			var input = React.findDOMNode(this.refs.input);
			
			input.selectionStart = this.state.cursor;
			input.selectionEnd = this.state.cursor;
		}
	},
	
	setDecimal: function(newDecimal) {
		// Set decimal and index in state
		var newIndex = newDecimal.indexOf('.');
		
		// Store cursor position
		var position = React.findDOMNode(this.refs.input).selectionStart;
		
		this.setState({ decimal: newDecimal, index: newIndex, cursor: position });
		
		// Call props.setDecimal if isNum
		if (Utils.isNum(newDecimal)) this.props.setDecimal(parseFloat(newDecimal));
	},
	
	onInputFocus: function() {
		// Empty decimal if equal to 0
		if (parseFloat(this.state.decimal) === 0)
			this.setState({	decimal: '', index: -1, cursor: 0 });
		
		if (this.props.onFocus) this.props.onFocus();
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
		// Prevent two decimal points
		var decimal = e.target.value;
		var firstIndex = decimal.indexOf('.');
		
		if (firstIndex !== decimal.lastIndexOf('.')) {
			if (firstIndex === this.state.index)
				// Remove first decimal point
				decimal = decimal.replace(/^(\d*)\.(\d*\.\d*)$/, '$1$2');
			else
				// Remove second decimal point
				decimal = decimal.replace(/^(\d*\.\d*)\.(\d*)$/, '$1$2');
		}
		
		// Prevent more than x digits after decimal point
		var regex = '^(\\d*\\.\\d{' + this.props.numOfPlaces + '})\\d+$';
		decimal = decimal.replace(new RegExp(regex), '$1');
		
		this.setDecimal(decimal);
	},
	
	onInputBlur: function(e) {
		// Ensure value is valid decimal
		var decimal = e.target.value
			// Add decimal point if not present
			.replace(/^([^\.]*)$/, '$1.')
			// Pad with leading 0 if starting with decimal point
			.replace(/^(\.\d*)$/, '0$1')
			// Remove leading 0 if more than one digit before decimal point
			.replace(/^0+(\d+\.?\d*)$/, '$1');
		
		// Ensure correct number of decimal places
		decimal = parseFloat(decimal).toFixed(this.props.numOfPlaces);
		
		this.setDecimal(decimal);
		
		if (this.props.onBlur) this.props.onBlur();
	},
	
	render: function() {
		return (
			<input ref="input"
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
