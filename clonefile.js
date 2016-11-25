var fs = require("fs");

//fromPath and toPath must include filename
var cloneFile = function cloneFile(fromPath,toPath,callback){
                  fs.readFile(fromPath,
                              "utf8",
                              function(err,txt){
                                if (err){
                                  throw err;
                                }
                                else{
                                  fs.writeFile(toPath,
                                              txt,
                                              function(err){
                                                if (err){
                                                  throw err;
                                                }
                                                else{
                                                  callback;
                                                }
                                              });
                                 }
                               });
                };

module.exports = cloneFile;
