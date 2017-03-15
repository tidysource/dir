'use strict';

var path = require('tidypath');
var fs = require('tidyfs');

/*
Description:
Makes directiories, inclusing the necessary path. For example ./foo/bar/hello if foo/bar does not exists, it will make it. 
Returns a promise.
If directories exist returned promise will be resolved.
If it can't make any of the directiories, the returned promise will be rejected.

@dirs - paths of dirs | string,array 

Notes: 
- Paths may use either / or \
- if dir or any dirs in path exist already, there is no error thrown (since the desired result is already there)
*/

var mkTree = function mkTree(dirs){
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	dirs = path.byDepth(dirs);

	//Known existing dirs
	var existing = {};
	//var to enable promise chaining
	var promiseChain = Promise.resolve();
	
	for (var i=0; i<dirs.length; ++i){
		let dir = dirs[i];
		
		var subPaths = dir.split(path.sep);
		for(var j=0; j<subPaths.length; ++j){
			let subPath = subPaths.slice(0,j).join(path.sep);

			if (subPath.length){
				subPath += path.sep;
			}
			subPath += subPaths[j];
						
			if (!existing[subPath]){
				existing[subPath] = true;
				promiseChain = promiseChain.then(function(){
					return fs.mkDir(subPath);
				})
				.catch(function(err){
					if (err.errno === -17){ //err.code === 'EEXIST'
						return Promise.all([
											fs.stat(subPath),
											Promise.resolve(err)
											]);
					}
					else{
						throw err;
					}
				})
				.then(function(vals){
					if (vals){ //if above catch is invoked
						var stat = vals[0];
						var err = vals[1];
						if (!stat.isDirectory()){
							throw err;
						}
						//else dir exists	
					}
				});
			}
		}
	}
	
	return promiseChain;
};

module.exports = mkTree;