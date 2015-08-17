'use strict';

var React = require('react');
var GlobalUtils = require('../../utils');

var styles = {
	component: {
		display: 'inline-table',
		cursor: 'pointer'
	},
	disabled: {
		cursor: 'default'
	},
	cell: {
		display: 'table-cell',
		verticalAlign: 'middle',
		textAlign: 'center'
	},
	icon: {
		display: 'block'
	}
};

module.exports = React.createClass({
	
	displayName: 'CheckboxInput',
	
	propTypes: {
		className: React.PropTypes.string,
		imgSrc: React.PropTypes.string,
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
			imgSrc: null,
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
	
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.checked !== this.props.checked) {
			this.setState({ checked: nextProps.checked });
		}
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
			this.props.setChecked(checked);
			this.setState({ checked: checked });
		}
	},
	
	renderImg: function() {
		if (this.props.imgSrc) return (
			<img className={this.props.className + '__img'} src={this.props.imgSrc}
				style={styles.icon} />
		);
	},
	
	renderChar: function() {
		if (this.props.charCode) return (
			<div className={this.props.className + '__char'} style={styles.icon}>
				{String.fromCharCode(this.props.charCode)}
			</div>
		);
	},
	
	renderLabel: function() {
		if (this.props.label) return (
			<div className={this.props.className + '__label'} style={styles.icon}>
				{this.props.label}
			</div>
		);
	},
	
	render: function() {
		var componentClasses = this.props.className;
		if (this.props.disabled) componentClasses += ' disabled';
		if (this.state.checked) componentClasses += ' checked';
		
		var componentStyles = GlobalUtils.mergeStyles([
			styles.component,
			this.props.disabled && styles.disabled
		]);
		
		return (
			<div className={componentClasses} onClick={this.onComponentClick}
				onMouseDown={this.onComponentMouseDown} style={componentStyles}>
				<div className={this.props.className + '__cell'} style={styles.cell}>
					{this.renderImg()}
					{this.renderChar()}
					{this.renderLabel()}
				</div>
			</div>
		);
	}
	
});
