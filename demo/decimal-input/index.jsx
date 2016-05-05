import Carpentry from '../../';
import React from 'react';
import ReactDOM from 'react-dom';

class Parent extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = { decimal: 0, autoFormat: true };
		
		this.setDecimal = this.setDecimal.bind(this);
		this.onZeroButtonClick = this.onZeroButtonClick.bind(this);
		this.onNineButtonClick = this.onNineButtonClick.bind(this);
		this.onPeriodButtonClick = this.onPeriodButtonClick.bind(this);
		this.onBackspaceButtonClick = this.onBackspaceButtonClick.bind(this);
		this.onAutoFormatButtonClick = this.onAutoFormatButtonClick.bind(this);
	}
	
	setDecimal (decimal) {
		this.setState({ decimal });
	}
	
	onZeroButtonClick () {
		const lng = this.input.input.value.length;
		this.input.triggerKeypress('0', lng);
	}
	
	onNineButtonClick () {
		const lng = this.input.input.value.length;
		this.input.triggerKeypress('9', lng);
	}
	
	onPeriodButtonClick () {
		const lng = this.input.input.value.length;
		this.input.triggerKeypress('.', lng);
	}
	
	onBackspaceButtonClick () {
		const lng = this.input.input.value.length;
		this.input.triggerBackspace(lng);
	}
	
	onAutoFormatButtonClick () {
		this.setState({ autoFormat: !this.state.autoFormat });
	}
	
	render () {
		return (
			<div>
				<div>{`this.state.decimal = ${this.state.decimal}`}</div>
				<Carpentry.DecimalInput ref={c => this.input = c}
					setValue={this.setDecimal} value={this.state.decimal}
					autoFormat={this.state.autoFormat} />
				<button onClick={this.onZeroButtonClick}>
					{'triggerKeypress(\'0\')'}
				</button>
				<button onClick={this.onNineButtonClick}>
					{'triggerKeypress(\'9\')'}
				</button>
				<button onClick={this.onPeriodButtonClick}>
					{'triggerKeypress(\'.\')'}
				</button>
				<button onClick={this.onBackspaceButtonClick}>
					{'triggerBackspace()'}
				</button>
				<button onClick={this.onAutoFormatButtonClick}>
					{'toggle autoFormat'}
				</button>
			</div>
		);
	}
}

const container = document.getElementById('container');

ReactDOM.render(React.createElement(Parent, null), container);
