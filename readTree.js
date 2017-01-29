'use strict';

var readFile = require('./readFile.js');
var listTree = require('listTree');

var readTree = function readTree(dirs, includeDotFiles){
	return listTree(dirs, includeDotFiles)
		.then(function(tree){
			//reaturn tree and readFIles
			return Promise.all([
								Promise.resolve(tree),
								readFile(tree.files)
								]);
		})
		.then(function(vals){
			return {
				dirs : vals[0].dirs,
				files : vals[1]
			}
		});
};

module.exports = readTree;