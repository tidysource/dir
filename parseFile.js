var readFile = require('./readFile.js');

var parseFile = function parseFile(files, parser){
	if (typeof files !== 'string' &&
		typeof files !== 'object'){
		throw new Error('Invalid argument, files must be a string or an array');
	}
	//Conform to array
	if (!Array.isArray(files)){
		files = [files];
	}

	return readFile(files)
		.then(function(parsed){
			for(var i=0; i<parsed.length; ++i){
				let content = parsed[i].content();
				
				if (typeof parser === 'function'){
					parsed[i].content = parser(content);				
				}
				parsed[i].path = parsed[i].to;
			}
			return parsed;
		})
		.then(function(parsed){
			return mkFile(parsed);
		});
};

module.exports = parseFile;