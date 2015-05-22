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
+ Structural styling can be configured (e.g. a hamburger menu button on the left or the right)
+ When necessary, components can nest other components

<br>

## Installation

Thanks to NPM it's super easy, just `npm install carpentry`.

<br>

## Usage

Carpentry is built to work with the Node.js `require()` function. All
components have an alias as listed in the table above. The
recommended way to access a component is via its alias:

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
			<td>Enforces input of a decimal value</td>
			<td>Unstable</td>
		</tr>
		<tr>
			<td><a href="#dateinput">DateInput</a></td>
			<td>Allows input of a Date object</td>
			<td>Unstable</td>
		</tr>
		<tr>
			<td>ResponsiveNav</td>
			<td></td>
			<td>Development</td>
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

**Key:** Stable - currently included, API is stable. Unstable - currently
included, API still under development. Development - not included, in
development. Planning - not yet in development.

<br>

### DecimalInput

Use this component to enforce input of a decimal value. `setDecimal`
should be a function that can set a value back to state or pass it to
an action. Using `decimal`, the component can also take a value for
conversion or display purposes. This can be useful for chaining multiple
inputs or applying your own validation. If `setDecimal` and `decimal`
are used together to create a loop it's advised to set `setOnChange` to
`false` to prevent strange behaviour whilst the user is inputting.

``` javascript
setDecimal: function(decimal) {
	Actions.updateDecimal(decimal);
},

render: function() {
	return (
		<MyDecimalInput
			className="MyDecimalInput"
			setDecimal={this.setDecimal} />
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
			<td>initDecimal</td>
			<td>Number</td>
			<td>0</td>
			<td>no</td>
			<td>The initial decimal value of the input</td>
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
			<td>decimal</td>
			<td>Number</td>
			<td>null</td>
			<td>no</td>
			<td>An incoming decimal value to set the input to (useful
				for	chaining inputs)</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>Boolean</td>
			<td>false</td>
			<td>no</td>
			<td>A Boolean for disabling access to the input</td>
		</tr>
		<tr>
			<td>setDecimal</td>
			<td>Function</td>
			<td>n/a</td>
			<td>yes</td>
			<td>A Function for setting the decimal value back to state
				or for passing it to an action</td>
		</tr>
		<tr>
			<td>setOnChange</td>
			<td>Boolean</td>
			<td>true</td>
			<td>no</td>
			<td>A Boolean for disabling calling setDecimal on onChange
				(use to prevent overwriting user input if placed in an
				update loop)</td>
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

###DateInput

This component is useful for allowing input of a `Date` object. `setDate`
should be a function that can set a `Date` back to state or pass it to
an action. `iconSrc` should be a relative path to an image file to be
used for the icon that users click to display the calendar.

``` javascript
setDate: function(date) {
	Actions.updateDate(date);
},

render: function() {
	return (
		<MyDateInput
			className="MyDateInput"
			setDate={this.setDate} />
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
			<td>initDate</td>
			<td>Date</td>
			<td>new Date</td>
			<td>no</td>
			<td>This initial date value of the input</td>
		</tr>
		<tr>
			<td>size</td>
			<td>Number</td>
			<td>10</td>
			<td>no</td>
			<td>The value to pass to the size attribute of the input</td>
		</tr>
		<tr>
			<td>iconSrc</td>
			<td>String</td>
			<td>n/a</td>
			<td>yes</td>
			<td>A String representing a relative path to the image to
				be used for the calendar icon</td>
		</tr>
		<tr>
			<td>format</td>
			<td>String</td>
			<td width="20%">'YYYY-MM-DD'</td>
			<td>no</td>
			<td>A String representing the format for displaying the
				selected date (see below)</td>
		</tr>
		<tr>
			<td>layout</td>
			<td>Number</td>
			<td>0</td>
			<td>no</td>
			<td>0 = icon displayed outside of input, 1 = icon displayed
				inside of input</td>
		</tr>
		<tr>
			<td>locale</td>
			<td>Object</td>
			<td>(see below)</td>
			<td>no</td>
			<td>An object with `dayNames`, `monthNames` and `today`
				properties for localisation</td>
		</tr>
		<tr>
			<td>firstDoW</td>
			<td>Number</td>
			<td>1</td>
			<td>no</td>
			<td>The first day of the week beginning with Sunday = 0,
				ending with Saturday = 6</td>
		</tr>
		<tr>
			<td>setDate</td>
			<td>function</td>
			<td>n/a</td>
			<td>yes</td>
			<td>A Function for setting the date value back to state
				or for passing it to an action</td>
		</tr>
	</tbody>
</table>
