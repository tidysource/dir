'use strict';

var rmTrailing = require('rmTrailing');
var byDepth = function pathByDepth(paths){
	return paths.sort(function(a,b){	
		var separator = require('path').sep;
		a = rmTrailing(a, separator);
		b = rmTrailing(b, separator);
		var rgx = RegExp(separator, 'g');
		var x = (a.match(rgx)||[]).length;
		var y = (b.match(rgx)||[]).length;
		if (x > y){
			return 1;
		}
		else if (x < y){
			return -1;
		}
		else{
			//return 0;
			
			//Sort by name (numbers should be left-padded by 0)
			var arr = [a, b];
			arr.sort();
			if (arr[0] === a){
			    return -1;
			}
			else{
			    return 1;
			}
			//Note: Can't return 0 because a !== b (would be file name conflict)
			}
		});
};

module.exports = byDepth;