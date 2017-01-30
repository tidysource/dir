'use strict';

module.exports = function rmExt(path){
	return path.slice(0,path.lastIndexOf('.'));	
};
