import React from 'react';

class DecimalInput extends React.Component {
	
	constructor (props) {
		super(props);
		
		// Default initial value to 0 if not passed via prop
		const value = props.value === null ?
			Number(0).toFixed(props.places) :
			props.value.toFixed(props.places);
		
		this.state = {
			cursorIndex: 0,
			value
		};
		
		this.elems = {};
		
		this.setValue = this.setValue.bind(this);
		this.formatDecimalPoints = this.formatDecimalPoints.bind(this);
		this.triggerKeypress = this.triggerKeypress.bind(this);
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputMouseUp = this.onInputMouseUp.bind(this);
		this.onInputTouchEnd = this.onInputTouchEnd.bind(this);
		this.onInputKeyPress = this.onInputKeyPress.bind(this);
		this.onInputKeyUp = this.onInputKeyUp.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
	}
	
	componentWillReceiveProps (nextProps) {
		// Update decimal if incoming value has changed and input
		// is not currently focused
		if (nextProps.value !== this.props.value &&
			this.elems.input !== document.activeElement) {
			
			const value = nextProps.value.toFixed(this.props.places);
			this.setState({ value });
		}
	}
	
	componentDidUpdate () {
		// Move cursor position back if value has been replaced
		if (this.elems.input.selectionStart !== this.state.cursorIndex) {
			this.elems.input.selectionStart = this.state.cursorIndex;
			this.elems.input.selectionEnd = this.state.cursorIndex;
		}
	}
	
	setValue (value) {
		// Store cursor position and value in state then round and
		// pass value to props.setValue
		this.setState({
			cursorIndex: this.elems.input.selectionStart,
			value
		}, () => {
			const rounded = Number(value).toFixed(this.props.places);
			this.props.setValue(Number(rounded));
		});
	}
	
	formatDecimalPoints (value) {
		let newValue = value;
		const firstIndex = value.indexOf('.');
		
		// Prevent two decimal points
		if (firstIndex !== value.lastIndexOf('.')) {
			if (firstIndex === this.state.cursorIndex) {
				// Remove second decimal point
				newValue = value.replace(/^(\d*\.\d*)\.(\d*)$/, '$1$2');
			} else {
				// Remove first decimal point
				newValue = value.replace(/^(\d*)\.(\d*\.\d*)$/, '$1$2');
				// Update cursor to counter character removal
				--this.elems.input.selectionStart;
				this.elems.input.selectionEnd = this.elems.input.selectionStart;
			}
		}
		
		return newValue;
	}
	
	triggerKeypress (key) {
		if (!typeof key === 'string' || !key.length === 1) {
			throw new Error(`The first parameter of triggerKeypress()
				must receive a string argument of length 1`);
		}
		
		if (!key.match(/\d|\./)) {
			throw new Error(`The first parameter of triggerKeypress()
				must be an integer or period character`);
		}
		
		this.elems.input.focus();
		
		// Insert key value at current cursor position
		let value = this.state.value.slice(0, this.state.cursorIndex) +
			key + this.state.value.slice(this.state.cursorIndex);
		
		value = this.formatDecimalPoints(value);
		
		// Manually move the cursor forward
		++this.elems.input.selectionStart;
		this.elems.input.selectionEnd = this.elems.input.selectionStart;
		
		this.setValue(value);
	}
	
	onInputFocus () {
		// Empty value if equal to 0
		if (Number(this.state.value) === 0) {
			this.setState({
				cursorIndex: 0,
				value: ''
			});
		}
		
		this.elems.input.selectionStart = this.state.cursorIndex;
		this.elems.input.selectionEnd = this.state.cursorIndex;
		
		// Call onFocus function at appropriate moment
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	}
	
	onInputMouseUp () {
		// Update cursor position when user clicks input
		this.setState({
			cursorIndex: this.elems.input.selectionStart
		});
	}
	
	onInputTouchEnd () {
		// Update cursor position when user taps input
		this.setState({
			cursorIndex: this.elems.input.selectionStart
		});
	}
	
	onInputKeyPress (e) {
		// Limit input to digits and decimal points
		const key = typeof e.key === 'string' && e.key.length > 0 ?
			e.key : String.fromCharCode(e.charCode);
		
		if (!key.match(/\d|\./)) {
			e.preventDefault();
		}
	}
	
	onInputPaste (e) {
		// Prevent pasting to prevent invalid inputs
		e.preventDefault();
	}
	
	onInputChange () {
		let value = this.elems.input.value;
		value = this.formatDecimalPoints(value);
		
		this.setValue(value);
	}
	
	onInputKeyUp () {
		// Update cursor position when user presses key
		this.setState({
			cursorIndex: this.elems.input.selectionStart
		});
	}
	
	onInputBlur () {
		// Round the current value and set to state
		const value = Number(this.state.value).toFixed(this.props.places);
		
		this.setState({ value }, () => {
			// Call onBlur function at appropriate moment
			if (this.props.onBlur) {
				this.props.onBlur();
			}
		});
	}
	
	render () {
		return (
			<input className={this.props.className} ref={c => this.elems.input = c}
				value={this.state.value} disabled={this.props.disabled}
				onFocus={this.onInputFocus} onMouseUp={this.onInputMouseUp}
				onTouchEnd={this.onInputTouchEnd} onKeyPress={this.onInputKeyPress}
				onKeyUp={this.onInputKeyUp} onPaste={this.onInputPaste}
				onChange={this.onInputChange} onBlur={this.onInputBlur} />
		);
	}
}

DecimalInput.propTypes = {
	className: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	onBlur: React.PropTypes.func,
	onFocus: React.PropTypes.func,
	places: React.PropTypes.number,
	setValue: React.PropTypes.func.isRequired,
	value: React.PropTypes.number
};

DecimalInput.defaultProps = {
	className: 'DecimalInput',
	disabled: false,
	onBlur: null,
	onFocus: null,
	places: 2,
	value: null
};

export default DecimalInput;
