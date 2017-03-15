'use strict';

var fs = require('tidyfs');
var path = require('tidypath');
var rmTrailing = require('rmtrailing');

var listDir = function listDir(paths, i, result){
	paths[i] = rmTrailing(paths[i], path.sep);
	return fs.stat(paths[i])
		.then(function(stats){
			if (stats.isFile()){
				result.files.push(paths[i]);
			}
			else if (stats.isDirectory()){
				result.dirs.push(paths[i]);
				return fs.readDir(paths[i]);
			}
			//else not a file nor dir
		})
		.then(function(dirContent){
			if (typeof dirContent !== 'undefined'){
				//all items in dirContent need to have preprend of the dir they came from
				for(var j=0; j<dirContent.length; ++j){
					paths.push([
								paths[i],
								path.sep,
								dirContent[j]
								].join(''));
				}
			}
			++i;
			if (i < paths.length){
				return listDir(paths, i, result);
			}
			else{
				return result;
			}
		})
};

var listTree = function listTree(paths, filter){
	if (typeof paths === 'string'){
		paths = [paths];
	}
	else if (!Array.isArray(paths)){
		throw new Error('Parameter dirs must be a string or an array of dir paths.');
	}
	
	var result = {
		files : [],
		dirs : []
	}
	
	var param = paths.slice();
	for(var i=0; i<param.length; ++i){
		param[i] = rmTrailing(param[i], path.sep);
	}
	
	return listDir(paths, 0, result)
			.then(function(result){	
				result.files = path.filter(result.files, filter);
				for(var i=result.files.length-1; i>-1; --i){
					if (param.indexOf(result.files[i]) > -1){
						result.files.splice(i, 1);
					}
				}
				for(var i=result.dirs.length-1; i>-1; --i){
					if (param.indexOf(result.dirs[i]) > -1){
						result.dirs.splice(i, 1);
					}
				}
				return result;
			});
};

module.exports = listTree;