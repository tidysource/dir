'use strict';

var fs = require('fs');
var rmTree = require('./rmtree.js');

var doCalls = function doCalls(dirPath, callback, i){
	++i;
	if (i<dirPath.length){
		cleanTree(dirPath, callback, i);
	}
	else if (typeof callback === 'function'){
		callback();
	}
}

var cleanTree = function cleanTree(dirPath, callback, i){
	if (typeof i !== 'number'){
		i = 0;
	}
	
	if (dirPath === 'string'){
		dirPath = [dirPath];
	}
	
	if (!dirPath.length){
		throw new Error ('Error: Invalid param - dirs length is 0');
	}
	
	fs.stat(
		dirPath[i], 
		function(err, stats){
			if (err){
				if(!/no such file or directory/.test(err.message)){
					throw err;	
				}
				//else nothing to delete
			}
			
			if(typeof stats !== 'undefined'){
				if (!stats.isDirectory()){
					throw new Error('Error: Invalid param - dirPath[i] should be a directory')	
				}				
				rmTree(
						dirPath[i], 
						function(){
							doCalls(dirPath, callback, i);
						});
			}
			else{
				//else nothing to delete
				doCalls(dirPath, callback, i)	
			}
	});
};

//Promisify cleanTree
var cleanTreePromise = function cleanTreePromise(dirPath) {
	return new Promise(function(resolve, reject) {
		cleanTree(
			dirPath, 
			function(){
				resolve();
			});
	});
};

module.exports = cleanTreePromise;