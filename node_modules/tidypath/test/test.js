'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tape');
var colorize = require('tap-colorize');
var colorizeOptions = {
	pass : '#B2D9B5',
	fail : '#FE5A4E',
	info : '#EEEEEE'
};
test.createStream()
	.pipe(colorize(colorizeOptions))
	.pipe(process.stdout);

//Module to test
var path = require('../index.js');

/*
Tests
=====
*/
test('lvls()', function(assert){	//<--- won't handle relative lvls, like ./ or ../ --> use path.resolve?
    assert.plan(3);
	
	var paths = [
		'hello',
		'foo/bar',
		'hello/world',
		'hello/world/tidy/'	
	]
	
	var depth = path.lvls(paths);

	assert.deepEqual(depth[0], ['hello']);
	assert.deepEqual(depth[1], ['foo/bar','hello/world']);
	assert.deepEqual(depth[2], ['hello/world/tidy/']);
});

test('byDepth()', function(assert){
    assert.plan(1);
	
	var paths = [
		'hello',
		'hello/world/foo/bar',
		'hello/world/tidy/', //ignores trailing separator
		'hello/world',
		'foo/bar'
	]
	
	var sorted = path.byDepth(paths);
	
	assert.deepEqual(sorted, 
					[
					'hello',
					'foo/bar',
					'hello/world',
					'hello/world/tidy/',	//won't remove trailing separator
					'hello/world/foo/bar'
					]);
});

test('ext()', function(assert){
    assert.plan(6);
	
	assert.equal(path.ext('foo.txt'), '.txt');
	assert.equal(path.ext('./foo.txt'), '.txt');
	assert.equal(path.ext('foo/bar.ver7.txt'), '.txt');
	assert.equal(path.ext('foo/bar'), '');
	assert.equal(path.ext('.txt'), '');
	assert.equal(path.ext('./.txt'), '');
});

test('rmExt()', function(assert){
    assert.plan(5);
	
	assert.equal(path.rmExt('foo.txt'), 'foo');
	assert.equal(path.rmExt('./foo.txt'), './foo');
	assert.equal(path.rmExt('foo/bar.ver7.txt'), 'foo/bar.ver7');
	assert.equal(path.rmExt('foo/bar'), 'foo/bar');
	assert.equal(path.rmExt('.txt'), '.txt');
});

test('dotfile()', function(assert){
    assert.plan(7);
	
	assert.equal(path.dotfile('foo.txt'), '');
	assert.equal(path.dotfile('./foo/bar'), '');
	assert.equal(path.dotfile('./foo.txt'), '');
	assert.equal(path.dotfile('foo/.bar/hello.txt'), '',
							'dotfolder');
	assert.equal(path.dotfile('foo/bar.ver7.txt'), '');
	assert.equal(path.dotfile('foo/.bar'), '.bar');
	assert.equal(path.dotfile('.txt'), '.txt');
});

test('file()', function(assert){
    assert.plan(10);
	
	assert.equal(path.file('foo.txt'), 'foo.txt');
	assert.equal(path.file('./foo.txt'), 'foo.txt');
	assert.equal(path.file('foo.ver100.txt'), 'foo.ver100.txt');
	assert.equal(path.file('foo/bar.txt'), 'bar.txt');
	assert.equal(path.file('foo/.bar/hello.txt'), 'hello.txt',
							'dotfolder');
	assert.equal(path.file('.bar/'), '',
							'dotfolder');
	assert.equal(path.file('foo/.bar/hello'), '',
							'dotfolder');
	assert.equal(path.file('.dotfile'), '.dotfile');
	assert.equal(path.file('foo/bar'), '')
	assert.equal(path.file(''), '');
});

test('tree()', function(assert){
    assert.plan(9);
	
	assert.equal(path.tree('./hello/world.txt'), './hello');
	assert.equal(path.tree('hello/world/foo.txt'), 'hello/world');
	assert.equal(path.tree('hello/world'), 'hello/world');		//--
	assert.equal(path.tree('hello/world/'), 'hello/world/');	//--- Should make triling slash uniform?
	assert.equal(path.tree('hello/world/.foo'), 'hello/world');	//--
	assert.equal(path.tree('./foo.txt'), '.');
	assert.equal(path.tree('foo.txt'), '');
	assert.equal(path.tree('.dotfile'), '');
	assert.equal(path.tree(''), '');
});


test('filter()', function(assert){
    assert.plan(5);
	
	var paths = [
		'hello.js',
		'hello/world.txt',
		'.dot',
		0
	];
	//Same as var path without 0
	var onlyStrings = paths.slice(0,-1);

	assert.deepEqual(path.filter('./hello.txt', '.txt'), ['./hello.txt']);
	assert.deepEqual(path.filter(paths, '.js'), ['hello.js']);
	assert.deepEqual(path.filter(paths, ['.js']), ['hello.js']);
	assert.deepEqual(path.filter(paths, path.dotfile), ['.dot']);
	assert.deepEqual(path.filter(paths), onlyStrings);
});