import React from 'react';

class DecimalInput extends React.Component {
	
	constructor (props) {
		super(props);
		
		const value = props.value.toFixed(props.places);
		
		this.state = {
			cursorIndex: 0,
			value
		};
		
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
		// is not currently focused or allowUpdate is false
		if (this.input !== document.activeElement &&
			nextProps.allowUpdate) {
			
			const value = nextProps.value.toFixed(this.props.places);
			
			this.setState({ value });
		}
	}
	
	componentDidUpdate () {
		// Update cursor position if it has changed
		if (this.input.selectionStart !== this.state.cursorIndex) {
			this.input.selectionStart = this.state.cursorIndex;
			this.input.selectionEnd = this.state.cursorIndex;
		}
	}
	
	setValue (value) {
		// Store value in state then pass value to props.setValue
		this.setState({ value }, () => {
			// Need to safely convert to number in case value is '.'
			let numValue = isNaN(Number(value)) ? 0 : Number(value);
			
			const newValue = numValue.toFixed(this.props.places);
				
			// Need to safely convert to number in case newValue is '.'
			numValue = isNaN(Number(newValue)) ? 0 : Number(newValue);
			
			this.props.setValue(numValue);
		});
	}
	
	formatDecimalPoints (value) {
		if (value.indexOf('.') === this.state.cursorIndex) {
			// Remove second decimal point
			return value.replace(/^(\d*\.\d*)\.(\d*)$/, '$1$2');
		}
		
		// Remove first decimal point
		return value.replace(/^(\d*)\.(\d*\.\d*)$/, '$1$2');
	}
	
	triggerKeypress (key, cursorIndex = this.state.cursorIndex) {
		if (!typeof key === 'string' || !key.length === 1) {
			throw new Error(`The first parameter of triggerKeypress()
				must receive a string argument of length 1`);
		}
		
		if (!key.match(/\d|\./)) {
			throw new Error(`The first parameter of triggerKeypress()
				must be an integer or period character`);
		}
		
		let value = Number(this.state.value) === 0 ?
			'' : this.state.value;
		
		// Insert key value at cursor position
		value = value.slice(0, cursorIndex) + key + value.slice(cursorIndex);
		
		// If there's only one decimal point, move cursor forward
		// and call setValue, else remove excess decimal point
		if (value.indexOf('.') === value.lastIndexOf('.')) {
			this.setState({ cursorIndex: cursorIndex + 1 }, () => {
				this.setValue(value);
			});
		} else {
			value = this.formatDecimalPoints(value);
			
			if (cursorIndex === value.indexOf('.') + 1) {
				// Don't store new position of cursor if inputting a
				// decimal point after an existing decimal point
				this.setValue(value);
			} else {
				this.setState({ cursorIndex: cursorIndex + 1 }, () => {
					this.setValue(value);
				});
			}
		}
	}
	
	triggerBackspace (cursorIndex = this.state.cursorIndex) {
		// Remove character at cursor position
		const value = this.state.value.slice(0, cursorIndex - 1) +
			this.state.value.slice(cursorIndex);
		
		this.setState({
			cursorIndex: cursorIndex - 1,
			value
		}, () => {
			this.setValue(value);
		});
	}
	
	onInputFocus () {
		// Empty value if equal to 0
		if (Number(this.state.value) === 0) {
			this.setState({
				cursorIndex: 0,
				value: ''
			}, () => {
				// Call onFocus function at appropriate moment
				if (this.props.onFocus) {
					this.props.onFocus();
				}
			});
			
			return;
		}
		
		// Call onFocus function at appropriate moment
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	}
	
	onInputMouseUp () {
		// Update cursor position when user clicks input
		this.setState({ cursorIndex: this.input.selectionStart });
	}
	
	onInputTouchEnd () {
		// Update cursor position when user taps input
		this.setState({ cursorIndex: this.input.selectionStart });
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
		let value = this.input.value;
		
		// If there's only one decimal point, move cursor forward
		// and call setValue, else remove excess decimal point
		if (value.indexOf('.') === value.lastIndexOf('.')) {
			this.setState({ cursorIndex: this.input.selectionStart }, () => {
				this.setValue(value);
			});
		} else {
			value = this.formatDecimalPoints(value);
			
			if (this.input.selectionStart - 1 === value.indexOf('.') + 1) {
				// Don't store new position of cursor if inputting a
				// decimal point after an existing decimal point
				this.setValue(value);
			} else {
				this.setState({ cursorIndex: this.input.selectionStart }, () => {
					this.setValue(value);
				});
			}
		}
	}
	
	onInputKeyUp () {
		// Update cursor position when user presses key
		this.setState({ cursorIndex: this.input.selectionStart });
	}
	
	onInputBlur () {
		// Need to safely convert to number in case value is '.'
		const numValue = isNaN(Number(this.state.value)) ?
			0 : Number(this.state.value);
		// Round the current value and set to state
		const value = numValue.toFixed(this.props.places);
		
		this.setState({ value }, () => {
			this.setValue(value);
			// Call onBlur function at appropriate moment
			if (this.props.onBlur) {
				this.props.onBlur();
			}
		});
	}
	
	render () {
		return (
			<input className={this.props.className} ref={c => this.input = c}
				value={this.state.value} disabled={this.props.disabled}
				onFocus={this.onInputFocus} onMouseUp={this.onInputMouseUp}
				onTouchEnd={this.onInputTouchEnd} onKeyPress={this.onInputKeyPress}
				onKeyUp={this.onInputKeyUp} onPaste={this.onInputPaste}
				onChange={this.onInputChange} onBlur={this.onInputBlur} />
		);
	}
}

DecimalInput.propTypes = {
	allowUpdate: React.PropTypes.bool,
	className: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	onBlur: React.PropTypes.func,
	onFocus: React.PropTypes.func,
	places: React.PropTypes.number,
	setValue: React.PropTypes.func.isRequired,
	value: React.PropTypes.number
};

DecimalInput.defaultProps = {
	allowUpdate: true,
	className: 'DecimalInput',
	disabled: false,
	onBlur: null,
	onFocus: null,
	places: 2,
	value: 0
};

export default DecimalInput;
