import Carpentry from '../../';
import React from 'react';
import ReactDOM from 'react-dom';

// Dont't forget to import your styles :D
import '../../src/dialog-manager/styles/base.scss';

class Parent extends React.Component {

	constructor (props) {
		super(props);

		this.state = {};
		this.queueDialog = this.queueDialog.bind(this);
		this.queueManyDialogs = this.queueManyDialogs.bind(this);
		this.queueStackingDialog = this.queueStackingDialog.bind(this);
	}

	queueDialog () {
		const id = new Date().getTime() * Math.random();

		Carpentry.DialogManager.Actions.queueDialog({
			id: `dialog.${id}`,
			title: 'Greetings!',
			body: `My people call me 'dialog.${id}'. I'm going to take over the world`,
			buttons: [{
				id: 'cancel',
				text: 'No!',
				importance: 'secondary',
				callback: () => console.log('cancel clicked')
			}, {
				id: 'ok',
				text: 'Fine...',
				importance: 'primary',
				callback: () => console.log('ok clicked')
			}]
		});
	}

	queueManyDialogs () {
		for (let i = Math.floor(Math.random() * 10); i > 0; i--) {
			this.queueDialog();
		}
	}

	queueStackingDialog () {
		Carpentry.DialogManager.Actions.queueDialog({
			id: 'dialog',
			body: 'Are you sure want to exit?',
			buttons: [{
				id: 'cancel',
				text: 'No',
				importance: 'secondary',
				callback: () => console.log('cancel clicked')
			}, {
				id: 'ok',
				text: 'Yes',
				importance: 'primary',
				callback: () => Carpentry.DialogManager.Actions.queueDialog({
					id: 'dialog',
					body: 'Are you absolutely certain?',
					buttons: [{
						id: 'cancel',
						text: 'Not really',
						importance: 'secondary',
						callback: () => console.log('cancel clicked')
					}, {
						id: 'ok',
						text: 'YES!',
						importance: 'primary',
						callback: () => console.log('ok clicked')
					}]
				})
			}]
		});
	}

	render () {
		return (
			<div>
				<button onClick={this.queueDialog}>
					{'Queue Dialog'}
				</button>
				<button onClick={this.queueManyDialogs}>
					{'Queue Many Dialogs'}
				</button>
				<button onClick={this.queueStackingDialog}>
					{'Queue Stacking Dialog'}
				</button>
				<p>{'Click the button above to send a dialog to the manager. Any dialogs sent to the manager will queue and be displayed in the order they were added'}</p>
				<Carpentry.DialogManager.Container />
			</div>
		);
	}
}

const container = document.getElementById('container');

ReactDOM.render(React.createElement(Parent, null), container);
