// Even though we're using ES2015 transpiled to ES5 by Babel, this file needs
// to remain in CommonJS as it is the entry point for the NPM package.

module.exports = {
	CheckboxInput: require('./lib/checkbox-input').default,
	DateInput: require('./lib/date-input').default,
	DecimalInput: require('./lib/decimal-input').default,
	DialogBox: require('./lib/dialog-box').default
};
