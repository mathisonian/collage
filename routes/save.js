
/*
 * GET save page.
 */

var CollageProvider = require('../collageprovider-memory').CollageProvider;
var collageProvider = new CollageProvider('localhost', 27017);

exports.save = function(req, res){
	collageProvider.save(req.params.collage, function(error, docs) {
		
	});
};