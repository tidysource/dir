'use strict';

var path = require('path');

module.exports = function file(str){
	var filename = path.basename(str);
	
	if (filename.indexOf('.') > -1 
	 && str.slice(-1) !== path.sep){
		return filename;
	}
	else{
		return '';
	}	
};