'use strict';

var fs = require('fs');

//fromPath and toPath must include filename
var cloneFile = function cloneFile(files, callback, i){
	if (typeof i !== 'number'){
		i = 0;
	}
	
	if (files === 'string'){
		files = [files];
	}
	if (!files.length){
		throw new Error ('Error: Invalid param - files length is 0');
	}
	
	var fileObj = files[i];
	
	if(typeof fileObj.fromPath !== 'string'){
		throw new Error('Error: Invalid param - file.fromPath must be a string');
	}
	if(typeof fileObj.toPath !== 'string'){
		throw new Error('Error: Invalid param - file.toPath must be a string');
	}
	
	//Readfile
	fs.readFile(
		fileObj.fromPath,
		'utf8',
		function(err,txt){
			if (err){
				throw err;
			}	
			//Parse content
			if (typeof fileObj.parser === 'function'){
				var parsed = fileObj.parser(txt, fileObj.fromPath, fileObj.toPath);
				if (parsed.path){
					txt = parsed.txt;
					fileObj.toPath = parsed.toPath;
				}
				else{
					txt = parsed;
				}
			}
			//Write file
			fs.writeFile(
				fileObj.toPath,
				txt,
				function(err){
					if (err){
						throw err;
					}
					else{
						++i;
						if (i<files.length){
							cloneFile(files, callback, i);
						}
						else if (typeof callback === 'function'){
							callback();
						}
					}
			});
	});
};

module.exports = cloneFile;
