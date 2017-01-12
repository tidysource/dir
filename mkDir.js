'use strict';

var dirSep = require('path').sep;
var sortPaths = require('./sortpaths.js');
var fs = require('tidyfs');

/*
Description:
Makes directiories, inclusing the necessary path. For example ./foo/bar/hello if foo/bar does not exists, it will make it. 
Returns a promise.
If directories exist returned promise will be resolved.
If it can't make any of the directiories, the returned promise will be rejected.
	
@toPath - path to which the dirs are relative (path prepend for each dir) | string, undefined (defaults to empty string)
@dirs - paths of dirs | string,array 

Notes: 
- Paths may use either / or \
- if dir or any dirs in path exist already, there is no error thrown (since the desired result is already there)
*/

var mkDir = function mkDir(toPath, dirs){
	//Validate params
	if (arguments.length === 1){
		toPath = '';
	}
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	else if (typeof dirs !== 'undefined' && dirs.length){
		//Sort dirs by depth (shallow first)
		dirs = sortPaths(dirs);
	}
	else{
		throw new Error('dirs must be a string or array');
	}

	//Known existing dirs
	var existing = {};
	//var to enable promise chaining
	var promiseChain = null;
	
	for (var i=0; i<dirs.length; ++i){
		let dir = toPath + dirs[i];
		
		var subPaths = dir.split(dirSep);

		for(var j=0; j<subPaths.length; ++j){
			let subPath = subPaths.slice(0,j).join(dirSep);
			if (subPath.length){
				subPath += dirSep;
			}
			subPath += subPaths[j];
						
			if (!existing[subPath]){
				if (promiseChain === null){
					promiseChain = fs.stat(subPath);
				}
				else{
					promiseChain = promiseChain.then(function(){
						return fs.stat(subPath);
					});
				}
				promiseChain = promiseChain
									.then(
										function(stats){
											//Something else is there
											if (!stats.isDirectory()){
												//attempt to make dir anyway
												return fs.mkDir(subPath);
											}
											//else dir exists
										}, 
										function(err){
											//Dir does not exist
											if (err.errno === -2){
												//Create it
												return fs.mkDir(subPath);
											}
											//Something else went wrong
											else{
												throw err;
											}
										})
									.then(function(){
										existing[subPath] = true;
									});
			}
		}
	}
	
	return promiseChain;
};

module.exports = mkDir;