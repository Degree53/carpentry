import Dates from '../helpers/dates';
import React from 'react';

export default React.createClass({
	
	displayName: 'Navbar',
	
	getTitle() {
		let titleText;
		let cursor = 'pointer';
		
		switch (this.props.level) {
			case 0:
				let month = this.props.monthNames[this.props.viewDate.getMonth()];
				let year = this.props.viewDate.getFullYear();
				titleText = month + ' ' + year;
				break;
			case 1:
				titleText = this.props.viewDate.getFullYear();
				break;
			case 2:
				let decade = Dates.getYearsInDecade(this.props.viewDate);
				let startYear = decade[0].getFullYear();
				let endYear = decade[decade.length - 1].getFullYear();
				titleText = startYear + ' - ' + endYear;
				cursor = 'default';
		}
		
		return (
			<div className={this.props.className + '__title'}
				onClick={this.onTitleClick} style={{cursor: cursor}}>
				{titleText}
			</div>
		);
	},
	
	onTitleClick() {
		this.props.setLevel(+1);
	},
	
	onPreviousClick() {
		let previous;
		
		switch (this.props.level) {
			case 0:
				previous = Dates.getPrevMonth(this.props.viewDate);
				break;
			case 1:
				previous = Dates.getPrevYear(this.props.viewDate);
				break;
			case 2:
				previous = Dates.getPrevDecade(this.props.viewDate);
		}
		
		this.props.setViewDate(previous);
	},
	
	onNextClick() {
		let next;
		
		switch (this.props.level) {
			case 0:
				next = Dates.getNextMonth(this.props.viewDate);
				break;
			case 1:
				next = Dates.getNextYear(this.props.viewDate);
				break;
			case 2:
				next = Dates.getNextDecade(this.props.viewDate);
		}
		
		this.props.setViewDate(next);
	},
	
	render() {
		return (
			<div className={this.props.className + '__navbar'}>
				<div className={this.props.className + '__arrow'}
					onClick={this.onPreviousClick}>
					{String.fromCharCode('60')}
				</div>
				{this.getTitle()}
				<div className={this.props.className + '__arrow'}
					onClick={this.onNextClick}>
					{String.fromCharCode('62')}
				</div>
			</div>
		);
	}
});
