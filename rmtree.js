'use strict';

var fs = require('fs');

var listTree = require('./listtree.js');
var sortPaths = require('./sortpaths.js');

var rmFile = function rmFile(filePaths, callback, fileIndex){
	if (typeof fileIndex !== 'number'){
		fileIndex = 0;
	}

	if (filePaths === 'string'){
		filePaths = [filePaths];
	}
	if (!filePaths.length){
		throw new Error ('Error: Invalid param - filePaths length is 0');
	}
	
	//Prevent from unlink of . or /
	if (filePaths[fileIndex].length<1){
		throw new Error('Error: Invalid path - to short');
	}
	
	fs.unlink(filePaths[fileIndex], function(err){
		if (err){
			throw err;
		}
		++fileIndex;
		if (fileIndex < filePaths.length){
			rmFile(filePaths, callback, fileIndex);			
		}
		else if (typeof callback === 'function'){
			callback();
		}
	});
};

var rmDir = function rmDir(dirPaths, callback, dirIndex){
	if (typeof dirIndex !== 'number'){
		dirIndex = 0;
	}

	if (dirPaths === 'string'){
		dirPaths = [dirPaths];
	}
	if (!dirPaths.length){
		throw new Error ('Error: Invalid param - dirPaths length is 0');
	}
	
	//Prevent dir from being . or /
	if (dirPaths[dirIndex].length<1){
		throw new Error('Error: Invalid path - to short');
	}
	
	fs.rmdir(dirPaths[dirIndex], function(err){
		if (err){
			throw err;
		}
		++dirIndex;
		if (dirIndex < dirPaths.length){
			rmDir(dirPaths, callback, dirIndex);
		}
		else if (typeof callback === 'function'){
			callback();
		}
	});
};


var rmTree = function(rmPath, callback){
	listTree(rmPath, function(files, dirs){	
		//Remove files
		rmFile(files, function(){
			//Sort dirs by depth (deepest to least)
			dirs = sortPaths(dirs).reverse();
			
			//Remove dirs
			rmDir(dirs, function(){
				if (callback){
					callback();
				}
			});
		});
	});
};

module.exports = rmTree;
