'use strict';

var React = require('react');
var GlobalUtils = require('../../utils');
var Utils = require('./utils');

module.exports = React.createClass({
	
	displayName: 'Navbar',
	
	getNavTitle: function() {
		switch (this.props.level) {
			case 0:
				var month = this.props.viewDate.getMonth();
				var monthTitle = this.props.locale.monthNames[month] +
					' ' + this.props.viewDate.getFullYear();
				return (
					<div
						className={this.props.className + '__navMonth'}
						style={GlobalUtils.merge([
							this.styles.navElement,
							this.styles.interactive
						])}
						onClick={this.onNavTitleClick}>
						{monthTitle}
					</div>
				);
			case 1:
				var yearTitle = this.props.viewDate.getFullYear();
				return (
					<div
						className={this.props.className + '__navYear'}
						style={GlobalUtils.merge([
							this.styles.navElement,
							this.styles.interactive
						])}
						onClick={this.onNavTitleClick}>
						{yearTitle}
					</div>
				);
			case 2:
				var decade = Utils.getDecadeYears(this.props.viewDate);
				var decadeTitle = decade[0].getFullYear() + ' - ' +
					decade[decade.length - 1].getFullYear();
				return (
					<div
						className={this.props.className + '__navDecade'}
						style={this.styles.navElement}
						onClick={this.onNavTitleClick}>
						{decadeTitle}
					</div>
				);
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
					className={this.props.className + '__navCellLeft'}
					style={this.styles.navCell}>
					<div
						className={this.props.className + '__navPrev'}
						style={GlobalUtils.merge([
							this.styles.navElement,
							this.styles.interactive
						])}
						onClick={this.onNavPrevClick}>
						{String.fromCharCode('60')}
					</div>
				</div>
				<div
					className={this.props.className + '__navCellCenter'}
					style={this.styles.navCell}>
					{this.getNavTitle()}
				</div>
				<div
					className={this.props.className + '__navCellRight'}
					style={this.styles.navCell}>
					<div
						className={this.props.className + '__navNext'}
						style={GlobalUtils.merge([
							this.styles.navElement,
							this.styles.interactive
						])}
						onClick={this.onNavNextClick}>
						{String.fromCharCode('62')}
					</div>
				</div>
			</div>
		);
	},
	
	styles: {
		navbar: {
			display: 'table',
			width: '100%'
		},
		navCell: {
			display: 'table-cell',
			verticalAlign: 'middle'
		},
		navElement: {
			display: 'inline-block',
			cursor: 'default'
		},
		interactive: {
			cursor: 'pointer'
		}
	}
	
});
