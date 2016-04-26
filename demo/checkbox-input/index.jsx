/* eslint no-magic-numbers: [ 2, {
	"ignore": [ 10003 ]
}] */

import Carpentry from '../../';
import React from 'react';
import ReactDOM from 'react-dom';

class Parent extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = { checked: false };
		this.setChecked = this.setChecked.bind(this);
	}
	
	setChecked (checked) {
		this.setState({ checked });
	}
	
	render () {
		return (
			<div>
				<div>{`this.state.checked = ${this.state.checked}`}</div>
				<Carpentry.CheckboxInput checked={this.state.checked}
					setChecked={this.setChecked}>
					{String.fromCharCode(10003)}
				</Carpentry.CheckboxInput>
			</div>
		);
	}
}

const container = document.getElementById('container');

ReactDOM.render(React.createElement(Parent, null), container);
