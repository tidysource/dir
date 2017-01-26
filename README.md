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
[
'hello',
'foo/bar',
'hello/world',
'hello/world/tidy/'
]
*/
```
## Read

### readFile()
```javascript
var dir = require('tidydir');

var paths = [
	'./hello.js',
	'./foo/bar',
	'./hello/world.js',
	'./hello/world/tidy/'
]

//Will return an array of file objects
var fileObjects = dir.readFile(paths);

console.log(fileObjects[0]); //[{path : './hello.js', content: 'helloworld'}]

//A single file object
var fileObj = dir.readFile(paths);
console.log(fileObj); //{path : './hello.js', content: 'helloworld'}
```

### listTree()
```javascript
var dir = require('tidydir');

//For a given tree structure
var paths = [
	'./hello',
	'./hello/bar.js',
	'./hello/world.txt',
	'./hello/foo/
	'./hello/bar/code'
]

var treeList = dir.listTree('./hello');
console.log(treeList);
/*
{
dirs : ['./hello',
		'./hello/foo',
		'./hello/bar/code'],
files : ['./hello/bar.js',
		'./hello/world.txt',]
}
*/
```

### readTree()
Returns tree object.

```javascript
var tree = readTree('./');

tree.files //like readFile for all files within tree
tree.dirs //list of all dirs
```