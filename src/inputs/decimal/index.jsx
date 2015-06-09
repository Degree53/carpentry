'use strict';

var React = require('react');
var Utils = require('../../utils');

module.exports = React.createClass({
	
	displayName: 'DecimalInput',
	
	propTypes: {
		className: React.PropTypes.string,
		initDecimal: React.PropTypes.number,
		updatedDecimal: React.PropTypes.number,
		numOfPlaces: React.PropTypes.number,
		isDisabled: React.PropTypes.bool,
		setDecimal: React.PropTypes.func.isRequired,
		onFocus: React.PropTypes.func,
		onBlur: React.PropTypes.func
	},
	
	getDefaultProps: function() {
		return {
			className: 'DecimalInput',
			initDecimal: 0,
			updatedDecimal: null,
			numOfPlaces: 2,
			isDisabled: false,
			onFocus: null,
			onBlur: null
		};
	},
	
	getInitialState: function() {
		var initDecimal = this.props.initDecimal.toFixed(this.props.numOfPlaces);
		var initIndex = initDecimal.indexOf('.');
		
		return { decimal: initDecimal, index: initIndex, cursor: 0 };
	},
	
	componentWillReceiveProps: function(nextProps) {
		// Overwrite state.decimal if receiving new decimal
		if (nextProps.updatedDecimal !== this.props.updatedDecimal) {
			var newDecimal = nextProps.updatedDecimal.toFixed(this.props.numOfPlaces);
			var newIndex = newDecimal.indexOf('.');
			
			this.setState({ decimal: newDecimal, index: newIndex, cursor: 0 });
			
			// Pass decimal to parent if isNum
			if (Utils.isNum(newDecimal)) this.props.setValue(parseFloat(newDecimal));
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
		// Store decimal, index and cursor position in state
		var newIndex = newDecimal.indexOf('.');
		var position = React.findDOMNode(this.refs.input).selectionStart;
		
		this.setState({ decimal: newDecimal, index: newIndex, cursor: position });
		
		// Only pass value up if valid number
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
		
		this.setDecimal(decimal);
	},
	
	onInputBlur: function(e) {
		// Ensure value is valid decimal
		var decimal = e.target.value
			// Add decimal point if not present
			.replace(/^([^\.]*)$/, '$1.')
			// Pad with leading 0 if starting with decimal point
			.replace(/^(\.\d*)$/, '0$1')
			// Remove leading 0 if another digit before decimal point
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
				disabled={this.props.isDisabled}
				onFocus={this.onInputFocus}
				onKeyPress={this.onInputKeyPress}
				onPaste={this.onInputPaste}
				onChange={this.onInputChange}
				onBlur={this.onInputBlur} />
		);
	}
	
});
