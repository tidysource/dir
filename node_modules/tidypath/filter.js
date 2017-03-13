'use strict';

var pathExt = require('./ext.js');

module.exports = function filter(paths, filters, param3){
	var paths = paths.slice();
	var whitelist = true;
	if (param3 === false){
		whitelist = false;
	}
	var keep;
	if (!Array.isArray(paths)){
		paths = [paths];
	}
	if (typeof filters === 'string'){
		filters = [filters];
	}
	if (Array.isArray(filters)){
		keep = function keep(path){
			var ext = pathExt(path);
			if (filters.indexOf(ext) > -1){
				return true;
			}
			else{
				return false;
			}
		}
	}
	else if (typeof filters === 'function'){
		keep = filters;
	}
	else{
		keep = function keep(){
			return true;
		};
	}
	
	for(var i=paths.length-1; i>-1; --i){
		var path = paths[i];
		
		if (typeof path !== 'string'){
			paths.splice(i, 1);
		}
		else{
			if (whitelist && !keep(path)){
			 	paths.splice(i, 1);
			}
			else if (!whitelist && keep(path)){
				paths.splice(i, 1);
			}
		}		
	}
		
	return paths;
};