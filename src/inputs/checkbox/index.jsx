'use strict';

var React = require('react');
var utils = require('../../utils');

var styles = {
	checkboxTable: {
		display: 'inline-table',
		textAlign: 'center',
		cursor: 'pointer'
	},
	disabled: {
		cursor: 'default'
	},
	checkboxCell: {
		display: 'table-cell',
		verticalAlign: 'middle'
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
	
	getIconElem: function() {
		if (this.props.iconSrc) {
			return (
				<img className={this.props.className + '__imgIcon'}
					src={this.props.iconSrc} />
			);
		}
		if (this.props.charCode) {
			return (
				<div className={this.props.className + '__charIcon'}>
					{String.fromCharCode(this.props.charCode)}
				</div>
			);
		}
	},
	
	render: function() {
		var classes = this.props.className;
		if (this.props.disabled) classes += ' isDisabled';
		if (this.state.checked) classes += ' isChecked';
		
		var checkboxStyles = utils.merge([
			styles.checkboxTable,
			this.props.disabled && styles.disabled
		]);
		
		return (
			<div className={classes}
				style={checkboxStyles}
				onMouseDown={this.componentMouseDown}
				onClick={this.componentClick}>
				<div className={this.props.className + '__cell'}
					style={styles.checkboxCell}>
					{this.getIconElem()}
					{this.props.label}
				</div>
			</div>
		);
	}
	
});
