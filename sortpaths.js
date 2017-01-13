//Sorts paths by depth (number of "/"), shallow first
var sortPaths = function sortPaths(paths){
	return paths.sort(function(a,b){
	var x = (a.match(/\//g)||[]).length;
	var y = (b.match(/\//g)||[]).length;
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
		//can't return 0 because a !== b (would be file name conflict)
		}
	});
};

module.exports = sortPaths;
