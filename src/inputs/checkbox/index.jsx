'use strict';

var React = require('react');
var GlobalUtils = require('../../utils');

var styles = {
	component: {
		display: 'inline-table',
		cursor: 'pointer'
	},
	componentDisabled: {
		cursor: 'default'
	},
	cell: {
		display: 'table-cell',
		verticalAlign: 'middle',
		textAlign: 'center'
	}
};

module.exports = React.createClass({
	
	displayName: 'CheckboxInput',
	
	propTypes: {
		className: React.PropTypes.string,
		iconSrc: React.PropTypes.string,
		charCode: React.PropTypes.number,
		label: React.PropTypes.string,
		checked: React.PropTypes.bool,
		setChecked: React.PropTypes.func.isRequired,
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func
	},
	
	getDefaultProps: function() {
		return {
			className: 'CheckboxInput',
			iconSrc: null,
			charCode: null,
			label: null,
			checked: false,
			disabled: false,
			onChange: null
		};
	},
	
	getInitialState: function() {
		return { checked: this.props.checked };
	},
	
	componentDidUpdate: function() {
		if (this.props.onChange) this.props.onChange();
	},
	
	onComponentMouseDown: function(e) {
		e.preventDefault();
	},
	
	onComponentClick: function() {
		if (!this.props.disabled) {
			var checked = !this.state.checked;
			this.setState({ checked: checked });
			this.props.setChecked(checked);
		}
	},
	
	renderIcon: function() {
		if (this.props.iconSrc) return (
			<img className={this.props.className + '__imgIcon'} src={this.props.iconSrc} />
		);
		else if (this.props.charCode) return (
			<span className={this.props.className + '__charIcon'}>
				{String.fromCharCode(this.props.charCode)}
			</span>
		);
	},
	
	renderLabel: function() {
		if (this.props.label) return (
			<span className={this.props.className + '__label'}>
				{this.props.label}
			</span>
		);
	},
	
	render: function() {
		var componentClasses = this.props.className;
		if (this.props.disabled) componentClasses += ' disabled';
		if (this.state.checked) componentClasses += ' checked';
		
		var componentStyles = GlobalUtils.mergeStyles([ styles.component,
			this.props.disabled && styles.componentDisabled ]);
		
		return (
			<div className={componentClasses} style={componentStyles}
				onMouseDown={this.onComponentMouseDown} onClick={this.onComponentClick}>
				<div className={this.props.className + '__cell'} style={styles.cell}>
					{this.renderIcon()}
					{this.renderLabel()}
				</div>
			</div>
		);
	}
	
});
