import Calendar from './calendar';
import Dates from '../helpers/dates';
import Numbers from '../helpers/numbers';
import React from 'react';
import Styles from './styles';

export default React.createClass({

	displayName: 'DateInput',

	propTypes: {
		className: React.PropTypes.string,
		dayNames: React.PropTypes.arrayOf(React.PropTypes.string),
		firstDoW: (props, propName, componentName) => {
			if (!Numbers.isNum(props[propName])) {
				return new Error(propName + ' must be a Number.' +
					' Check the props of ' + componentName);
			} else if (props[propName] % 1 !== 0) {
				return new Error(propName + ' must be an integer.' +
					' Check the props of ' + componentName);
			} else if (props[propName] < 0 || 6 < props[propName]) {
				return new Error(propName + ' must be a value between 0 and 6.' +
					' Check the props of ' + componentName);
			}
		},
		format: React.PropTypes.string,
		monthNames: React.PropTypes.arrayOf(React.PropTypes.string),
		setValue: React.PropTypes.func.isRequired,
		today: React.PropTypes.string,
		value: React.PropTypes.object
	},

	getDefaultProps() {
		return {
			className: 'DateInput',
			dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			firstDoW: 1,
			format: 'YYYY-MM-DD',
			monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
				'Sep', 'Oct', 'Nov', 'Dec'],
			today: 'Today',
			value: new Date()
		};
	},

	getInitialState() {
		return {
			selectedDate: new Date(this.props.value),
			visible: false
		};
	},

	setSelectedDate(date) {
		this.setState({
			selectedDate: date
		}, () => {
			this.props.setValue(date);
		});
	},

	setVisible(visible) {
		this.setState({
			visible: visible
		});
	},

	onDateInputClick() {
		this.setVisible(!this.state.visible);
	},

	render() {
		const dateString = Dates.toFormattedString(this.state.selectedDate, this.props.format);

		return (
			<div className={this.props.className} onClick={this.onDateInputClick}>
				<style type="text/css">{Styles(this.props.className)}</style>
				<div className={this.props.className + '__table'}>
					<div className={this.props.className + '__cell'}>
						<input className={this.props.className + '__input'} readOnly={true} value={dateString} />
					</div>
					<div className={this.props.className + '__cell'}>
						<button className={this.props.className + '__button'}>
							{this.props.children}
						</button>
					</div>
				</div>
				{this.state.visible ?
					<Calendar className={this.props.className} selectedDate={this.state.selectedDate}
						dayNames={this.props.dayNames} monthNames={this.props.monthNames}
						today={this.props.today} firstDoW={this.props.firstDoW}
						setSelectedDate={this.setSelectedDate} setVisible={this.setVisible} />
				: null}
			</div>
		);
	}
});
