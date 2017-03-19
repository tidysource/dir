'use strict';

var fs = require('tidyfs');

//Removes multiple dirs (like rmTree, except it will fail on non-empty dirs)
var rmDir = function rmDir(dirs){
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs.length; ++i){
		let dir = dirs[i];
		promiseChain = promiseChain.then(function(){
			return fs.rmDir(dir);
		})
		.catch(function(err){
			//Ignore non-existent dirs
			if (err.code === 'ENOENT'){
				/*
				ENOENT:
				https://nodejs.org/api/errors.html#errors_common_system_errors
				*/
				return Promise.resolve();
			}
			else{
				return Promise.reject(err);
			}
		});
	}
	
	return promiseChain;
};

module.exports = rmDir;