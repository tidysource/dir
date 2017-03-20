'use strict';

var path = require('tidypath');
var rmFile = require('./rmFile.js');
var rmTree = require('./rmTree.js');

module.exports = function rm(removePaths){
	if (typeof removePaths === 'string'){
		removePaths = [removePaths];
	}
	else if (!Array.isArray(removePaths)){
		throw new Error('Parameter remove paths should be a string or an array');
	}

	var dirs = [];
	var files = [];
	
	for(var i=0; i<removePaths.length; ++i){
		var str = removePaths[i];
		
		if (path.isFile(str)){
			files.push(str);
		}
		else{ //assume it's a tree
			dirs.push(str);
		}
	}
	
	return rmFile(files).then(function(){
		return rmTree(dirs);
	});
};