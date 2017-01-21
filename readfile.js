'use strict';

var fs = require('tidyfs');

/*
Description:
Reads files
For single file path returns single file obj for array of file paths returns array of file objects

@files - file object
@file.path - path must include filename and **extension**
@file.options - options (see fs.writeFile for node) - string (sets character encoding)|object|undefined(defaults to 'utf8', if you want the buffer obj put null as encoding)

Notes: 
- For non-text items you should set options = null or options.encoding = null
*/

var readFile = function readFile(param){
	//Conform and Validate params
	var files;
	if (typeof param === 'string'){
		files = [param];
	}
	else if (Array.isArray(param)){
		files = param;
	}
	else{
		throw new Error('dirs must be a string or array');
	}
	
	var fileData = [];
	var promiseChain = Promise.resolve();
	for(var i=0; i<files.length; ++i){
		let file = files[i];
		if (typeof file === 'string'){
			file = {
				path : file,
				options : 'uft8'
			}
		}
		//else assumes file is a file object
		promiseChain = promiseChain.then(function(){
			return fs.readFile(file.path, file.options);
		})
		.then(function(content){
			file.content = content;
			fileData.push(file);
		});
	}
	
	return promiseChain.then(function(){
		if (typeof param === 'string'){
			return fileData[0];
		}
		else{
			return fileData;
		}
	});
};

module.exports = readFile;