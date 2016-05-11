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

	renderButton (buttonData) {
		return (
			<Button
				key={buttonData.id}
				onClick={this.onButtonClicked}
				buttonData={buttonData}
			/>
		);
	}

	render () {
		return (
			<div className={'dialog'}>
				<p className={'dialog__title'}>{this.props.dialogData.title}</p>
				<p className={'dialog__body'}>{this.props.dialogData.body}</p>
				<div className={'dialog__buttons'}>
					{this.props.dialogData.buttons.map(b => this.renderButton(b))}
				</div>
			</div>
		);
	}
}

Dialog.defaultProps = {
	dialogData: null
};
