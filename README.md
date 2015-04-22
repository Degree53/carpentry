# Carpentry

**Carpentry** is a library of highly customisable React components. The
functionality and layout of each component is designed to be configurable
via an API using React props. All other styling is left to the developer.
<br><br>

## Rationale

Working to different style guides on different projects often means highly
opinionated / pre-styled components can't be used. Developers can often reuse
functionality but not styling even though the designs they are given usually
conform to common user interface trends. All Carpentry components are designed
to solve this problem by sticking to the following points:

+ Components are functionally specialised, doing one job and doing it well
+ Components can have their functionality configured easily via an API using
	React props
+ Components have only structural styling included (no colours, fonts, padding
	etc.)
+ Structural styling is configurable (e.g. a hamburger menu button can be on
	the left or the right)
+ When necessary, components can nest other components
<br><br>

## Installation

Thanks to NPM it's super easy, just `npm install carpentry`.
<br><br>

## Components

<table>
	<thead>
		<tr>
			<th>Currently included</th>
			<th>In development</th>
			<th>Future development</th>
		</tr>
	</thead>
	<tbody>
		<tr style="vertical-align:top">
			<td>[DecimalInput](#DecimalInput)</td>
			<td>DateInput</td>
			<td>ResponsiveNav
			<br>PasswordInput</td>
		</tr>
	</tbody>
</table>
<br>

## Usage

Carpentry is built to work with the Node.js `require()` function. All
components have an alias which are listed in the table above. The
recommended way to access a component is via its alias:

``` javascript
var MyDecimalInput = require('carpentry').DecimalInput;
```
<br>

### DecimalInput

Use this component to enforce input of a decimal value. It should be placed
in a cycle where `value` is updated with the stored value and `setValue` is
a function that can set a new value back to storage.

``` javascript
var MyDecimalInput = require('carpentry').DecimalInput;

...

return (
	<MyDecimalInput
		value={this.state.value}
		disabled={false}
		setValue={this.setValue} />
);
```

Property | Type | Default | Return | Required | Description
-|-|-|-|-|-
value | Number | n/a | n/a |  yes | Value of the input coming from your storage (set a default value in your storage)
disabled | Boolean | false | n/a |  no | Boolean for disabling access to the input
setValue | Function | n/a | Number |  yes | Function for setting the new value back to your storage
