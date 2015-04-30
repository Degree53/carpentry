'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'Buttons',
	
	render: function() {
		return (
			<div className={this.props.className + '__buttons'}>
				<div className={this.props.className + '__buttonsRow'}>
					<div className={this.props.className + '__today'}>
						
					</div>
				</div>
			</div>
		);
	}
	
});
