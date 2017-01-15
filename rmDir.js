'use strict';

var fs = require('tidyfs');

var sortPaths = require('./sortpaths.js');
var rmFile = require('.rmFile.js');

var path = require('path');
var pathGuard = function pathGuard(paramPath){
	var currentPath = path.resolve('./');
	paramPath = path.resolve(paramPath);
	
	if (currentPath.indexOf(paramPath) === 0){
		throw new Error('Can not delete container path ' + paramPath);
	}
};

//Removes multiple dirs (like rmTree, except it will fail on non-empty dirs)
var rmDir = function(dirs){
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs.length; ++i){
		let dir = filePaths[i];
		pathGuard(dir);
		promiseChain = promiseChain.then(function(){
			return fs.rmDir(dir);
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
});

module.exports = rmDir;