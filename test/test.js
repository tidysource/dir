'use strict';

var test = require('tape');
var dir = require('../index.js');

test('sortPaths()', function (assert) {
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
	assert.deepEqual(depth[2], ['hello/world/tidy/']);
});
