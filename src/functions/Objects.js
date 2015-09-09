'use strict';

export default {
	
	toTypeString(object) {
		const classString = Object.prototype.toString.call(object);
		return classString.slice(8, -1).toLowerCase();
	}
	
};
