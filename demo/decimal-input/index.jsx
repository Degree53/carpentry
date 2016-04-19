import Carpentry from '../../';
import React from 'react';
import ReactDOM from 'react-dom';

class Parent extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = { decimal: 0 };
		this.setDecimal = this.setDecimal.bind(this);
	}
	
	setDecimal (decimal) {
		this.setState({ decimal });
	}
	
	render () {
		return (
			<div>
				<div>{'this.state.decimal = '}{this.state.decimal}</div>
				<Carpentry.DecimalInput value={this.state.decimal}
					setValue={this.setDecimal} />
			</div>
		);
	}
}

const container = document.getElementById('container');

ReactDOM.render(React.createElement(Parent, null), container);
