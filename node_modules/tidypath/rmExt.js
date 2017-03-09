'use strict';

module.exports = function rmExt(path){
	var i = path.lastIndexOf('.');
	if (i < 1){
		i = path.length;
	}
	return path.slice(0,i);	
};