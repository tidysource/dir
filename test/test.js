'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var dir = require('../index.js');
var path = require('tidypath');
var fs = require('tidyfs');

/*
Tests
=====
*/
test('mkTree()', function(assert){ 
	assert.plan(3);
	
	dir.mkTree('./test/testdir/helloworld')
		.then(function(){
			assert.ok(true, 'folder created');
		})
		.catch(function(err){
			assert.fail(err);
		});
		
	dir.mkTree([
				'./test/testdir/helloworld',
				'./test/testdir/helloworld/foo/',
				'./test/testdir/helloworld/foo/bar',
				'./test/testdir/helloworld/foo/hello', 
				'./test/testdir/helloworld/foo/world',
				])
		.then(function(){
			assert.ok(true, 'multiple folders created');
		})
		.catch(function(err){
			assert.fail(err);
		});
		
	dir.mkTree([]).then(function(){
		assert.ok(true, 'Empty array of trees to make');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('mkFile()', function(assert){ 
	assert.plan(7);
	
	dir.mkFile('./test/testdir/hello.txt', 'world','utf8')
		.then(function(){
			assert.ok(true, 'Make file in existing folder');
		})
		.catch(function(err){
			assert.fail(err);
		});;
		
	dir.mkFile('./test/testdir/foo/hello.txt', 'world','utf8')
		.then(function(){
			assert.ok(true, 'Make file in new folder');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.mkFile({
				path : './test/testdir/foo/world.js', 
				content : 'hello',
				options : 'utf8'
				})
		.then(function(){
			assert.ok(true, 'Make file via object param');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.mkFile([{
				path : './test/testdir/foo/foo.txt', 
				content : 'bar',
				options : 'utf8'
				},
				{
				path : './test/testdir/foo/bar.txt', 
				content : 'foo',
				options : 'utf8'
				},
				{
				path : './test/testdir/bar/hello.txt', 
				content : 'foo',
				options : 'utf8'
				},
				{
				path : './test/testdir/foobar/hello.txt', 
				content : 'foo',
				options : 'utf8'
				}
				,
				{
				path : './test/testdir/hello/world.txt', 
				content : 'foo',
				options : 'utf8'
				}])
		.then(function(){
			assert.ok(true, 'Make multiple files via array of objects');
		})
		.catch(function(err){
			assert.fail(err);
		});	

	dir.mkFile({
				path : './test/testdir/foo/helloworld.txt', 
				content : 'foo bar'
				}, 
				'utf8')
		.then(function(){
			assert.ok(true, 'Default for common option');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.mkFile([{
				path : './test/testdir/foo/foobar.txt', 
				content : 'hello world'
				}])
		.then(function(){
			assert.ok(true, 'Default for no option	argument');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.mkFile([]).then(function(){
		assert.ok(true, 'Empty array of files to make');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('listTree()', function(assert){
	assert.plan(2);
	
	var testTree = { 
		files: 
			[ 
			'./test/testdir/hello.txt',
			'./test/testdir/bar/hello.txt',
			'./test/testdir/foo/bar.txt',
			'./test/testdir/foo/foo.txt',
			'./test/testdir/foo/foobar.txt',
			'./test/testdir/foo/hello.txt',
			'./test/testdir/foo/helloworld.txt',
			'./test/testdir/foo/world.js',			
			'./test/testdir/foobar/hello.txt',
			'./test/testdir/hello/world.txt'
			],
		dirs: 
			[
			'./test/testdir/bar',
			'./test/testdir/foo',
			'./test/testdir/foobar',
			'./test/testdir/hello',
			'./test/testdir/helloworld',
			'./test/testdir/helloworld/foo',
			'./test/testdir/helloworld/foo/bar',
			'./test/testdir/helloworld/foo/hello', 
			'./test/testdir/helloworld/foo/world' 
			] 
	}
	
	dir.listTree('./test/testdir')
		.then(function(tree){
			tree.files = path.filter(tree.files, path.dotfile, false);
			assert.deepEqual(tree, testTree,
					'All files and folders are listed')
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.listTree('./test/testdir', 
				function(param){
					if (path.dotfile(param)){return false;}
					else{return true;}
				})
		.then(function(tree){
			assert.deepEqual(tree, testTree,
					'List a filtered tree')
		})
		.catch(function(err){
			assert.fail(err);
		});	
});

test('readFile()', function(assert){
	assert.plan(8);

	dir.readFile('./test/testdir/hello.txt', 'utf8')
		.then(function(file){
			assert.equal(file.content, 'world',
						'Basic read file');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.readFile({
				path : './test/testdir/hello.txt', 
				options : 'utf8'
				})
		.then(function(file){
			assert.equal(file.content, 'world',
						'File read via object');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.readFile([
				'./test/testdir/hello.txt',
				'./test/testdir/foo/world.js'
				],
				'utf8')
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/hello.txt', 
							options : 'utf8',
							content : 'world'
							},
							{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'File read via array');
		})
		.catch(function(err){
			assert.fail(err);
		});		
		
	dir.readFile([
				{
				path : './test/testdir/hello.txt', 
				options : 'utf8'
				},
				{
				path : './test/testdir/foo/world.js', 
				options : 'utf8'	
				}], 
				'buffer')
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/hello.txt', 
							options : 'utf8',
							content : 'world'
							},
							{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'File read via array of objects');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.readFile(['./test/testdir/hello.txt',
				'./test/testdir/foo/world.js'])
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/hello.txt', 
							options : 'utf8',
							content : 'world'
							},
							{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'Default options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.readFile(['./test/testdir/hello.txt',
				'./test/testdir/foo/world.js'],
				'utf8',
				'.js')
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'Read filtered files with options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.readFile(['./test/testdir/hello.txt',
				'./test/testdir/foo/world.js'],
				'.js')
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'Read filtered files without options');
		})
		.catch(function(err){
			assert.fail(err);
		});
		
	dir.readFile([]).then(function(){
		assert.ok(true, 'Empty array of files to read');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('readTree', function(assert){
	assert.plan(8);

	dir.readTree('./test/testdir/foo/', 'utf8')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/foo/bar.txt',
									content : 'foo',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foo.txt',
									content : 'bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foobar.txt',
									content : 'hello world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/hello.txt',
									content : 'world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/helloworld.txt',
									content : 'foo bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							},
							'Basic read tree');
		})
		.catch(function(err){
			assert.fail(err);
		});	

	dir.readTree({path:'./test/testdir/foo/'}, 'utf8')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/foo/bar.txt',
									content : 'foo',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foo.txt',
									content : 'bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foobar.txt',
									content : 'hello world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/hello.txt',
									content : 'world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/helloworld.txt',
									content : 'foo bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							},
							'Read tree via object');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.readTree(['./test/testdir/foo/'])
		.then(function(tree){
			assert.deepEqual(tree,
							[{
							files: [{
									path : './test/testdir/foo/bar.txt',
									content : 'foo',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foo.txt',
									content : 'bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foobar.txt',
									content : 'hello world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/hello.txt',
									content : 'world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/helloworld.txt',
									content : 'foo bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							}],
							'Read tree via array');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.readTree([{path:'./test/testdir/foo/', options: 'uft8'}], 'buffer')
		.then(function(tree){
			assert.deepEqual(tree,
							[{
							files: [{
									path : './test/testdir/foo/bar.txt',
									content : 'foo',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foo.txt',
									content : 'bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foobar.txt',
									content : 'hello world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/hello.txt',
									content : 'world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/helloworld.txt',
									content : 'foo bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							}],
							'Read tree via array of objects');
		})
		.catch(function(err){
			assert.fail(err);
		});	
	
	dir.readTree('./test/testdir/bar/')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/bar/hello.txt',
									content : 'foo',
									options : 'utf8'
									}],
							dirs : []
							},
							'Default options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
	
	dir.readTree('./test/testdir/foo/', 'utf8', '.js')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							},
							'Read tree filtered with options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
	
	dir.readTree('./test/testdir/foo/', '.js')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							},
							'Read tree filtered without options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.readTree([]).then(function(){
		assert.ok(true, 'Empty array of trees to read');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('rmFile()', function(assert){
	assert.plan(3);
	
	dir.rmFile('./test/testdir/hello.txt')
		.then(function(){
			return fs.access('./test/testdir/hello.txt');
		})
		.then(function(){
			assert.fail('./test/testdir/hello.txt not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'File removed');
			}
			else{
				assert.fail(err);
			}
		});
		
	dir.rmFile([
				'./test/testdir/foo/bar.txt',
				'./test/testdir/foo/foo.txt'
				])
		.then(function(){
			return Promise.all([
								fs.access('./test/testdir/foo/bar.txt'),
								fs.access('./test/testdir/foo/foo.txt')
								]); 
					
		})
		.then(function(){
			assert.fail('Multiple files not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'Multiple files removed');
			}
			else{
				assert.fail(err);
			}
		});
		
	dir.rmFile([]).then(function(){
		assert.ok(true, 'Empty array of files to remove');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('rmDir()', function(assert){
	assert.plan(2);
	
	dir.rmDir('./test/testdir/helloworld/foo/bar')
		.then(function(){
			return fs.access('./test/testdir/helloworld/foo/bar');
		})
		.then(function(){
			assert.fail('Dir not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'Dir removed');
			}
			else{
				assert.fail(err);
			}
		})
	
	
	dir.rmDir([
				'./test/testdir/helloworld/foo/hello',
				'./test/testdir/helloworld/foo/world',
				])
		.then(function(){
			return Promise.all([
								fs.access('./test/testdir/helloworld/foo/hello'),
								fs.access('./test/testdir/helloworld/foo/world')
								]); 
					
		})
		.then(function(){
			assert.fail('Multiple dirs not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'Multiple dirs removed');
			}
			else{
				assert.fail(err);
			}
		});
});

test('emptyTree()', function(assert){
	assert.plan(3);
	
	dir.emptyTree('./test/testdir/helloworld/')
		.then(function(){
			return dir.listTree('./test/testdir/helloworld/');
		})
		.then(function(tree){
			if (tree.dirs.length === 0){
				assert.ok(true, 'Emptied tree');
			}
			else{
				throw new Error('emptyTree() failed');
			}
		})
		.catch(function(err){
			assert.fail(err);
		});
	
	dir.emptyTree([
				'./test/testdir/foobar',
				'./test/testdir/hello'
				])
		.then(function(){
			return Promise.all([
								dir.listTree('./test/testdir/foobar'),
								dir.listTree('./test/testdir/hello')
								]); 
					
		})
		.then(function(tree){
			if (tree[0].dirs.length === 0
			 && tree[1].dirs.length === 0){
				assert.ok(true, 'Multiple trees emptied');
			}
			else{
				throw new Error('Did not empty multiple trees');
			}
		})
		.catch(function(err){
			assert.fail(err);
		});
		
	dir.emptyTree([]).then(function(){
		assert.ok(true, 'Empty array of trees to empty');
	})
	.catch(function(err){
		assert.fail(err);
	});	
});
			
test('rmTree()', function(assert){
	assert.plan(3);
	
	dir.rmTree('./test/testdir/foobar')
		.then(function(){
			return fs.access('./test/testdir/foobar');
		})
		.then(function(){
			assert.fail('Tree not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'Tree removed');
			}
			else{
				assert.fail(err);
			}
		})
		//Start second test
		.then(function(){
			return 	dir.rmTree([
								'./test/testdir/',
								'./test/testdir/hello'
								]);	
		})
		.then(function(){
			return Promise.all([
								fs.access('./test/testdir/'),
								fs.access('./test/testdir/hello')
								]); 
					
		})
		.then(function(){
			assert.fail('Multiple trees not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'Multiple trees removed');
			}
			else{
				assert.fail(err);
			}
		});
	
	
	dir.rmTree([]).then(function(){
		assert.ok(true, 'Empty array of trees to remove');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

/*
================================
TEST SHORTHAND VERSION OF MODULE
================================
*/

test('mk() as mkTree() substitute', function(assert){ 
	assert.plan(3);
	
	dir.mk('./test/testdir/helloworld')
		.then(function(){
			assert.ok(true, 'folder created');
		})
		.catch(function(err){
			assert.fail(err);
		});
		
	dir.mk([
			'./test/testdir/helloworld',
			'./test/testdir/helloworld/foo/',
			'./test/testdir/helloworld/foo/bar',
			'./test/testdir/helloworld/foo/hello', 
			'./test/testdir/helloworld/foo/world',
			])
		.then(function(){
			assert.ok(true, 'multiple folders created');
		})
		.catch(function(err){
			assert.fail(err);
		});
		
	dir.mk([]).then(function(){
		assert.ok(true, 'Empty array of trees to make');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('mk() as mkFile substitute', function(assert){ 
	assert.plan(7);
	
	dir.mk('./test/testdir/hello.txt', 'world','utf8')
		.then(function(){
			assert.ok(true, 'Make file in existing folder');
		})
		.catch(function(err){
			assert.fail(err);
		});;
		
	dir.mk('./test/testdir/foo/hello.txt', 'world','utf8')
		.then(function(){
			assert.ok(true, 'Make file in new folder');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.mk({
			path : './test/testdir/foo/world.js', 
			content : 'hello',
			options : 'utf8'
			})
		.then(function(){
			assert.ok(true, 'Make file via object param');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.mk([{
			path : './test/testdir/foo/foo.txt', 
			content : 'bar',
			options : 'utf8'
			},
			{
			path : './test/testdir/foo/bar.txt', 
			content : 'foo',
			options : 'utf8'
			},
			{
			path : './test/testdir/bar/hello.txt', 
			content : 'foo',
			options : 'utf8'
			},
			{
			path : './test/testdir/foobar/hello.txt', 
			content : 'foo',
			options : 'utf8'
			}
			,
			{
			path : './test/testdir/hello/world.txt', 
			content : 'foo',
			options : 'utf8'
			}])
		.then(function(){
			assert.ok(true, 'Make multiple files via array of objects');
		})
		.catch(function(err){
			assert.fail(err);
		});	

	dir.mk({
			path : './test/testdir/foo/helloworld.txt', 
			content : 'foo bar'
			}, 
			'utf8')
		.then(function(){
			assert.ok(true, 'Default for common option');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.mk([{
			path : './test/testdir/foo/foobar.txt', 
			content : 'hello world'
			}])
		.then(function(){
			assert.ok(true, 'Default for no option	argument');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.mk([]).then(function(){
		assert.ok(true, 'Empty array of files to make');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('list() as listTree() synonym', function(assert){
	assert.plan(2);
	
	var testTree = { 
		files: 
			[ 
			'./test/testdir/hello.txt',
			'./test/testdir/bar/hello.txt',
			'./test/testdir/foo/bar.txt',
			'./test/testdir/foo/foo.txt',
			'./test/testdir/foo/foobar.txt',
			'./test/testdir/foo/hello.txt',
			'./test/testdir/foo/helloworld.txt',
			'./test/testdir/foo/world.js',			
			'./test/testdir/foobar/hello.txt',
			'./test/testdir/hello/world.txt'
			],
		dirs: 
			[
			'./test/testdir/bar',
			'./test/testdir/foo',
			'./test/testdir/foobar',
			'./test/testdir/hello',
			'./test/testdir/helloworld',
			'./test/testdir/helloworld/foo',
			'./test/testdir/helloworld/foo/bar',
			'./test/testdir/helloworld/foo/hello', 
			'./test/testdir/helloworld/foo/world' 
			] 
	}
	
	dir.list('./test/testdir')
		.then(function(tree){
			tree.files = path.filter(tree.files, path.dotfile, false);
			assert.deepEqual(tree, testTree,
					'All files and folders are listed')
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.list('./test/testdir', 
			function(param){
				if (path.dotfile(param)){return false;}
				else{return true;}
			})
		.then(function(tree){
			assert.deepEqual(tree, testTree,
					'List a filtered tree')
		})
		.catch(function(err){
			assert.fail(err);
		});	
});

test('ls() as listTree() synonym', function(assert){
	assert.plan(2);
	
	var testTree = { 
		files: 
			[ 
			'./test/testdir/hello.txt',
			'./test/testdir/bar/hello.txt',
			'./test/testdir/foo/bar.txt',
			'./test/testdir/foo/foo.txt',
			'./test/testdir/foo/foobar.txt',
			'./test/testdir/foo/hello.txt',
			'./test/testdir/foo/helloworld.txt',
			'./test/testdir/foo/world.js',			
			'./test/testdir/foobar/hello.txt',
			'./test/testdir/hello/world.txt'
			],
		dirs: 
			[
			'./test/testdir/bar',
			'./test/testdir/foo',
			'./test/testdir/foobar',
			'./test/testdir/hello',
			'./test/testdir/helloworld',
			'./test/testdir/helloworld/foo',
			'./test/testdir/helloworld/foo/bar',
			'./test/testdir/helloworld/foo/hello', 
			'./test/testdir/helloworld/foo/world' 
			] 
	}
	
	dir.ls('./test/testdir')
		.then(function(tree){
			tree.files = path.filter(tree.files, path.dotfile, false);
			assert.deepEqual(tree, testTree,
					'All files and folders are listed')
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.ls('./test/testdir', 
			function(param){
				if (path.dotfile(param)){return false;}
				else{return true;}
			})
		.then(function(tree){
			assert.deepEqual(tree, testTree,
					'List a filtered tree')
		})
		.catch(function(err){
			assert.fail(err);
		});	
});

test('read() as readFile() substitute', function(assert){
	assert.plan(8);

	dir.read('./test/testdir/hello.txt', 'utf8')
		.then(function(file){
			assert.equal(file.content, 'world',
						'Basic read file');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.read({
			path : './test/testdir/hello.txt', 
			options : 'utf8'
			})
		.then(function(file){
			assert.equal(file.content, 'world',
						'File read via object');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.read([
			'./test/testdir/hello.txt',
			'./test/testdir/foo/world.js'
			],
			'utf8')
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/hello.txt', 
							options : 'utf8',
							content : 'world'
							},
							{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'File read via array');
		})
		.catch(function(err){
			assert.fail(err);
		});		
		
	dir.read([
			{
			path : './test/testdir/hello.txt', 
			options : 'utf8'
			},
			{
			path : './test/testdir/foo/world.js', 
			options : 'utf8'	
			}], 
			'buffer')
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/hello.txt', 
							options : 'utf8',
							content : 'world'
							},
							{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'File read via array of objects');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.read(['./test/testdir/hello.txt',
			'./test/testdir/foo/world.js'])
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/hello.txt', 
							options : 'utf8',
							content : 'world'
							},
							{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'Default options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.read(['./test/testdir/hello.txt',
				'./test/testdir/foo/world.js'],
				'utf8',
				'.js')
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'Read filtered files with options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.read(['./test/testdir/hello.txt',
			'./test/testdir/foo/world.js'],
			'.js')
		.then(function(files){
			assert.deepEqual(files, 
							[{
							path : './test/testdir/foo/world.js', 
							options : 'utf8',
							content : 'hello'
							}],
							'Read filtered files without options');
		})
		.catch(function(err){
			assert.fail(err);
		});
		
	dir.read([]).then(function(){
		assert.ok(true, 'Empty array of files to read');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('read() as readTree() substitute', function(assert){
	assert.plan(8);

	dir.read('./test/testdir/foo/', 'utf8')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/foo/bar.txt',
									content : 'foo',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foo.txt',
									content : 'bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foobar.txt',
									content : 'hello world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/hello.txt',
									content : 'world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/helloworld.txt',
									content : 'foo bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							},
							'Basic read tree');
		})
		.catch(function(err){
			assert.fail(err);
		});	

	dir.read({path:'./test/testdir/foo/'}, 'utf8')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/foo/bar.txt',
									content : 'foo',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foo.txt',
									content : 'bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foobar.txt',
									content : 'hello world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/hello.txt',
									content : 'world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/helloworld.txt',
									content : 'foo bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							},
							'Read tree via object');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.read(['./test/testdir/foo/'])
		.then(function(tree){
			assert.deepEqual(tree,
							[{
							files: [{
									path : './test/testdir/foo/bar.txt',
									content : 'foo',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foo.txt',
									content : 'bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foobar.txt',
									content : 'hello world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/hello.txt',
									content : 'world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/helloworld.txt',
									content : 'foo bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							}],
							'Read tree via array');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.read([{path:'./test/testdir/foo/', options: 'uft8'}], 'buffer')
		.then(function(tree){
			assert.deepEqual(tree,
							[{
							files: [{
									path : './test/testdir/foo/bar.txt',
									content : 'foo',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foo.txt',
									content : 'bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/foobar.txt',
									content : 'hello world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/hello.txt',
									content : 'world',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/helloworld.txt',
									content : 'foo bar',
									options : 'utf8'
									},
									{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							}],
							'Read tree via array of objects');
		})
		.catch(function(err){
			assert.fail(err);
		});	
	
	dir.read('./test/testdir/bar/')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/bar/hello.txt',
									content : 'foo',
									options : 'utf8'
									}],
							dirs : []
							},
							'Default options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
	
	dir.read('./test/testdir/foo/', 'utf8', '.js')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							},
							'Read tree filtered with options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
	
	dir.read('./test/testdir/foo/', '.js')
		.then(function(tree){
			assert.deepEqual(tree,
							{
							files: [{
									path : './test/testdir/foo/world.js',
									content : 'hello',
									options : 'utf8'
									}],
							dirs : []
							},
							'Read tree filtered without options');
		})
		.catch(function(err){
			assert.fail(err);
		});	
		
	dir.read([]).then(function(){
		assert.ok(true, 'Empty array of trees to read');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('rm() as rmFile() substitute', function(assert){
	assert.plan(3);
	
	dir.rm('./test/testdir/hello.txt')
		.then(function(){
			return fs.access('./test/testdir/hello.txt');
		})
		.then(function(){
			assert.fail('./test/testdir/hello.txt not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'File removed');
			}
			else{
				assert.fail(err);
			}
		});
		
	dir.rm([
			'./test/testdir/foo/bar.txt',
			'./test/testdir/foo/foo.txt'
			])
		.then(function(){
			return Promise.all([
								fs.access('./test/testdir/foo/bar.txt'),
								fs.access('./test/testdir/foo/foo.txt')
								]); 
					
		})
		.then(function(){
			assert.fail('Multiple files not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'Multiple files removed');
			}
			else{
				assert.fail(err);
			}
		});
		
	dir.rm([]).then(function(){
		assert.ok(true, 'Empty array of files to remove');
	})
	.catch(function(err){
		assert.fail(err);
	});
});

test('empty() as emptyTree() synonym', function(assert){
	assert.plan(3);
	
	dir.empty('./test/testdir/helloworld/')
		.then(function(){
			return dir.listTree('./test/testdir/helloworld/');
		})
		.then(function(tree){
			if (tree.dirs.length === 0){
				assert.ok(true, 'Emptied tree');
			}
			else{
				throw new Error('emptyTree() failed');
			}
		})
		.catch(function(err){
			assert.fail(err);
		});
	
	dir.empty([
				'./test/testdir/foobar',
				'./test/testdir/hello'
				])
		.then(function(){
			return Promise.all([
								dir.listTree('./test/testdir/foobar'),
								dir.listTree('./test/testdir/hello')
								]); 
					
		})
		.then(function(tree){
			if (tree[0].dirs.length === 0
			 && tree[1].dirs.length === 0){
				assert.ok(true, 'Multiple trees emptied');
			}
			else{
				throw new Error('Did not empty multiple trees');
			}
		})
		.catch(function(err){
			assert.fail(err);
		});
		
	dir.empty([]).then(function(){
		assert.ok(true, 'Empty array of trees to empty');
	})
	.catch(function(err){
		assert.fail(err);
	});	
});
			
test('rm() as rmTree() substitute', function(assert){
	assert.plan(3);
	
	dir.rm('./test/testdir/foobar')
		.then(function(){
			return fs.access('./test/testdir/foobar');
		})
		.then(function(){
			assert.fail('Tree not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'Tree removed');
			}
			else{
				assert.fail(err);
			}
		})
		//Start second test
		.then(function(){
			return 	dir.rm([
							'./test/testdir/',
							'./test/testdir/hello'
							]);	
		})
		.then(function(){
			return Promise.all([
								fs.access('./test/testdir/'),
								fs.access('./test/testdir/hello')
								]); 
					
		})
		.then(function(){
			assert.fail('Multiple trees not removed');
		})
		.catch(function(err){
			if (err.errno === -2){ //err.code 'ENOENT'
				assert.ok(true, 'Multiple trees removed');
			}
			else{
				assert.fail(err);
			}
		});
	
	
	dir.rm([]).then(function(){
		assert.ok(true, 'Empty array of trees to remove');
	})
	.catch(function(err){
		assert.fail(err);
	});
});