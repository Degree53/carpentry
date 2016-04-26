import Dates from '../helpers/dates';
import GridItem from './grid-item';
import React from 'react';

export default React.createClass({
	
	displayName: 'Grid',
	
	getGridHead() {
		let weekdays = this.props.dayNames.slice(0);
		weekdays = weekdays.concat(weekdays.splice(0, this.props.firstDoW));
		
		return (
			<div className={this.props.className + '__head'}>
				{weekdays.map((name, i) => {
					return (
						<div className={this.props.className + '__weekday'} key={i}>
							{name}
						</div>
					);
				})}
			</div>
		);
	},
	
	getDates() {
		let dates = [];
		
		switch (this.props.level) {
			case 0:
				let days = Dates.getDatesInMonth(this.props.viewDate, this.props.firstDoW);
				for (let i = 0; i < 6; i++) {
					dates.push(days.splice(0, 7));
				}
				break;
			case 1:
				let months = Dates.getMonthsInYear(this.props.viewDate);
				for (let i = 0; i < 4; i++) {
					dates.push(months.splice(0, 3));
				}
				break;
			case 2:
				let years = Dates.getYearsInDecade(this.props.viewDate);
				for (let i = 0; i < 4; i++) {
					dates.push(years.splice(0, 3));
				}
		}
		
		return dates;
	},
	
	getGridRows() {
		let rows = this.getDates();
		
		return rows.map((row, i) => {
			return (
				<div className={this.props.className + '__row'} key={i}>
					{row.map((date, i) => {
						return (
							<GridItem className={this.props.className} date={date} key={i}
								level={this.props.level} monthNames={this.props.monthNames}
								viewDate={this.props.viewDate} selectedDate={this.props.selectedDate}
								setSelectedDate={this.props.setSelectedDate}
								setLevel={this.props.setLevel} setViewDate={this.props.setViewDate}
								setVisible={this.props.setVisible} />
						);
					})}
				</div>
			);
		});
	},
	
	render() {
		return (
			<div className={this.props.className + '__grid'}>
				{this.props.level === 0 ?
					this.getGridHead()
				: null}
				{this.getGridRows()}
			</div>
		);
	}
});
