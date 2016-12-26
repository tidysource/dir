'use strict';

var listTree = require('./listtree.js');
var readFile = require('./readfile.js');

var readTree = function readTree(dir, callback){
	listTree(
		dir, 
		function(treePaths){
			//Ignore files like .DS_Store or .git
			for(var i=treePaths.length-1; i>-1; --i){
				//Remove .files (like .DS_Store or .git)
				if (/^\/?\..*/.test(treePaths[i])){
					treePaths.splice(i, 1);
				}
			}
			
			//Read tree files
			readFile(treePaths, callback);
		});
};

module.exports = readTree;