# TidyPath
Extend native nodeJS path module

## How to use

### Prerequisite

#### Node JS
https://nodejs.org/

### Example
#### lvls()
Returns an array of arrays.
Each array represents a lvl (depth) of path (number of path separators).
Shallow to deepest level.
```javascript
var path = require('tidypath');

var paths = [
	'hello',
	'foo/bar',
	'hello/world',
	'hello/world/tidy/'	
]

path.lvls(paths);
/*
[
	['hello'],
	['foo/bar','hello/world'],
	['hello/world/tidy/'],
];
```

#### byDepth()
Returns paths by depth (number of path separators).
Shallow to deepest.
```javascript
var path = require('tidypath');

var paths = [
		'hello',
		'hello/world/foo/bar',
		'hello/world/tidy/', //ignores trailing separator
		'hello/world',
		'foo/bar'
	]
	
path.byDepth(paths);
/*
[
'hello',
'foo/bar',
'hello/world',
'hello/world/tidy/',	//won't remove trailing separator
'hello/world/foo/bar'
]);
*/
```

#### ext()
Returns file extension.
```javascript
var path = require('tidypath');

path.ext('foo.txt') //'.txt'
path.ext('foo/bar.ver7.txt') //'.txt'
path.ext('foo/bar') //''
path.ext('.txt') //''
```

#### rmExt()
//Removes file extension from path.
```javascript
var path = require('tidypath');

path.rmExt('foo.txt') //'foo'
path.rmExt('foo/bar.ver7.txt') //'foo/bar.ver7'
path.rmExt('foo/bar') //'foo/bar'
path.rmExt('.txt') //'.txt'
```

#### file()
Returns file name (including file extension).
```javascript
var path = require('tidypath');

path.file('foo.txt') //'foo.txt'
path.file('./foo.txt') //'foo.txt'
path.file('foo.ver100.txt') //'foo.ver100.txt'
path.file('foo/bar.txt') //'bar.txt'
path.file('foo/.bar/hello.txt') //'hello.txt'
path.file('.bar/') //''
path.file('foo/.bar/hello') //''
path.file('.dotfile') //'.dotfile'
path.file('foo/bar') //''
path.file('') //''
```

#### dotfile()
Returns dotfile in path.
```javascript
var path = require('tidypath');

path.dotfile('foo.txt') //''
path.dotfile('./foo/bar') //''
path.dotfile('./foo.txt') //''
path.dotfile('foo/.bar/hello.txt') //''
path.dotfile('foo/bar.ver7.txt') //''
path.dotfile('foo/.bar') //'.bar'
path.dotfile('.txt') //'.txt'
```
#### tree()
Returns directory of path.
```javascript
var path = require('tidypath');

path.tree('./hello/world.txt') //'./hello'
path.tree('hello/world/foo.txt') //'hello/world'
path.tree('hello/world') //'hello/world'
path.tree('hello/world/') //'hello/world/'
path.tree('hello/world/.foo') //'hello/world'
path.tree('./foo.txt') //'.'
path.tree('foo.txt') //''
path.tree('.dotfile') //''
path.tree('') //''
```

#### filter()
Returns a subset based on filter.
Filter can be file extension as string 
or array of strings, 
or filter can be a function.
```javascript
var path = require('tidypath');
var paths = [
		'hello.js',
		'hello/world.txt',
		'.dot',
		0
	];
	
path.filter('./hello.txt', '.txt');	//['./hello.txt']
path.filter(paths, '.js');	//['hello.js']
path.filter(paths, ['.js']);	//['hello.js']
path.filter(paths, path.dotfile);	//['.dot']
path.filter(paths);	//['hello.js','hello/world.txt','.dot']
path.filter(paths, '.js', false);	//['hello.js','hello/world.txt','.dot',0];
```

#### isFile()
Returns true/false path is a file 
(either has a file extension or is a dotfile).
```javascript
path.isFile('./hello/world.txt')	//true
path.isFile('hello/world/foo.txt')	//true
path.isFile('hello/world')	//false
path.isFile('hello/world/.foo')	//true
path.isFile('./foo.txt')	//true
path.isFile('foo.txt')	//true
path.isFile('.dotfile')	//true
path.isFile('./')	//false
path.isFile('.')	//false
path.isFile('')	//false
```