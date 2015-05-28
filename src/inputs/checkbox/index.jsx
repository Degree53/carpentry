'use strict';

var React = require('react');

module.exports = React.createClass({
	
	displayName: 'CheckboxInput',
	
	propTypes: {
		className: React.PropTypes.string,
		character: React.PropTypes.number,
		initChecked: React.PropTypes.bool,
		setChecked: React.PropTypes.func.isRequired
	},
	
	getDefaultProps: function() {
		return {
			className: 'CheckboxInput',
			charCode: 10003,
			initChecked: false
		};
	},
	
	getInitialState: function() {
		return {
			checked: this.props.initChecked
		};
	},
	
	onComponentMouseDown: function(e) {
		e.preventDefault();
	},
	
	onComponentClick: function() {
		var checked = !this.state.checked;
		
		this.setState({ checked: checked });
		this.setChecked(checked);
	},
	
	render: function() {
		return (
			<div
				className={this.props.className}
				style={this.styles.checkbox}
				onMouseDown={this.onComponentMouseDown}
				onClick={this.onComponentClick}>
				<div
					className={this.props.className + '__cell'}
					style={this.styles.cell}>
					{String.fromCharCode(this.props.charCode)}
				</div>
			</div>
		);
	},
	
	styles: {
		checkbox: {
			display: 'table'
		},
		cell: {
			display: 'table-cell',
			verticalAlign: 'middle',
			textAlign: 'center'
		}
	}
	
});
