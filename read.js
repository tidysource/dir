'use strict';

var path = require('tidypath');
var readFile = require('./readFile.js');
var readTree = require('./readTree.js');

module.exports = function read(param1, param2, filter){
	var items = [];
	var options;
	if (typeof param1 === 'string'){
		items.push({path : param1})
	}
	else if (typeof param1 === 'object'
		&& !Array.isArray(param1)){
		items.push(param1);
	}
	else{
		items = param1;
	}
	//options vs filter
	if (typeof param2 === 'string'){
		if (param2 === 'dotifle'
		 || param2.slice(0,1) === '.'){
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

	var data = [];
	var promiseChain = Promise.resolve();
	for(var i=0; i<items.length; ++i){
		let item = items[i];
		if (typeof item === 'string'){
			item = {path : item};
		}
		//else item should be object
		
		if (typeof item.path === 'undefined'){
			throw new Error('Invalid parameter');
		}
		if (path.isFile(item.path)){
			promiseChain = promiseChain.then(function(){
				return readFile(item, filter);
			});
		}
		else{//it's dir
			promiseChain = promiseChain.then(function(){
				return readTree(item, filter);
			});
		}
		
		promiseChain = promiseChain.then(function(result){
			if (typeof result !== 'undefined'){	//[1]
				data.push(result);
			}
		});
	}
	
	return promiseChain.then(function(){
		if (!Array.isArray(param1)){ //string or object
			return data[0];
		}
		else{
			return data;
		}
	});	
};

/*
NOTES
=====
[1]:
undefined results means item was filtered 
out with direct call so we remove them
*/