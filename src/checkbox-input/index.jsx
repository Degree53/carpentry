import React from 'react';
import Styles from './styles';

export default React.createClass({
	
	displayName: 'CheckboxInput',
	
	propTypes: {
		checked: React.PropTypes.bool,
		className: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		setChecked: React.PropTypes.func.isRequired
	},
	
	getDefaultProps() {
		return {
			checked: false,
			className: 'CheckboxInput',
			disabled: false,
			onChange: null
		};
	},
	
	getInitialState() {
		return {
			checked: this.props.checked
		};
	},
	
	componentWillReceiveProps(nextProps) {
		// Update state if passed new checked value
		if (nextProps.checked !== this.props.checked) {
			this.setState({
				checked: nextProps.checked
			});
		}
	},
	
	componentDidUpdate() {
		// Call onChange function at appropriate moment
		if (this.props.onChange) this.props.onChange();
	},
	
	onComponentMouseDown(e) {
		// Prevent highlighting of inner contents
		e.preventDefault();
	},
	
	onComponentClick() {
		// Toggle checked state if not disabled and then pass
		// to setChecked function
		if (!this.props.disabled) {
			const checked = !this.state.checked;
			
			this.setState({
				checked: checked
			}, () => {
				this.props.setChecked(checked);
			});
		}
	},
	
	render() {
		let classes = this.props.className;
		if (this.props.disabled) classes += ' disabled';
		if (this.state.checked) classes += ' checked';
		
		const cursor = this.props.disabled ? 'default' : 'pointer';
		
		return (
			<div className={classes} onClick={this.onComponentClick}
				onMouseDown={this.onComponentMouseDown} style={{ cursor: cursor }}>
				<style type="text/css">{Styles(this.props.className)}</style>
				<div className={this.props.className + '__cell'}>
					{this.props.children}
				</div>
			</div>
		);
	}
});
