'use strict';

var fs = require('tidyfs');
var mkTree = require('./mkTree.js');
var path = require('tidypath');

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
- overwrites existing files with same path (if file already exists at same path, it will overwrite it)
*/

/*
Possible params:
- path, content, options
- {path, content, options}, options 
- [{path,content,options}], options

options within object overrides param options
*/

var mkFile = function mkFile(param1, param2, param3){
	var files = [];
	var options;
	if (typeof param1 === 'string'){
		files.push({
			path : param1,
			content : param2,
			options : param3
		});
	}
	else if (Array.isArray(param1)){
		files = param1;
	}
	else if (typeof param1 === 'object'){
		files.push(param1);
		if (typeof param2 !== 'undefined'){
			options = param2;
		}
	}
	
	var dirs = [];
	for(var i=0; i<files.length; ++i){
		var file = files[i];
		var dir = path.tree(file.path);
		dirs.push(dir);
	}
	//Make any missing dirs
	var promiseChain = mkTree(dirs);
	
	//Make files
	for(var i=0; i<files.length; ++i){
		let file = files[i];
		
		//Set default options
		if (typeof file.options === 'undefined'){
			if (typeof options !== 'undefined'){
				file.options = options;
			}
			else{
				file.options = 'utf8';
			}
		}
		
		promiseChain = promiseChain
			.then(function(){
				return fs.mkFile(file.path, 
								file.content, 
								file.options);
			});				
	}
	
	return promiseChain;
};

module.exports = mkFile;