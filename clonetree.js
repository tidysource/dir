'use strict';

var fs = require('fs');

var byDepth = require('./bydepth.js');
var listTree = require('./listtree.js');
var cleanTree = require('./cleantree.js');
var mkTree = require('./mktree.js');
var cloneFile = require('./clonefile.js');

var cloneTree = function cloneTree(fromPath,toPath,parser,callback){
	listTree(
		'./_content', 	//is tree we want to clone
		function(files, dirs){
			//-----Get file data ready-----
			for(var i=files.length-1; i>-1; --i){
				//Remove .files (like .DS_Store or .git)
				if (/\/\..*$/.test(files[i])){
					files.splice(i, 1);
				}
			}
			
			var rgx = new RegExp('^' + fromPath); 

			//Make clone objects
			for(var i=0; i<files.length; ++i){
				var obj = {
					fromPath : files[i],
					toPath : files[i].replace(rgx, toPath),
				};
				if (parser){
					obj.parser = parser;
				}
				files[i] = obj;
			}
			
			//-----Get dirs data ready-----
			for(var i=dirs.length-1; i>-1; --i){
				//Remove the content folder prepend
				dirs[i] = dirs[i].replace(rgx, toPath);
				
				//Prevent copy of . or / or something
				if (!/^[A-z0-9-_]/.test(dirs[i])){
					dirs.splice(i, 1);	
				}
			}
			
			//-----Remove existing folders-----
			cleanTree(
				byDepth(dirs)[1],
				function(){
					//-----Actually do cloning-----
					//Replicate folder structure
					mkTree('', dirs, function(){
						//Write files
						cloneFile(files, function(){
							if (typeof callback === 'function'){
								callback();
							}
						});	
					});			
				});	
			
	});
};

module.exports = cloneTree;
