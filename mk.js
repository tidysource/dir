'use strict';

var path = require('tidypath');
var mkFile = require('./mkFile.js');
var mkTree = require('./mkTree.js');

module.exports = function mk(param1, param2, param3){
	var files = [];
	var dirs = [];
	var items = [];
	var options;
	if (typeof param1 === 'string'){
		if (path.isFile(param1)){
			files.push({
				path : param1,
				content : param2,
				options : param3
			});
		}
		else{
			dirs.push(param1);
		}
	}
	else if (Array.isArray(param1)){
		items = param1;
	}
	else if (typeof param1 === 'object'){
		files.push(param1);
	}
	
	for(var i=0; i<items.length; ++i){
		let item = items[i];
		if (typeof item === 'object' 
		 || path.isFile(item)){
			files.push(item)
		}
		else{
			dirs.push(item);
		}	
	}
	
	return mkFile(files, param2, param3).then(function(){
		return mkTree(dirs);
	});
};