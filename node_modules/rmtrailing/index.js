'use strict';

var rmTrailing = function rmTrailing(str, substr, flag){
	if (typeof str !== 'string'){
		throw new Error('Invalid argument: str');
	}
	if (typeof substr !== 'string'){
		throw new Error('Invalid argument: substr');
	}
	
	var regex;
	var pattern = '[' + substr + ']+$'
	if (typeof flag === 'undefined'){
		regex = RegExp(pattern);
	}
	else{
		regex = RegExp(pattern + '$', flag);
	} 
	return str.replace(regex, '');
}

module.exports = rmTrailing;
