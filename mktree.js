'use strict';

var fs = require('fs');
var sortPaths = require('./sortpaths.js');
var rmTree = require('./rmtree.js');

var mkTree = function mkTree(toPath, dirs, callback, i){
	if (typeof i !== 'number'){
		i = 0;
	}
	
	if(typeof toPath !== 'string'){
		throw new Error('Error: Invalid param - toPath must be a string');
	}
	
	if (dirs === 'string'){
		dirs = [dirs];
	}
	if (!dirs.length){
		throw new Error ('Error: Invalid param - dirs length is 0');
	}
	
	//Sort by depth (shallow first)
	if (i===0){
		dirs = sortPaths(dirs);
	}
		
	fs.mkdir(toPath+dirs[i], function(err){
		if (err){
			throw err;
		}
		i++;
		if (i<dirs.length){
			mkTree(toPath,dirs,callback,i);
		}
		else if (typeof callback === 'function'){
			callback();
		}
	});	
};

module.exports = mkTree;