/* eslint no-magic-numbers: [ 2, {
	"ignore": [ 0, 10 ]
}] */

import Carpentry from '../../';
import React from 'react';
import ReactDOM from 'react-dom';

class Parent extends React.Component {

	constructor (props) {
		super(props);
		this.state = { date: new Date() };
		this.setDate = this.setDate.bind(this);
	}

	setDate (date) {
		this.setState({ date });
	}

	render () {
		return (
			<div>
				<div>{'this.state.date = '}{this.state.date.toString()}</div>
				<Carpentry.DateInput setValue={this.setDate} format="DD / MM / YY">
					<img src="date-input/calendar.png" />
				</Carpentry.DateInput>
			</div>
		);
	}
}

const container = document.getElementById('container');

ReactDOM.render(React.createElement(Parent, null), container);
