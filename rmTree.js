'use strict';

var rmDir = require('./rmDir.js');
var emptyTree = require('./emptyTree.js');

var rmTree = function rmTree(dirs){
	if (typeof dirs === 'string'){
		dirs = [dirs];
	}
	
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs.length; ++i){
		let dir = dirs[i];
		promiseChain = promiseChain
			.then(function(){
				return emptyTree(dir);	
			})
			.then(function(){
				return rmDir(dir);
			});
	}
	return promiseChain;
};

module.exports = rmTree;