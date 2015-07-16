'use strict';

var React = require('react');
var GlobalUtils = require('../../utils');
var DateUtils = require('./utils');

module.exports = React.createClass({
	
	displayName: 'Navbar',
	
	getNavTitle: function() {
		switch (this.props.level) {
			case 0:
				var month = this.props.viewDate.getMonth();
				var monthTitle = this.props.monthNames[month] + ' ' +
					this.props.viewDate.getFullYear();
				return (
					<div className={this.props.className + '__navMonth'} style={GlobalUtils.mergeStyles([
						this.styles.cellContentTable, this.styles.navCenter,
						this.styles.interactive ])}
						onClick={this.onNavTitleClick}>
						<div style={this.styles.cellContentCell}>
							{monthTitle}
						</div>
					</div>
				);
			case 1:
				var yearTitle = this.props.viewDate.getFullYear();
				return (
					<div className={this.props.className + '__navYear'} style={GlobalUtils.mergeStyles([
						this.styles.cellContentTable, this.styles.navCenter,
						this.styles.interactive ])}
						onClick={this.onNavTitleClick}>
						<div style={this.styles.cellContentCell}>
							{yearTitle}
						</div>
					</div>
				);
			case 2:
				var decade = DateUtils.getDecadeYears(this.props.viewDate);
				var decadeTitle = decade[0].getFullYear() + ' - ' + decade[decade.length - 1].getFullYear();
				return (
					<div className={this.props.className + '__navDecade'} style={GlobalUtils.mergeStyles([
						this.styles.cellContentTable, this.styles.navCenter ])}
						onClick={this.onNavTitleClick}>
						<div style={this.styles.cellContentCell}>
							{decadeTitle}
						</div>
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
				var newMonth = DateUtils.getPrevMonth(this.props.viewDate);
				this.props.setViewDate(newMonth);
				break;
			case 1:
				var newYear = DateUtils.getPrevYear(this.props.viewDate);
				this.props.setViewDate(newYear);
				break;
			case 2:
				var newDecade = DateUtils.getPrevDecade(this.props.viewDate);
				this.props.setViewDate(newDecade);
		}
	},
	
	onNavNextClick: function() {
		switch (this.props.level) {
			case 0:
				var newMonth = DateUtils.getNextMonth(this.props.viewDate);
				this.props.setViewDate(newMonth);
				break;
			case 1:
				var newYear = DateUtils.getNextYear(this.props.viewDate);
				this.props.setViewDate(newYear);
				break;
			case 2:
				var newDecade = DateUtils.getNextDecade(this.props.viewDate);
				this.props.setViewDate(newDecade);
		}
	},
	
	render: function() {
		return (
			<div className={this.props.className + '__navbar'} style={this.styles.navbar}>
				<div className={this.props.className + '__navLeft'} style={this.styles.navCell}>
					<div className={this.props.className + '__navPrev'} style={GlobalUtils.mergeStyles([
						this.styles.cellContentTable, this.styles.navLeft,
						this.styles.interactive ])}	onClick={this.onNavPrevClick}>
						<div style={this.styles.cellContentCell}>
							{String.fromCharCode('60')}
						</div>
					</div>
				</div>
				<div className={this.props.className + '__navCenter'} style={this.styles.navCell}>
					{this.getNavTitle()}
				</div>
				<div className={this.props.className + '__navRight'} style={this.styles.navCell}>
					<div className={this.props.className + '__navNext'} style={GlobalUtils.mergeStyles([
						this.styles.cellContentTable, this.styles.navRight, this.styles.interactive ])}
						onClick={this.onNavNextClick}>
						<div style={this.styles.cellContentCell}>
							{String.fromCharCode('62')}
						</div>
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
		cellContentTable: {
			display: 'table',
			cursor: 'default'
		},
		navLeft: {
			marginLeft: 'auto',
			marginRight: 0
		},
		navCenter: {
			marginLeft: 'auto',
			marginRight: 'auto'
		},
		navRight: {
			marginLeft: 0,
			marginRight: 'auto'
		},
		cellContentCell: {
			display: 'table-cell',
			verticalAlign: 'middle'
		},
		interactive: {
			cursor: 'pointer'
		}
	}
	
});
