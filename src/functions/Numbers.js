'use strict';

export default {
	
	isNum(num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	}
	
};
