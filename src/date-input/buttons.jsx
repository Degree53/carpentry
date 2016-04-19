import React from 'react';

export default React.createClass({
	
	displayName: 'Buttons',
	
	onTodayClick() {
		const today = new Date(new Date().toISOString().slice(0, 10));
		
		this.props.setSelectedDate(today);
		this.props.setVisible(false);
	},
	
	render() {
		return (
			<div className={this.props.className + '__buttons'}>
				<div className={this.props.className + '__today'} onClick={this.onTodayClick}>
					{this.props.today}
				</div>
			</div>
		);
	}
});
