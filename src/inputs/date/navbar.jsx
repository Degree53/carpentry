'use strict';

var React = require('react');
var Utils = require('./utils');

module.exports = React.createClass({
	
	displayName: 'Navbar',
	
	getNavTitle: function() {
		switch (this.props.level) {
			case 0: var month = this.props.date.getMonth();
				return this.props.locale.monthNames[month];
			case 1: return this.props.date.getFullYear();
			case 2: return Utils.getDecadeString(this.props.date);
		}
	},
	
	navTitleClick: function() {
		// TODO Set the month
		this.props.setLevel(+1);
	},
	
	render: function() {
		return (
			<div className={this.props.className + '__navbar'}>
				<div className={this.props.className + '__navRow'}>
					<div className={this.props.className + '__navLeft'}>
						{String.fromCharCode('60')}
					</div>
					<div
						className={this.props.className + '__navTitle'}
						onClick={this.navTitleClick}>
						{this.getNavTitle()}
					</div>
					<div className={this.props.className + '__navRight'}>
						{String.fromCharCode('62')}
					</div>
				</div>
			</div>
		);
	}
	
});
