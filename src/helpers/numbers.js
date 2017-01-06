export default {
	
	isNum (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},

	toFixed (dec, exp) {
		return Number(Math.round(dec + 'e' + exp) + 'e-' + exp).toString();
	}
	
};
