'use strict';

var path = require('path');

module.exports = function dotfile(str){
	var dot = str.lastIndexOf('.');
	var slash = str.lastIndexOf(path.sep);
	
	if (slash + 1 === dot){
		return str.slice(dot);
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


