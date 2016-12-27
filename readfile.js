'use strict';

var fs = require('fs');

//fromPath and toPath must include filename
var readFile = function readFile(filePaths, callback, i, filesRead){
	if (typeof i !== 'number'){
		i = 0;
	}
	
	if (filePaths === 'string'){
		filePaths = [filePaths];
	}
	if (!filePaths.length){
		throw new Error ('Error: Invalid param - filePaths length is 0');
	}
	
	if (i===0){
		filesRead = {};
	}
	
	//Readfile
	fs.readFile(
		filePaths[i],
		'utf8',
		function(err,txt){
			if (err){
				throw err;
			}	
			
			filesRead[filePaths[i]] = txt;
			
			++i;
			if (i<filePaths.length){
				readFile(filePaths, callback, i, filesRead);
			}
			else if (typeof callback === 'function'){
				callback(filesRead);
			}
	});
};

//Promisify readFile
var readFilePromise = function readFilePromise(filePaths) {
	return new Promise(function(resolve, reject){
		readFile(
			filePaths, 
			function(result){
				resolve(result);
			});
	});
};

module.exports = readFilePromise;
