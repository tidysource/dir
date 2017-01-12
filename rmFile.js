'use strict';

var fs = require('tidyfs');

var sortPaths = require('./sortpaths.js');

var rmFile = function rmFile(filePaths){
	if (typeof filePaths === 'string'){
		filePaths = [filePaths];
	}
	
	var promiseChain = Promise.resolve();
	for(var i=0; i<filePaths.length; ++i){
		let filePath = filePaths[i];
		promiseChain = promiseChain.then(function(){
			return fs.rmFile(filePath);
		})
		.catch(function(err){
			//Ignore non-existent dirs
			if (err.code === 'ENOENT'){
				//ENOENT: https://nodejs.org/api/errors.html#errors_common_system_errors
				return Promise.resolve();
			}
			else{
				return Promise.reject(err);
			}
		});
	}
	return promiseChain;
};

module.exports = rmFile;
