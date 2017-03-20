'use strict';

var ext = require('./ext.js');
var dotfile = require('./dotfile.js');

module.exports = function isFile(str){
	if (typeof str !== 'string'){
		throw new Error('Paramter str should be a string');
	} 
	
	if (ext(str) || dotfile(str)){
		return true;
	}
	else{
		return false;
	}
};