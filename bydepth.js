'use strict';

//Helper for dynamic trailing substring
var rmTrailing = function rmTrailing(str, substr, flag){
	if (typeof str === 'undefined'){
		throw new Error('Invalid argument: str');
	}
	if (typeof substr === 'undefined'){
		throw new Error('Invalid argument: substr');
	}
	
	var regex;
	if (typeof flag === 'undefined'){
		regex = RegExp(substr + '$');
	}
	else{
		regex = RegExp(substr + '$', flag);
	} 
	return str.replace(regex, '');
}

//Returns files by depth or container dir
var byDepth = function byDepth(paths){
	var depths = [];
	for(var i=0; i<paths.length; ++i){
		var path = paths[i]
		var separator = require('path').sep;
		var cleanPath = rmTrailing(path, separator);
		separator = RegExp(separator, 'g');
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

module.exports = byDepth;
