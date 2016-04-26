export default function(className) {
	
	return `
		
		.$component {
			display: table;
		}
		
		.$component__cell {
			display: table-cell;
			text-align: center;
			vertical-align: middle;
		}
		
	`.replace(/\$component/g, className);
}

 
