'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'DateInput',
	
	render: function() {
		return (
			<input
				className="DateInput"
				type="text" />
		);
	}
	
});
