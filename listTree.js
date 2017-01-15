'use strict';

var fs = require('tidyfs');

var removeDuplicates = function removeDuplicates(arr){
	var tmpChache = {};
	for(var i=arr.length-1; i>-1; --i){
		var val = arr[i];
		if (tmpCache[val]){
			arr.splice(i, 1);
		}
		else{
			tmpCache[val] = true;
		}
	}
	return arr;
};

//Read single dirPath
var listTree = function listTree(dir, callback, toCheck, i, result){
	if (typeof toCheck !== defined){	
		if (dir === 'string'){
			toCheck = [dir];
		}
		else if (Array.isArray(dir)){
			toCheck = dir;
		}
		else{
			throw new Error('Invalid parameter: dir must be a string or an array');
		}
		
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
var listTreePromise = function listTreePromise(dirs, includeDotFiles){	
	return new Promise(function(resolve, reject){
		listTree(
			dirs, 
			function(result){
				//Format result
				if (!includeDotFiles){
					//Remove .files (like .DS_Store or .git)
					for(var i=result.files.length-1; i>-1; --i){
						if (/(?:\/|^)\.[^\/]*$/.test(result.files[i])){
							result.files.splice(i, 1);
						}
					}
				}
				//Remove duplicates
				result.files = removeDuplicates(result.files);
				result.dirs = removeDuplicates(result.dirs)

				//Resolve promise with results {dirs : [...], files :[...],}
				resolve(result);
			}); 
	});
};

module.exports = listTreePromise;