'use strict';

var fs = require('tidyfs');

var readDir = require('./readDir.js');
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

//Removes multiple dirs
var rmOnlyDir = function(dirs){
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

var rmDir = function rmDir(dirs, emptyDir){
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs.length; ++i){
		let dir = filePaths[i];
		promiseChain = readDir(dir)
			.then(function(tree){
				return Promise.all([
									tree,
									rmFile(tree.files)
									]);
			})
			.then(function(vals){
				var tree = vals[0];
				if (!emptyDir){			
					//Remove dir itself
					tree.dirs.push(dir);	
				}
				tree.dirs = sortPaths(tree.dirs);
				//<---remove doubles//can use a simple for
				return rmOnlyDir(tree.dirs);
			});
	}
	return promiseChain;
};

module.exports = rmDir;