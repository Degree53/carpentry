# Carpentry

Carpentry is a library of highly customisable React components. The
functionality and layout of each component is designed to be configurable
via APIs using React props. All non-structural styling is left for the
developer.

**WARNING** This package is under initial development. Until `v1.0.0`
all changes should be treated as breaking. Not recommended for production.

<br>

## Rationale

Working to different style guides on different projects often means
highly opinionated / pre-styled components can't be used. Developers
can often reuse functionality but not styling even though the designs
they are given usually conform to common user interface trends. All
Carpentry components are designed to solve this problem by sticking to
the following points:

+ Components are functionally specialised, doing one job and doing it
	well
+ Components can have their functionality configured easily via an API
	using React props
+ Components have only structural styling included (no colours, fonts,
	padding	etc.)
+ Structural styling is configurable (e.g. a hamburger menu button can
	be on the left or the right)
+ When necessary, components can nest other components

<br>

## Installation

Thanks to NPM it's super easy, just `npm install carpentry`.

<br>

## Components

<table>
	<thead>
		<tr>
			<th>Alias</th>
			<th>Description</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="#decimalinput">DecimalInput</a></td>
			<td>Enforces input of a decimal value</td>
			<td>Unstable</td>
		</tr>
		<tr>
			<td>DateInput</td>
			<td></td>
			<td>Unstable</td>
		</tr>
		<tr>
			<td>ResponsiveNav</td>
			<td></td>
			<td>Planned</td>
		</tr>
		<tr>
			<td>SelectInput</td>
			<td></td>
			<td>Planned</td>
		</tr>
		<tr>
			<td>PasswordInput</td>
			<td></td>
			<td>Planned</td>
		</tr>
		<tr>
			<td>FullScreenNav</td>
			<td></td>
			<td>Planned</td>
		</tr>
		<tr>
			<td>SliderInput</td>
			<td></td>
			<td>Planned</td>
		</tr>
	</tbody>
</table>

**Stable:** Currently included, API is stable.<br>
**Unstable:** Currently included, API still under development.<br>
**Development:** Not included, in development.<br>
**Planned:** Not yet in development.

<br>

## Usage

Carpentry is built to work with the Node.js `require()` function. All
components have an alias as listed in the table above. The
recommended way to access a component is via its alias:

``` javascript
var MyDecimalInput = require('carpentry').DecimalInput;
```

<br>

### DecimalInput

Use this component to enforce input of a decimal value. `setValue`
should be a function that can set a value back to storage. Using `value`,
the component can also take a value for conversion or display purposes.
This can be useful for chaining multiple inputs or applying your own
validation. If `setValue` and `value` are used together to create a loop
it's advised to set `setOnChange` to `false` to prevent strange
behaviour whilst the user is inputting.

``` javascript
setDecimal: function(decimal) {
	Actions.updateDecimal(decimal);
},

render: function() {
	return (
		<MyDecimalInput
			className="MyDecimalInput"
			setValue={this.setDecimal} />
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
			<td>A String to be used for the html class attribute for
				the	component and all sub-components</td>
		</tr>
		<tr>
			<td>initValue</td>
			<td>Number</td>
			<td>0</td>
			<td>no</td>
			<td>The initial value of the input</td>
		</tr>
		<tr>
			<td>numOfPlaces</td>
			<td>Number</td>
			<td>2</td>
			<td>no</td>
			<td>The number of decimal places to which the decimal value
				should be restricted</td>
		</tr>
		<tr>
			<td>value</td>
			<td>Number</td>
			<td>null</td>
			<td>no</td>
			<td>An incoming value to set the input to (useful for
				chaining inputs)</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>Boolean</td>
			<td>false</td>
			<td>no</td>
			<td>A Boolean for disabling access to the input</td>
		</tr>
		<tr>
			<td>setValue</td>
			<td>Function</td>
			<td>n/a</td>
			<td>yes</td>
			<td>A Function for setting the value back to state or via
				an action to storage</td>
		</tr>
		<tr>
			<td>setOnChange</td>
			<td>Boolean</td>
			<td>true</td>
			<td>no</td>
			<td>A Boolean for disabling calling setValue on onChange
				(use to prevent overwriting user input when	the input
				is placed in an update loop)</td>
		</tr>
		<tr>
			<td>onFocus</td>
			<td>Function</td>
			<td>null</td>
			<td>no</td>
			<td>A Function to call on onFocus</td>
		</tr>
		<tr>
			<td>onBlur</td>
			<td>Function</td>
			<td>null</td>
			<td>no</td>
			<td>A Function to call on onBlur</td>
		</tr>
	</tbody>
</table>
