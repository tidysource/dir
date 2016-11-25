var fs = require("fs");

var mkTree = function(toPath, dirs, index, callback){
  var i = 0;
  var finallyDo = callback;
  if (typeof index === "function"){
    finallyDo = index;
  }
  else if (index){
    i = index;
  }

  fs.mkdir(toPath+dirs[i], function(err){
                      if (err){
                        throw err;
                      }
                      else{
                        i++;
                        if (i<dirs.length){
                          mkTree(toPath,dirs,i,finallyDo);
                        }
                        else if (typeof callback === "function"){
                          finallyDo();
                        }
                        else{
                          //silent fail?
                        }
                      }
                    });
};

module.exports = mkTree;
