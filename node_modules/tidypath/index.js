'use strict';

//Helper function
var avaliableProp = function(obj, prop){
	if (typeof obj[prop] !== 'undefined'){
		throw new Error ('Namespace conflict: ' + prop);
	}
}

var path = require('path');

avaliableProp(path, 'lvls');
path.lvls = require('./lvls.js');

avaliableProp(path, 'byDepth');
path.byDepth = require('./byDepth.js');

avaliableProp(path, 'ext');
path.ext = require('./ext.js');

avaliableProp(path, 'rmExt');
path.rmExt = require('./rmExt.js');

avaliableProp(path, 'file');
path.file = require('./file.js');

avaliableProp(path, 'dotfile');
path.dotfile = require('./dotfile.js');

avaliableProp(path, 'tree');
path.tree = require('./tree.js');

avaliableProp(path, 'filter');
path.filter = require('./filter.js');

avaliableProp(path, 'isFile');
path.isFile = require('./isFile.js');

module.exports = path;