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

	render () {
		if (typeof this.state.currentDialog === 'undefined') {
			return null;
		}

		return (
			<div className={'carpentry-dialog-manager__dialog-container'}>
				<div className={'carpentry-dialog-manager__dialog__background'}></div>
				<Dialog dialogData={this.state.currentDialog} />
			</div>
		);
	}
}

export default Container.create(DialogContainer);
