import React from 'react';

class DecimalInput extends React.Component {
	
	constructor (props) {
		super(props);
		
		// Default initial value to 0 if not passed via prop
		const value = this.props.value === null ?
			Number(0).toFixed(this.props.places) :
			this.props.value.toFixed(this.props.places);
		
		this.state = {
			cursorIndex: 0,
			decimalIndex: value.indexOf('.'),
			value
		};
		
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputKeyPress = this.onInputKeyPress.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.setValue = this.setValue.bind(this);
	}
	
	componentWillReceiveProps (nextProps) {
		// Update decimal and index if incoming value is not null and
		// input is not currently focused
		if (nextProps.value !== null &&
			this.input !== document.activeElement) {
			
			const value = nextProps.value.toFixed(this.props.places);
			
			this.setState({
				decimalIndex: value.indexOf('.'),
				value
			});
		}
	}
	
	componentDidUpdate () {
		// Move cursor position back if value has been replaced
		if (this.input.selectionStart !== this.state.cursorIndex) {
			this.input.selectionStart = this.state.cursorIndex;
			this.input.selectionEnd = this.state.cursorIndex;
		}
	}
	
	setValue (value) {
		// Store decimal, index and cursor position in state then
		// pass value to setValue function
		this.setState({
			cursorIndex: this.input.selectionStart,
			decimalIndex: value.indexOf('.'),
			value
		});
		
		const rounded = Number(value).toFixed(this.props.places);
		
		this.props.setValue(Number(rounded));
	}
	
	onInputFocus () {
		// Empty value if equal to 0
		if (Number(this.state.value) === 0) {
			this.setState({
				cursorIndex: 0,
				decimalIndex: -1,
				value: ''
			});
		}
		
		// Call onFocus function at appropriate moment
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	}
	
	onInputKeyPress (e) {
		// Limit input to digits and decimal points
		const char = String.fromCharCode(e.charCode);
		
		if (!char.match(/\d|\./)) {
			e.preventDefault();
		}
	}
	
	onInputPaste (e) {
		// Prevent pasting to prevent invalid inputs
		e.preventDefault();
	}
	
	onInputChange () {
		let value = this.input.value;
		const firstIndex = value.indexOf('.');
		
		// Prevent two decimal points
		if (firstIndex !== value.lastIndexOf('.')) {
			if (firstIndex === this.state.decimalIndex) {
				// Remove first decimal point
				value = value.replace(/^(\d*)\.(\d*\.\d*)$/, '$1$2');
				// Update cursor to counter character removal
				--this.input.selectionStart;
				--this.input.selectionEnd;
			} else {
				// Remove second decimal point
				value = value.replace(/^(\d*\.\d*)\.(\d*)$/, '$1$2');
			}
		}
		
		this.setValue(value);
	}
	
	onInputBlur () {
		// Round the current or incoming value and set to state
		const value = this.props.value === null ?
			Number(this.state.value).toFixed(this.props.places) :
			this.props.value.toFixed(this.props.places);
		
		this.setState({
			decimalIndex: value.indexOf('.'),
			value
		});
		
		// Call onBlur function at appropriate moment
		if (this.props.onBlur) {
			this.props.onBlur();
		}
	}
	
	render () {
		return (
			<input className={this.props.className} ref={c => this.input = c}
				value={this.state.value} disabled={this.props.disabled}
				onFocus={this.onInputFocus} onKeyPress={this.onInputKeyPress}
				onPaste={this.onInputPaste} onChange={this.onInputChange}
				onBlur={this.onInputBlur} />
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
