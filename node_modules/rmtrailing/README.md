# rmTrailing
Removes dynamic trailing substring.
__Use if:__ 
what you want to remove is stored
in a variable.
__Otherwise:__ 
you may want to use .replace() or 
a more specific module


### How to use

#### Prerequisite
None

### Example
```javascript
var slash = '/';

rmTrailing('hello/world/', slash); //'hello/world',
rmTrailing('hello/world//', slash); //'hello/world'
rmTrailing('hello/world', slash) //'hello/world'
rmTrailing('///', slash); //''
rmTrailing('', slash) //''
```

