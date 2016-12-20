var fs = require("fs");

var listTree = function listTree(dirPath, callback, toCheck, i, files, dirs){
	if (typeof files === 'undefined'){
		files = [];
	}
	if (typeof dirs === 'undefined'){
		dirs = [];
	}
	if (typeof toCheck === 'undefined'){
		toCheck = [dirPath];
	}
	if (typeof i !== 'number'){
		i = 0;
	}
	
	var checkPath = toCheck[i];
	
	fs.stat(
		checkPath,
		function(err, stats){
			if (err){
				throw err;
			}
		
			if(stats.isDirectory()){
				dirs.push(checkPath);
				fs.readdir(
					checkPath, 
					function(err, dirItems){
						if (err){
							throw err;
						}
						for (var j=0; j<dirItems.length ;++j){
							toCheck.push(checkPath + '/' + dirItems[j]);
						}
						
						//Same as below file.push but have to double due to async
						++i;
						if (i<toCheck.length){
							listTree(dirPath, callback, toCheck, i, files, dirs);
						}
						else if(typeof callback === 'function'){
							callback(files, dirs);
						}
				});
			}
			else if(stats.isFile()){
				files.push(checkPath);
				
				//Same as after readdir but have to double due to readdir async
				++i;
				if (i<toCheck.length){
					listTree(dirPath, callback, toCheck, i, files, dirs);
				}
				else if(typeof callback === 'function'){
					callback(files, dirs);
				}
			}
			//else dirPath is not a directory nor file
	});
	
};

module.exports = listTree;