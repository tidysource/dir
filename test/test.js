'use strict';

var test = require('tape');
var colorize = require('tap-colorize');
var colorizeOptions = {
	pass : '#B2D9B5',
	fail : '#FE5A4E',
	info : '#EEEEEE'
};
test.createStream().pipe(colorize(colorizeOptions)).pipe(process.stdout);

var dir = require('../index.js');

test('byDepth()', function (assert) {
    assert.plan(3);
	
	var paths = [
		'hello',
		'foo/bar',
		'hello/world',
		'hello/world/tidy/'
	]
	
	var depth = dir.byDepth(paths);

	assert.deepEqual(depth[0], ['hello']);
	assert.deepEqual(depth[1], ['foo/bar','hello/world']);
	assert.deepEqual(depth[3], ['hello/world/tidy/']); //should be depth 2<--- do this by removing any trailing slash? <--- or note it's sensitive to trailing slash
});

test('sortPaths()', function (assert) {
    assert.plan(1);
	
	var paths = [
		'hello',
		'hello/world/tidy/',
		'hello/world',
		'foo/bar'
	]
	
	var sorted = dir.sortPaths(paths);
	
	assert.deepEqual(sorted,
					[
					'hello',
					'foo/bar',
					'hello/world',
					'hello/world/tidy/'
					]);
});

test('mkTree()', function(assert){
	assert.plan(2)

	dir.mkTree('./test/', ['testdir', 'hello/world']).then(function(){assert.ok(true)},function(){assert.ok(false)})
	dir.mkTree('./test/', ['testdir2', 'hello2/world2']).then(function(){assert.ok(true)},function(){assert.ok(false)})
});

/*
test('mkTree()', function(assert){
	dir.mkTree('./test/', ['testdir', 'hello/world'])
	//it will throw errors for any dirs that are not to be created, 
	//1.sort dirs by depth (shallow first)
	//2.
	//	for each dir 
	//		pathDirs = split by '/'
	//		for each pathDir 
	//			if any part of path is not among "known existing dirs", 
	//			check if that dir exists (if yes add to "known existing dirs"), 
	//			if not create it (and add it to "known existing dirs")
	//		create the dir
	//		add dir to "known existing dirs"
		.then();
});
*/



test('cleanTree()', function (assert) {
    assert.plan(2);

	dir.cleanTree(1)
		.then(null,
		function(err){
			assert.ok(true,err + 1)
		})
		.catch(function(err){
			assert.ok(true,err)
		});
	
	dir.rmFile('./helloworldfoobarhi')
		.then(
			function(err){
				assert.ok(true, 'unexistent file ignored');
			}, 
			function(err){
				assert.ok(false, 'unexistent file rejected rmFile promise');
			});
});
