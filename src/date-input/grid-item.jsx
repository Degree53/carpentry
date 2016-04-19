import React from 'react';

export default React.createClass({
	
	displayName: 'GridItem',
	
	onDayClick() {
		this.props.setSelectedDate(this.props.date);
		this.props.setVisible(false);
	},
	
	onMonthOrYearClick() {
		this.props.setViewDate(this.props.date);
		this.props.setLevel(-1);
	},
	
	render() {
		let date;
		
		const time = this.props.date.getTime();
		const selectedTime = this.props.selectedDate.getTime();
		const month = this.props.date.getMonth();
		const viewMonth = this.props.viewDate.getMonth();
		
		let classes = this.props.className + '__date';
		if (time === selectedTime) classes += ' selected';
		
		switch (this.props.level) {
			case 0:
				if (month !== viewMonth) classes += ' padding';
				
				date = (
					<div className={classes} onClick={this.onDayClick}>
						{this.props.date.getDate()}
					</div>
				);
				break;
			case 1:
				date = (
					<div className={classes} onClick={this.onMonthOrYearClick}>
						{this.props.monthNames[month]}
					</div>
				);
				break;
			case 2:
				date = (
					<div className={classes} onClick={this.onMonthOrYearClick}>
						{this.props.date.getFullYear()}
					</div>
				);
		}
		
		return date;
	}
});
