
/*
 * GET home page.
 */

var CollageProvider = require('../collageprovider-memory').CollageProvider;
var collageProvider = new CollageProvider('localhost', 27017);

exports.index = function(req, res){
	if(req.params.id) {
		console.log(req.params.id);
		collageProvider.findById(req.params.id, function(error, docs) {
			res.render('index', { locals : {
				title: "Digital Collage",
				collage : docs}
			});		
		});
	} else {
		res.render('index', { locals : {
			title: "Digital Collage",
			collage : {html : ""} }
		});
	}
};