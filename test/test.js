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
