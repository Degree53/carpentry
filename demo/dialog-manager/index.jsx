import Carpentry from '../../';
import React from 'react';
import ReactDOM from 'react-dom';

class Parent extends React.Component {

	constructor (props) {
		super(props);

		this.state = {};
		this.onDialogButtonClicked = this.onDialogButtonClicked.bind(this);
	}

	onDialogButtonClicked () {
		const date = new Date().getTime();

		Carpentry.DialogManager.Actions.queueDialog({
			id: `dialog.${date}`,
			title: 'Greetings!',
			body: `I am a dialog.${date}, I'm going to take over the world`,
			buttons: [{
				id: 'cancel',
				text: 'No you\'re not!',
				importance: 'secondary',
				callback: () => console.log('cancel clicked')
			}, {
				id: 'ok',
				text: 'Ok, w/e',
				importance: 'primary',
				callback: () => console.log('ok clicked')
			}]
		});
	}

	render () {
		return (
			<div>
				<button onClick={this.onDialogButtonClicked}>{'Queue Dialog'}</button>
				<Carpentry.DialogManager.Container />
			</div>
		);
	}
}

const container = document.getElementById('container');

ReactDOM.render(React.createElement(Parent, null), container);
