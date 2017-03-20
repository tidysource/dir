'use strict';

var path = require('path');

module.exports = function dotfile(str){
	var dot = str.lastIndexOf('.');
	var slash = str.lastIndexOf(path.sep);
	
	if (slash + 1 === dot){
		var result = str.slice(dot);
		if (result.length > 1){ //not '.'
			return str.slice(dot);
		}
		else{
			return '';
		}
	}
	else{
		return '';
	}
	/*
	Regex alternative: 
	(?:^|[\\\/\.])\.[^\\\/]+$ 
	Although should only include 
	separator, not escape character;
	just use new new RegExp() & path.sep
	*/
};


