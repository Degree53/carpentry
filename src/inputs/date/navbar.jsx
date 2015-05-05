'use strict';

var React = require('react');
var Utils = require('./utils');

module.exports = React.createClass({
	
	displayName: 'Navbar',
	
	getNavTitle: function() {
		switch (this.props.level) {
			case 0:
				var month = this.props.viewDate.getMonth();
				return this.props.locale.monthNames[month];
			case 1:
				return this.props.viewDate.getFullYear();
			case 2:
				var decade = Utils.getDecadeYears(this.props.viewDate);
				return decade[0].getFullYear() + ' - ' +
					decade[decade.length - 1].getFullYear();
		}
	},
	
	onNavTitleClick: function() {
		this.props.setLevel(+1);
	},
	
	onNavPrevClick: function() {
		switch (this.props.level) {
			case 0:
				var newMonth = Utils.getPrevMonth(this.props.viewDate);
				this.props.setViewDate(newMonth);
				break;
			case 1:
				var newYear = Utils.getPrevYear(this.props.viewDate);
				this.props.setViewDate(newYear);
				break;
			case 2:
				var newDecade = Utils.getPrevDecade(this.props.viewDate);
				this.props.setViewDate(newDecade);
		}
	},
	
	onNavNextClick: function() {
		switch (this.props.level) {
			case 0:
				var newMonth = Utils.getNextMonth(this.props.viewDate);
				this.props.setViewDate(newMonth);
				break;
			case 1:
				var newYear = Utils.getNextYear(this.props.viewDate);
				this.props.setViewDate(newYear);
				break;
			case 2:
				var newDecade = Utils.getNextDecade(this.props.viewDate);
				this.props.setViewDate(newDecade);
		}
	},
	
	render: function() {
		return (
			<div
				className={this.props.className + '__navbar'}
				style={this.styles.navbar}>
				<div
					className={this.props.className + '__navCell'}
					style={this.styles.navCell}>
					<div
						className={this.props.className + '__navPrev'}
						style={this.styles.navElement}
						onClick={this.onNavPrevClick}>
						{String.fromCharCode('60')}
					</div>
				</div>
				<div
					className={this.props.className + '__navCell'}
					style={this.styles.navCell}>
					<div
						className={this.props.className + '__navTitle'}
						style={this.styles.navElement}
						onClick={this.onNavTitleClick}>
						{this.getNavTitle()}
					</div>
				</div>
				<div
					className={this.props.className + '__navCell'}
					style={this.styles.navCell}>
					<div
						className={this.props.className + '__navNext'}
						style={this.styles.navElement}
						onClick={this.onNavNextClick}>
						{String.fromCharCode('62')}
					</div>
				</div>
			</div>
		);
	},
	
	styles: {
		navbar: {
			boxSizing: 'border-box',
			display: 'table',
			width: '100%'
		},
		navCell: {
			boxSizing: 'border-box',
			display: 'table-cell'
		},
		navElement: {
			boxSizing: 'border-box',
			cursor: 'pointer'
		}
	}
	
});
