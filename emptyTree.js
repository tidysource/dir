'use strict';

var readTree = require('./readTree.js');
var sortPaths = require('./sortpaths.js');
var rmFile = require('.rmFile.js');
var rmDir = require('.rmDir.js');

var rmTree = function rmTree(dirs, emptyDir){
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs.length; ++i){
		let dir = filePaths[i];
		promiseChain = readTree(dir)
			.then(function(tree){
				return Promise.all([
									tree,
									rmFile(tree.files)
									]);
			})
			.then(function(vals){
				var tree = vals[0];
				tree.dirs = sortPaths(tree.dirs);
				//<---remove doubles//can use a simple for
				return rmDir(tree.dirs);
			});
	}
	return promiseChain;
};

module.exports = rmTree;