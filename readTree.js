'use strict';

var readFile = require('./readFile.js');
var listTree = require('./listTree.js');
var path = require('tidypath');

/*
path, options, filter
{path, options, filter}, options, filter
[path], options, filter
[{path, options, filter}], options, filter
*/

var readTree = function readTree(param1, param2, filter){
	var dirs = [];
	var options;
	if (typeof param1 === 'string'){
		dirs.push({path : param1})
	}
	else if (typeof param1 === 'object'
		&& !Array.isArray(param1)){
		dirs.push(param1);
	}
	else{
		dirs = param1;
	}
	//options vs filter
	if (typeof param2 === 'string'){
		if (param2 === 'dotifle'
		 || param2.slice(0,1) === '.'
		 || Array.isArray(param2)){
			 filter = param2;
		 }
	}
	else if (typeof param2 === 'function'
	 || Array.isArray(param2)){
		filter = param2;
	}
	else{
		options = param2;
	}
	
	var dirData = [];
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs.length; ++i){
		let dir = dirs[i];
		if (typeof dir === 'string'){
			dir = {path : dir};
		}
		//else dir should be object
		if (typeof dir.options === 'undefined'){
			if (typeof options !== 'undefined'){
				dir.options = options;
			}
			else{
				dir.options = 'utf8';
			}
		}
		if (typeof dir.filter === 'undefined'){
			if (typeof filter !== 'undefined'){
				dir.filter = filter;
			}
		}
		
		promiseChain = promiseChain.then(function(){
			return listTree(dir.path);
		})
		.then(function(tree){
			tree.files = path.filter(tree.files, dir.filter);
			//return tree and readFiles
			return Promise.all([
								Promise.resolve(tree),
								readFile(tree.files)
								]);
		})
		.then(function(vals){
			dirData.push({
						dirs : vals[0].dirs,
						files : vals[1]
						});
		});
	}
	
	return promiseChain.then(function(){
		if (!Array.isArray(param1)){ //string or object
			return dirData[0];
		}
		else{
			return dirData;
		}
	});
};

module.exports = readTree;