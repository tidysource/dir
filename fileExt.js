'use strict';

var fileExt = function fileExt(filePath){
	var ext = /\.[^./]+$/.exec(filePath);
	if (ext === null){
		throw new Error ('Invalid filePath argument');
	}
	else{
		return ext[0];
	}	
}

module.exports = fileExt;
