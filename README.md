# Carpentry

Carpentry is a library of highly customisable React components. The functionality and layout of each component is designed to be configurable via APIs using React props. All non-structural styling is left for the developer.

**WARNING** This package is under initial development. Until `v1.0.0` all changes should be treated as breaking. Not recommended for production.

<br>

## Rationale

Working to different style guides on different projects often means highly opinionated / pre-styled components can't be used. Developers can often reuse functionality but not styling even though the designs they are given usually conform to common user interface trends. All Carpentry components are designed to solve this problem by sticking to the following points:

+ Components are functionally specialised, doing one job and doing it well
+ Components can have their functionality configured easily via an API using React props
+ Components have only structural styling included (no colours, fonts, padding etc.)
+ Structural styling can be configured (e.g. a hamburger menu button on the left or the right)
+ When necessary, components can nest other components

<br>

## Installation

Thanks to NPM it's super easy, just `npm install carpentry`.

<br>

## Usage

Carpentry is built to work with the Node.js `require()` function. All components have an alias as listed in the table above. The recommended way to access a component is via its alias:

``` javascript
var MyDecimalInput = require('carpentry').DecimalInput;
```

<br>

## Components

<table>
	<thead>
		<tr>
			<th>Alias</th>
			<th width="100%">Description</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="#decimalinput">DecimalInput</a></td>
			<td>An input for enforcing a decimal value</td>
			<td>Stable</td>
		</tr>
		<tr>
			<td><a href="#dateinput">DateInput</a></td>
			<td>An input for selecting a date value</td>
			<td>Stable</td>
		</tr>
		<tr>
			<td>ResponsiveNav</td>
			<td></td>
			<td>Development</td>
		</tr>
		<tr>
			<td>CheckboxInput</td>
			<td>An input for toggling between two states</td>
			<td>Stable</td>
		</tr>
		<tr>
			<td>SelectInput</td>
			<td></td>
			<td>Planning</td>
		</tr>
		<tr>
			<td>PasswordInput</td>
			<td></td>
			<td>Planning</td>
		</tr>
		<tr>
			<td>FullScreenNav</td>
			<td></td>
			<td>Planning</td>
		</tr>
		<tr>
			<td>SliderInput</td>
			<td></td>
			<td>Planning</td>
		</tr>
	</tbody>
</table>

**Key:** Stable - currently included, API is stable. Unstable - currently included, API still under development. Development - not included, in development. Planning - not yet in development.

<br>

### DecimalInput

Use this component to enforce input of a decimal value. `setValue` should be a function that can set a value to state or pass it to an action. Using `value`, the component can also take a value for conversion or display purposes. This can be useful for chaining multiple inputs or applying your own validation.

``` javascript
setDecimal: function(decimal) {
	Actions.updateDecimal(decimal);
},

render: function() {
	return (
		<MyDecimalInput className="MyDecimalInput" setValue={this.setDecimal}>
	);
}
```

<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Type</th>
			<th>Default</th>
			<th>Required</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>className</td>
			<td>String</td>
			<td>null</td>
			<td>no</td>
			<td>A String to be used for the html class attribute for the component and all sub-components</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>Boolean</td>
			<td>false</td>
			<td>no</td>
			<td>A Boolean for disabling access to the input</td>
		</tr>
		<tr>
			<td>onBlur</td>
			<td>Function</td>
			<td>null</td>
			<td>no</td>
			<td>A Function to call on `onBlur`</td>
		</tr>
		<tr>
			<td>onFocus</td>
			<td>Function</td>
			<td>null</td>
			<td>no</td>
			<td>A Function to call on `onFocus`</td>
		</tr>
		<tr>
			<td>places</td>
			<td>Number</td>
			<td>2</td>
			<td>no</td>
			<td>The number of decimal places to which the decimal value should be restricted</td>
		</tr>
		<tr>
			<td>setValue</td>
			<td>Function</td>
			<td>n/a</td>
			<td>yes</td>
			<td>A Function for setting the decimal value to state or for passing it to an action</td>
		</tr>
		<tr>
			<td>value</td>
			<td>Number</td>
			<td>null</td>
			<td>no</td>
			<td>A number value to set the input to (useful for chaining inputs). Can also be used to set an initial value</td>
		</tr>
	</tbody>
</table>

### DateInput

This component is useful for enforcing input of a valid full-date string. `setValue` should be a function that can set a date string back to state or pass it to an action. `value` can be used to set a default date or update the input.

``` javascript
setDate: function(date) {
	Actions.updateDate(date);
},

render: function() {
	return (
		<MyDateInput className="MyDateInput" setValue={this.setDate}>
			{String.fromCharCode(10003)}
		</MyDateInput>
	);
}
```

<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Type</th>
			<th>Default</th>
			<th>Required</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>className</td>
			<td>String</td>
			<td>null</td>
			<td>no</td>
			<td>A String to be used for the html class attribute for the component and all sub-components</td>
		</tr>
		<tr>
			<td>dayNames</td>
			<td>String Array</td>
			<td>['Su', 'Mo'...]</td>
			<td>no</td>
			<td>An Array of strings to display as the days of the week on the calendar beginning with Sunday</td>
		</tr>
		<tr>
			<td>firstDoW</td>
			<td>Number</td>
			<td>1</td>
			<td>no</td>
			<td>The first day of the week beginning with Sunday = 0, ending with Saturday = 6</td>
		</tr>
		<tr>
			<td>format</td>
			<td>String</td>
			<td>'YYYY-MM-DD'</td>
			<td>no</td>
			<td>A String representing the format for displaying the selected date</td>
		</tr>
		<tr>
			<td>monthNames</td>
			<td>String Array</td>
			<td>['Jan', 'Feb'...]</td>
			<td>no</td>
			<td>An Array of strings to display as the months of the year on the calendar beginning with January</td>
		</tr>
		<tr>
			<td>setValue</td>
			<td>function</td>
			<td>n/a</td>
			<td>yes</td>
			<td>A Function for setting the full-date value back to state or for passing it to an action</td>
		</tr>
		<tr>
			<td>today</td>
			<td>String</td>
			<td>'Today'</td>
			<td>no</td>
			<td>The text to use for the today button</td>
		</tr>
		<tr>
			<td>value</td>
			<td>String</td>
			<td>new Date()
				<br />.toISOString()
				<br />.slice(0, 10)</td>
			<td>no</td>
			<td>A full-date to set the input to. Can be used to set an initial value</td>
		</tr>
	</tbody>
</table>
