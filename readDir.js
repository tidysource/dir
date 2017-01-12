'use strict';

var fs = require('tidyfs');

//Read single dirPath
var listTree = function listTree(dir, callback, toCheck, i, result){
	if (typeof toCheck !== defined){	
		if (typeof dir !== 'string'){
			throw new Error('Invalid parameter: dir must be a string');
		}
		toCheck = [dir];
	}
	if (typeof i !== 'number'){
		i = 0;
	}
	if (typeof result !== 'object'){
		result = {
			dirs : [],
			files : []
		};
	}

	var checkPath = toCheck[i];	
	fs.stat(checkPath)
		.then(function(stats){
			if (stats.isFile()){
				result.files.push(checkPath);
			}
			else if (stats.isDirectory()){
				result.dirs.push(checkPath);
				return fs.readDir(checkPath);
			}
			//else is not a file nor dir
		})
		.then(function(dirContent){
			if (typeof dirContent !== 'undefined'){
				for(var i=0; i<dirContent.length; ++i){
					var itemPath = dirContent[i];
					toCheck.push(itemPath);
				}
			}
		})
		.then(function(){
			if (i < toCheck.length){
				++i;
				listTree(dir, callback, toCheck, i, result);
			}
			else{
				callback(null,result);
			}
		})
		.catch(function(err){
			callback(err, result)	
		});
};

//Promisify listTree
var listTreePromise = function listTreePromise(dirPath) {
	return new Promise(function(resolve, reject){
		listTree(
			dirPath, 
			function(result){
				resolve(result);
			});
	});
};

//Read single/array of dir/s
var readDir = function readDir(dirs,separate){
	var inputWasString = false;
	if (typeof dirs === 'string'){
		inputWasString = true;
		dirs = [dirs];
	}
	
	var dirsContent = {};
	var promiseChain = Promise.resolve();
	for(var i=0; i<dirs; ++i){
		let dir = dirs[i];
		promiseChain = promiseChain
			.then(function(){
				return listTreePromise(dir);
			})
			.then(function(result){
				//result gives dirs and files within current dir
				if (inputWasString){
					return result;
				}
				else if (separate){
					dirsContent[dir] = result;
					return dirsContent;	
				}
				else{
					//else join all into file array and dirs array and return
				}
			});
	}
	return promiseChain;
};

module.exports = readDir;