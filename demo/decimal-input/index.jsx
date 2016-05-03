import Carpentry from '../../';
import React from 'react';
import ReactDOM from 'react-dom';

class Parent extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = { decimal: 10 };
		
		this.elems = {};
		
		this.setDecimal = this.setDecimal.bind(this);
		this.onIntegerButtonClick = this.onIntegerButtonClick.bind(this);
		this.onPeriodButtonClick = this.onPeriodButtonClick.bind(this);
	}
	
	setDecimal (decimal) {
		this.setState({ decimal });
	}
	
	onIntegerButtonClick () {
		this.elems.input.triggerKeypress('9');
	}
	
	onPeriodButtonClick () {
		this.elems.input.triggerKeypress('.');
	}
	
	render () {
		return (
			<div>
				<div>{`this.state.decimal = ${this.state.decimal}`}</div>
				<Carpentry.DecimalInput ref={c => this.elems.input = c}
					setValue={this.setDecimal} value={this.state.decimal} />
				<button onClick={this.onIntegerButtonClick}>
					{'triggerKeypress(\'9\')'}
				</button>
				<button onClick={this.onPeriodButtonClick}>
					{'triggerKeypress(\'.\')'}
				</button>
			</div>
		);
	}
}

const container = document.getElementById('container');

ReactDOM.render(React.createElement(Parent, null), container);
