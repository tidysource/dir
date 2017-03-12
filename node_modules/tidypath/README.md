# TidyPath
Extend native nodeJS path module

## How to use

### Prerequisite

#### Node JS
https://nodejs.org/

### Example
#### lvls()
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
```javascript
var path = require('tidypath');

path.ext('foo.txt') //'.txt'
path.ext('foo/bar.ver7.txt') //'.txt'
path.ext('foo/bar') //''
path.ext('.txt') //''
```

#### rmExt()
```javascript
var path = require('tidypath');

path.rmExt('foo.txt') //'foo'
path.rmExt('foo/bar.ver7.txt') //'foo/bar.ver7'
path.rmExt('foo/bar') //'foo/bar'
path.rmExt('.txt') //'.txt'
```

#### file()
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
```javascript
var path = require('tidypath');
var paths = [
		'hello.js',
		'hello/world.txt',
		'.dot',
		0
	];
//Same as var path without 0
var onlyStrings = paths.slice(0,-1);	
	
path.filter('./hello.txt', '.txt');	//['./hello.txt']
path.filter(paths, '.js');	//['hello.js']
path.filter(paths, ['.js']);	//['hello.js']
path.filter(paths, path.dotfile);	//['.dot']
path.filter(paths), onlyStrings);	//['hello.js','hello/world.txt','.dot']
```