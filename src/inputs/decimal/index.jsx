'use strict';

import Numbers from '../../functions/Numbers';
import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({

	displayName: 'DecimalInput',

	propTypes: {
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		onBlur: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		places: React.PropTypes.number,
		setValue: React.PropTypes.func.isRequired,
		value: React.PropTypes.number
	},

	getDefaultProps() {
		return {
			className: 'DecimalInput',
			disabled: false,
			onBlur: null,
			onFocus: null,
			places: 2,
			value: 0
		};
	},

	getInitialState() {
		const value = this.props.value.toFixed(this.props.places);
		const decimalIndex = value.indexOf('.');

		return {
			cursorIndex: 0,
			decimalIndex: decimalIndex,
			value: value
		};
	},

	componentWillReceiveProps(nextProps) {
		// Update decimal and index if not currently focused
		if (ReactDOM.findDOMNode(this) !== document.activeElement) {
			const value = nextProps.value.toFixed(this.props.places);
			const decimalIndex = value.indexOf('.');

			this.setState({
				decimalIndex: decimalIndex,
				value: value
			});
		}
	},

	componentDidUpdate(prevProps, prevState) {
		// Move cursor position back if value has been replaced
		if (this.state.cursorIndex !== prevState.cursorIndex) {
			let elem = ReactDOM.findDOMNode(this);

			elem.selectionStart = this.state.cursorIndex;
			elem.selectionEnd = this.state.cursorIndex;
		}
	},

	onInputFocus() {
		// Empty value if equal to 0
		if (parseFloat(this.state.value) === 0) {
			this.setState({
				cursorIndex: 0,
				decimalIndex: -1,
				value: ''
			});
		}
		
		// Call onFocus function at appropriate moment
		if (this.props.onFocus) this.props.onFocus();
	},

	onInputKeyPress(e) {
		// Limit input to digits and decimal points
		const char = String.fromCharCode(e.charCode);

		if (!char.match(/\d|\./)) e.preventDefault();

		// Update index of decimal point
		this.setState({
			decimalIndex: e.target.value.indexOf('.')
		});
	},

	onInputPaste(e) {
		// Prevent pasting to prevent invalid inputs
		e.preventDefault();
	},

	onInputChange(e) {
		let value = e.target.value;
		const firstIndex = value.indexOf('.');

		// Prevent two decimal points
		if (firstIndex !== value.lastIndexOf('.')) {
			if (firstIndex === this.state.decimalIndex) {
				// Remove first decimal point
				value = value.replace(/^(\d*)\.(\d*\.\d*)$/, '$1$2');
			} else {
				// Remove second decimal point
				value = value.replace(/^(\d*\.\d*)\.(\d*)$/, '$1$2');
			}
		}

		// Prevent excess digits after decimal place
		const regex = '^(\\d*\\.\\d{' + this.props.places + '})\\d+$';
		value = value.replace(new RegExp(regex), '$1');

		this.setValue(value);
	},

	onInputBlur() {
		// Update state if value is passed back into component
		const value = this.props.value.toFixed(this.props.places);
		const decimalIndex = value.indexOf('.');

		this.setState({
			decimalIndex: decimalIndex,
			value: value
		});
		
		// Call onBlur function at appropriate moment
		if (this.props.onBlur) this.props.onBlur();
	},

	setValue(value) {
		// Store decimal, index and cursor position in state then
		// pass value to setValue function
		const decimalIndex = value.indexOf('.');
		const cursorIndex = ReactDOM.findDOMNode(this).selectionStart;

		this.setState({
			cursorIndex: cursorIndex,
			decimalIndex: decimalIndex,
			value: value
		}, () => {
			if (Numbers.isNum(value)) this.props.setValue(Number(value));
			else this.props.setValue(0);
		});
	},

	render() {
		return (
			<input className={this.props.className} value={this.state.value}
				disabled={this.props.disabled} onFocus={this.onInputFocus}
				onKeyPress={this.onInputKeyPress} onPaste={this.onInputPaste}
				onChange={this.onInputChange} onBlur={this.onInputBlur} />
		);
	}
});
