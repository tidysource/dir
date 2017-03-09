'use strict';

var path = require('path');
var dotfile = require('./dotfile.js');

module.exports = function treePath(str){
	if (str === ''){
		return str;
	}
	else if (str.indexOf('.') === -1){ //<--- whatabout a dotfolder?<--- maybe should check for filename?
		return str;
	}
	else{
		var dirname = path.dirname(str);
		if (dirname === '.'){
			if (str[0] !== '.'
			|| dotfile(str)){
				dirname = '';
			}
		}
		return dirname;
	}
	path.dirname;
};


