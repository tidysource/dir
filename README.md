# Tidy Dir
Simplified way to work with files and folders in NodeJS.

## How to use

### Prerequisite

#### Node JS
https://nodejs.org/

### Examples

#### mkTree()
Makes directiories, inclusing the necessary path. For example ./foo/bar/hello if foo/bar does not exists, it will make it. 
Returns a promise.
If directories exist returned promise will be resolved.
If it can't make any of the directiories, the returned promise will be rejected.

@dirs - paths of dirs | string,array 

Notes: 
- Paths may use either / or \
- if dir or any dirs in path exist already, there is no error thrown (since the desired result is already there)

#### mkFile()
Makes files, including the necessary path.

@files - file object
@file.path - path must include filename and **extension**
@file.content - content of the file - string
@file.options - options (see fs.writeFile for node) - string (sets character encoding)|object|undefined(defaults to 'utf8', if you want the buffer obj put null as encoding)

Notes: 
- Paths may use either / or \
- it will make any missing dirs in the filepath
- overwrites existing files with same path (if file already exists at same path, it will overwrite it)

```javascript
Possible params:
- path, content, options
- {path, content, options}, options 
- [{path,content,options}], options

//options within object overrides param options
```

#### listTree()
Returns tree content as an object with a two properties, 
`files` and `dirs` (both are arrays of strings).

#### rmFile()
Removes file(s).

#### rmDir()
Like the native rmdir from Node's fs module, but:
- is promisified
- allows multiple dirs as arugment (array of paths)

#### rmTree()
Removes tree(s) and all it's content 
(all contained files and folders).

#### emptyTree()
Removes all contents (files and directories) 
within a given path.

#### readTree()
```javascript
path, options, filter
{path, options, filter}, options, filter
[path], options, filter
[{path, options, filter}], options, filter
```

#### readFile()
Reads files
For single file path returns single file obj for array of file paths returns array of file objects

@files - file object
@file.path - path must include filename and **extension**
@file.options - options (see fs.writeFile for node) - string (sets character encoding)|object|undefined(defaults to 'utf8', if you want the buffer obj put null as encoding)

Notes: 
- For non-text items you should set options = null or options.encoding = null

```javascript
path, options, filter
{path, options}, options, filter
[path], options, filter
[{path, options}], options, filter
```

---

#### mk()
Will figure out based on path (see tidypath isFile()) 
and will make a tree or file accordingly. 

Put differently, automagical synonym for both mkFile() 
and mkTree().

#### read() 
Will figure out based on path (see tidypath isFile()) 
and will read a tree or file accordingly. 

Put differently, automagical synonym for both readFile() 
and readTree().

#### rm()
Will figure out based on path (see tidypath isFile()) 
and will remove a tree or file accordingly. 

Put differently, automagical synonym for both rmFile() 
and rmTree().

#### empty()
Synonym for emptyTree()

#### list()
Synonym for listTree()

#### ls()
Synonym for listTree()