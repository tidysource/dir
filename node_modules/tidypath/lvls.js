'use strict';

var rmTrailing = require('rmtrailing');

module.exports = function lvls(paths){
	var depths = [];
	var separatorStr = require('path').sep;
	var separator = RegExp(separatorStr, 'g');

	for(var i=0; i<paths.length; ++i){
		var path = paths[i]
		var cleanPath = rmTrailing(path, separatorStr);
		var depth = (cleanPath.match(separator) || []).length;

		if (!depths[depth]){ 
			depths[depth] = []; 
		}
		depths[depth].push(path);
	}
	
	if (!depths[0]){ 
		depths[0] = [];
	}
	
	return depths;
};