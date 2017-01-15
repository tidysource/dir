'use strict';

var fs = require('tidyfs');
var listTree = require('listTree');

var readTree = function readTree(dirs){
	return listTree(dirs)
		.then(function(tree){
			//reaturn tree and readFIles
			return Promise.all([
								Promise.resolve(tree),
								fs.readFile(tree.files)
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