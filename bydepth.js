'use strict';

//Returns files by depth or container dir
var byDepth = function byDepth(dirs){
	var depths = [];
	for(var i=0; i<dirs.length; ++i){
		var depth = (dirs[i].match(/\//g) || []).length;

		if (!depths[depth]){ 
			depths[depth] = []; 
		}
		depths[depth].push(dirs[i]);
	}
	
	if (!depths[0]){ 
		depths[0] = [];
	}
	return depths;
};

module.exports = byDepth;
