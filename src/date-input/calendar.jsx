import Buttons from './buttons';
import Grid from './grid';
import Navbar from './navbar';
import React from 'react';

export default React.createClass({

	displayName: 'Calendar',

	getInitialState() {
		return {
			viewDate: new Date(this.props.selectedDate.getTime()),
			level: 0
		};
	},

	setViewDate(date) {
		this.setState({
			viewDate: date
		});
	},

	setLevel(modifier) {
		const newLevel = this.state.level + modifier;

		if (0 <= newLevel && newLevel <= 2) {
			this.setState({
				level: newLevel
			});
		}
	},

	onPositionerClick() {
		this.props.setVisible(false);
	},

	onCalendarClick(e) {
		e.stopPropagation();
	},

	render() {
		return (
			<div className={this.props.className + '__positioner'} onClick={this.onPositionerClick}>
				<div className={this.props.className + '__calendar'} onClick={this.onCalendarClick}>
					<Navbar className={this.props.className} viewDate={this.state.viewDate}
						level={this.state.level} monthNames={this.props.monthNames}
						setViewDate={this.setViewDate} setLevel={this.setLevel} />
					<Grid className={this.props.className} viewDate={this.state.viewDate}
						level={this.state.level} monthNames={this.props.monthNames}
						dayNames={this.props.dayNames} firstDoW={this.props.firstDoW}
						selectedDate={this.props.selectedDate} setViewDate={this.setViewDate}
						setSelectedDate={this.props.setSelectedDate} setLevel={this.setLevel}
						setVisible={this.props.setVisible} />
					<Buttons className={this.props.className} setVisible={this.props.setVisible}
						setSelectedDate={this.props.setSelectedDate} today={this.props.today} />
				</div>
			</div>
		);
	}
});
