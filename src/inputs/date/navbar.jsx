'use strict';

var React = require('react');

module.exports = React.createClass({
	
	render: function() {
		return (
			<div className={this.props.className + '__navbar'}>
				<div className={this.props.className + '__navRow'}>
					<div className={this.props.className + '__navLeft'}>
						{String.fromCharCode('60')}
					</div>
					<div className={this.props.className + '__navTitle'}>
						
					</div>
					<div className={this.props.className + '__navRight'}>
						{String.fromCharCode('62')}
					</div>
				</div>
			</div>
		);
	}
	
});
