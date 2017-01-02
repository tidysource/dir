# Tidy Dir

## General
### .byDepth()
Returns an array of arrays of paths directory depth.
```javascript
var dir = require('tidydir');

var paths = [
	'hello',
	'foo/bar',
	'hello/world',
	'hello/world/tidy/'
]

var depth = dir.byDepth(paths);

console.log(depth[0]); //['hello']
console.log(depth[1]); //['foo/bar','hello/world']
console.log(depth[2]); //['hello/world/tidy/']
```

### .sortPaths()
Sorts paths by depth (deepest to shallowest) and alphanumerically within a single dir depth.
Note: to correctly sort within a single dir depth, **numbers should be left-padded by 0**

```javascript
var dir = require('tidydir');

var paths = [
	'hello',
	'hello/world/tidy/',
	'hello/world',
	'foo/bar'
]

var sorted = dir.sortPaths(paths);

console.log(sorted); 

/*
['hello/world/tidy/',
'foo/bar',
'hello/world',
'hello']
*/
```

