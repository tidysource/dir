'use strict';

var listTree = require('./listTree.js');
var sortPaths = require('./sortpaths.js');
var rmFile = require('.rmFile.js');
var rmDir = require('.rmDir.js');
var removeDuplicates = require('./removeDuplicates.js');

var rmTree = function rmTree(dirs, emptyDir){
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs.length; ++i){
		let dir = filePaths[i];
		promiseChain = listTree(dir)
			.then(function(tree){
				return Promise.all([
									Promise.resolve(tree),
									rmFile(tree.files)
									]);
			})
			.then(function(vals){
				var tree = vals[0];
				tree.dirs = sortPaths(tree.dirs);
				tree.dirs = removeDuplicates(tree.dirs);
				return rmDir(tree.dirs);
			});
	}
	return promiseChain;
};

module.exports = rmTree;