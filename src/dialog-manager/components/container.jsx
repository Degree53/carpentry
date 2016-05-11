import React from 'react';
import { Container } from 'flux/utils';

import DialogsStore from '../stores/dialogs';

import Dialog from './dialog';

class DialogContainer extends React.Component {

	static getStores () {
		return [DialogsStore];
	}

	static calculateState () {
		const dialogs = DialogsStore.get('dialogs');

		return {
			dialogs,
			currentDialog: dialogs[0]
		};
	}

	getDialogToRender () {
		if (typeof this.state.currentDialog === 'undefined') {
			return null;
		}

		return <Dialog dialogData={this.state.currentDialog} />;
	}

	render () {
		return (
			<div>
				<h1>{'Dialog Container'}</h1>
				<p>{this.state.dialogs.length}</p>
				{this.getDialogToRender()}
			</div>
		);
	}
}

export default Container.create(DialogContainer);
