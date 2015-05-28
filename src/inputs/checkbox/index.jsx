'use strict';

var React = require('react');
var GlobalUtils = require('../../utils');

module.exports = React.createClass({
	
	displayName: 'CheckboxInput',
	
	propTypes: {
		className: React.PropTypes.string,
		character: React.PropTypes.number,
		initChecked: React.PropTypes.bool,
		setChecked: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func
	},
	
	getDefaultProps: function() {
		return {
			className: 'CheckboxInput',
			charCode: 10003,
			initChecked: false,
			onChange: null
		};
	},
	
	getInitialState: function() {
		return {
			checked: this.props.initChecked
		};
	},
	
	componentWillUpdate: function() {
		if (this.props.onChange) this.props.onChange();
	},
	
	onComponentMouseDown: function(e) {
		e.preventDefault();
	},
	
	onComponentClick: function() {
		var checked = !this.state.checked;
		
		this.setState({ checked: checked });
		this.props.setChecked(checked);
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
					style={GlobalUtils.merge([
						this.styles.cell,
						this.state.checked && this.styles.checked
					])}>
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
			textAlign: 'center',
			opacity: 0
		},
		checked: {
			opacity: 1
		}
	}
	
});
