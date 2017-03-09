'use strict';

/*
//Alternative
function ext(filePath){
	var ext = /\.[^./]+$/.exec(filePath);
	if (ext === null){
		throw new Error ('Invalid filePath argument');
	}
	else{
		return ext[0].toLowerCase();
	}
};
*/

//Just shorten the name of path.extname
var path = require('path');
module.exports = path.extname;