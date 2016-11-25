var fs = require("fs");

var dirs = [];              //List of directory paths
var files = [];             //List of file paths
var toCheck = 1;

//checks if path is file or dir and adds it to the appropriate list
var listTree = function(path, callback){ //<--- make sure the callback runs only when list is complete

  fs.stat(path, function(err, stats){
    if (err){
      throw err;
    }

    if(stats.isDirectory()){
      dirs.push(path);
      fs.readdir(path, function(err, dirItems){
        for (var j=0; j<dirItems.length ;++j){
          var dirItem = dirItems[j];
          listTree(path + "/" + dirItem, callback);
        }
        toCheck += dirItems.length;
        --toCheck;
        if (toCheck==0 && typeof callback === "function"){
          callback(files, dirs);
        }
      });
    }
    else if(stats.isFile()){
      files.push(path);
      --toCheck;
      if (toCheck==0 && typeof callback === "function"){
        callback(files, dirs);
      }
    }
    else{
      //silent fail?
    }
  });
};

module.exports = listTree;
