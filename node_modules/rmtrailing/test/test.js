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
var rmTrailing = require('../index.js');

/*
Tests
=====
*/
test('rmTrailing()', function(assert){
    assert.plan(7);
	
	var slash = '/';
	
	assert.equal(
				rmTrailing('hello/world/', slash),
				'hello/world',
				'Removes trailing substring'
				);
	assert.equal(
				rmTrailing('hello/world//', slash),
				'hello/world',
				'Removes multiple trailing substrings'
				);
	assert.equal(
				rmTrailing('///', slash), '',
				'Removes all trailing substrings'
				);
	assert.equal(
				rmTrailing('hello/world', slash), 
				'hello/world',
				'Is OK with nothing to remove'
				);
	assert.equal(
				rmTrailing('', slash), 
				'',
				'Is OK with empty string'
				);
	assert.throws(
				function(){rmTrailing(true, slash)}, 
				'Throws for non-string str argument'
				);
	assert.throws(
				function(){rmTrailing('hello/world', true)}, 
				'Throws for non-string substr argument'
				);
});