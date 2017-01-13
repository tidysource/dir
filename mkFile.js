'use strict';

var dirSep = require('path').sep;
var fs = require('tidyfs');
var mkTree = require('./mkTree.js');

/*
Description:
Makes files, including the necessary path.

@files - file object
@file.path - path must include filename and **extension**
@file.content - content of the file - string
@file.options - options (see fs.writeFile for node) - string (sets character encoding)|object|undefined(defaults to 'utf8', if you want the buffer obj put null as encoding)

Notes: 
- Paths may use either / or \
- it will make any missing dirs in the filepath
*/


var fileDir = function fileDir(filePath){
	var fileName = new RegExp('[^' + dirSep + ']\\.[\\w]+$');
	if (!fileName.test(filePath)){
		throw new Error('Invalid file path:' + filePath);
	}
	else{
		return filePath.replace(fileName, '');
	}
};

var mkFile = function mkFile(files){
	//Conform and Validate params
	if (typeof files === 'string'){
		files = [files];
	}
	if (typeof files === 'undefined' || files.length){
		throw new Error('dirs must be a string or array');
	}
	
	var dirs = [];
	for(var i=0; i<files.length; ++i){
		var file = files[i];
		var dir = fileDir(file.path);
		dirs.push(dir);
	}
	//Make any missing dirs
	var promiseChain = mkTree(dirs);
	
	//Make files
	for(var i=0; i<files.length; ++i){
		let file = files[i];
		
		if (typeof file.content !== 'string'){
			throw new Error('file content must be a string');
		}
		
		if (typeof file.options === 'undefined'){
			file.options = 'utf8';
		}
		
		promiseChain = fs.writeFile(file.path, 
									file.content, 
									file.options);
	}
	
	return promiseChain;
};

module.exports = mkFile;