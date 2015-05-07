'use strict';

module.exports = {
	
	merge: function(objArray) {
		var newObj = {};
		
		for (var o in objArray) {
			var obj = objArray[o];
			
			for (var p in obj) {
				newObj[p] = obj[p];
			}
		}
		
		return newObj;
	}
	
};
