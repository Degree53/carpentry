'use strict';

var React = require('react');
var utils = require('../../utils');

var styles = {
	checkbox: {
		display: 'inline-table',
		verticalAlign: 'text-bottom',
		cursor: 'pointer'
	},
	disabled: {
		cursor: 'default'
	},
	cell: {
		display: 'table-cell',
		opacity: 0,
		verticalAlign: 'middle',
		textAlign: 'center'
	},
	checked: {
		opacity: 1
	}
};

module.exports = React.createClass({
	
	displayName: 'CheckboxInput',
	
	propTypes: {
		className: React.PropTypes.string,
		charCode: React.PropTypes.number,
		checked: React.PropTypes.bool,
		setChecked: React.PropTypes.func.isRequired,
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func
	},
	
	getDefaultProps: function() {
		return {
			className: 'CheckboxInput',
			charCode: 10003,
			checked: false,
			disabled: false,
			onChange: null
		};
	},
	
	getInitialState: function() {
		return { checked: this.props.checked };
	},
	
	componentWillUpdate: function() {
		if (this.props.onChange) this.props.onChange();
	},
	
	componentMouseDown: function(e) {
		e.preventDefault();
	},
	
	componentClick: function() {
		if (!this.props.disabled) {
			var checked = !this.state.checked;
			
			this.setState({ checked: checked });
			this.props.setChecked(checked);
		}
	},
	
	render: function() {
		var modifiers = '';
		if (this.props.disabled) modifiers += ' isDisabled';
		if (this.state.checked) modifiers += ' isChecked';
		
		var checkboxStyles = utils.merge([
			styles.checkbox,
			this.props.disabled && styles.disabled
		]);
		
		var cellStyles = utils.merge([
			styles.cell,
			this.state.checked && styles.checked
		]);
		
		return (
			<div className={this.props.className + modifiers} style={checkboxStyles}
				onMouseDown={this.componentMouseDown} onClick={this.componentClick}>
				<div className={this.props.className + '__cell'} style={cellStyles}>
					{String.fromCharCode(this.props.charCode)}
				</div>
			</div>
		);
	}
	
});
