import Carpentry from '../../';
import React from 'react';
import ReactDOM from 'react-dom';

class Parent extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = { decimal: 0, allowUpdate: true };
		
		this.setDecimal = this.setDecimal.bind(this);
		this.onAllowUpdateButtonClick = this.onAllowUpdateButtonClick.bind(this);
		this.onZeroButtonClick = this.onZeroButtonClick.bind(this);
		this.onNineButtonClick = this.onNineButtonClick.bind(this);
		this.onPeriodButtonClick = this.onPeriodButtonClick.bind(this);
		this.onBackspaceButtonClick = this.onBackspaceButtonClick.bind(this);
	}
	
	setDecimal (decimal) {
		this.setState({ decimal });
	}
	
	onAllowUpdateButtonClick () {
		this.setState({ allowUpdate: !this.state.allowUpdate });
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
	
	render () {
		return (
			<div>
				<div>{`this.state.decimal = ${this.state.decimal}`}</div>
				<Carpentry.DecimalInput ref={c => this.input = c}
					setValue={this.setDecimal} value={this.state.decimal}
					allowUpdate={this.state.allowUpdate} />
				<button onClick={this.onAllowUpdateButtonClick}>
					{'toggle allowUpdate'}
				</button>
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
			</div>
		);
	}
}

const container = document.getElementById('container');

ReactDOM.render(React.createElement(Parent, null), container);
