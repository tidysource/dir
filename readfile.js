'use strict';

var fs = require('tidyfs');
var path = require('tidypath');;
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

/*
path, options, filter
{path, options}, options, filter
[path], options, filter
[{path, options}], options, filter
*/

var readFile = function readFile(param1, param2, filter){
	var files = [];
	var options;
	if (typeof param1 === 'string'){
		files.push({path : param1});
	}
	else if (typeof param1 === 'object'
		&& !Array.isArray(param1)){
		files.push(param1);
	}
	else{
		files = param1;
	}
	//options vs filter
	if (typeof param2 === 'string'){
		if (param2 === 'dotifle'
		 || param2.slice(0,1) === '.'){
			 filter = param2;
		 }
	}
	else if (typeof param2 === 'function'
	 || Array.isArray(param2)){
		filter = param2;
	}
	else{
		options = param2;
	}
	
	var fileData = [];
	var promiseChain = Promise.resolve();

	for(var i=0; i<files.length; ++i){
		let file = files[i];
		if (typeof file === 'string'){
			file = {path : file};
		}
		//else file should be object
		if (typeof file.options === 'undefined'){
			if (typeof options !== 'undefined'){
				file.options = options;
			}
			else{
				file.options = 'utf8';
			}
		}
		
		if (path.filter(file.path, filter).length){
			promiseChain = promiseChain.then(function(){
				return fs.readFile(file.path, file.options);
			})
			.then(function(content){
				file.content = content;
				fileData.push(file);
			});	
		}
	}
	
	return promiseChain.then(function(){
		if (!Array.isArray(param1)){//string or object
			return fileData[0];
		}
		else{
			return fileData;
		}
	});
};

module.exports = readFile;