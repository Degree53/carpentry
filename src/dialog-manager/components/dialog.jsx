import React from 'react';
import Button from './button';

import DialogActions from '../actions';

export default class Dialog extends React.Component {

	constructor (props) {
		super(props);

		this.onButtonClicked = this.onButtonClicked.bind(this);
	}

	closeDialog () {
		DialogActions.dismissDialog(this.props.dialogData.id);
	}

	onButtonClicked (id) {
		this.closeDialog();

		// Execute the callback for the button
		this.props.dialogData.buttons.filter(b => b.id === id)[0].callback();
	}

	renderButton (buttonData, isLastButton) {
		const output = [
			<div key={buttonData.id} className={'carpentry-dialog-manager__dialog-button-cell'}>
				<Button onClick={this.onButtonClicked} buttonData={buttonData} />
			</div>
		];

		if (!isLastButton) {
			output.push(
				<div key={`${buttonData.id}.spacer`} className={'carpentry-dialog-manager__dialog-button-spacer'} />
			);
		}
		
		return output;
	}

	renderButtons () {
		return this.props.dialogData.buttons.reduce((out, button, i, arr) => [].concat(out, ...this.renderButton(button, arr.length - 1 === i)), []);
	}

	render () {
		return (
			<div className={'carpentry-dialog-manager__dialog'} data-dialog-id={this.props.dialogData.id}>
				<p className={'carpentry-dialog-manager__dialog-title'}>
					{this.props.dialogData.title}
				</p>
				<p className={'carpentry-dialog-manager__dialog-body'}>
					{this.props.dialogData.body}
				</p>
				<div className={'carpentry-dialog-manager__dialog-buttons'}>
					<div className={'carpentry-dialog-manager__dialog-button-table'}>
						<div className={'carpentry-dialog-manager__dialog-button-row'}>
							{this.renderButtons()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dialog.defaultProps = {
	dialogData: null
};
