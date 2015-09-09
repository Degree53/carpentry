'use strict';

export default function(className) {
	
	return `
		
		.$component {
			position: relative;
		}
		
		.$component__table {
			display: table;
		}
		
		.$component__cell {
			display: table-cell;
		}
		
		.$component__input {
			cursor: default;
			text-overflow: ellipsis;
			vertical-align: middle;
		}
		
		.$component__button {
			cursor: pointer;
			display: inline-block;
			text-align: center;
			vertical-align: middle;
		}
		
		.$component__positioner {
			position: absolute;
			top: 100%; left: 50%;
			z-index: 1;
		}
		
		.$component__calendar {
			left: -50%;
			position: relative;
			text-align: center;
		}
		
		.$component__navbar {
			display: table;
			table-layout: fixed;
			width: 100%;
		}
		
		.$component__arrow,
		.$component__title {
			display: table-cell;
			text-align: center;
			vertical-align: middle;
		}
		
		.$component__arrow {
			cursor: pointer;
		}
		
		.$component__grid {
			display: table;
			table-layout: fixed;
		}
		
		.$component__head {
			display: table-row;
		}
		
		.$component__weekday {
			cursor: default;
			display: table-cell;
			text-align: center;
			vertical-align: middle;
		}
		
		.$component__row {
			display: table-row;
		}
		
		.$component__date {
			cursor: pointer;
			display: table-cell;
			text-align: center;
			vertical-align: middle;
		}
		
		.$component__today {
			cursor: pointer;
		}
		
	`.replace(/\$component/g, className);
}

 
