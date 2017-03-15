'use strict';

var listTree = require('./listTree.js');
var path = require('tidypath');
var rmFile = require('./rmFile.js');
var rmDir = require('./rmDir.js');
var rmDuplicate = require('rmduplicate');

var rmTree = function rmTree(dirs, emptyDir){
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs.length; ++i){
		let dir = dirs[i];
		promiseChain = promiseChain.then(function(){
				return listTree(dir);
			})
			.then(function(tree){
				return Promise.all([
									Promise.resolve(tree),
									rmFile(tree.files)
									]);
			})
			.then(function(vals){
				var tree = vals[0];
				tree.dirs = path.byDepth(tree.dirs).reverse();
				tree.dirs = rmDuplicate(tree.dirs);
				return rmDir(tree.dirs);
			});
	}
	return promiseChain;
};

module.exports = rmTree;