
/*
 * GET home page.
 */

exports.index = function(req, res){
	if(req.params.id) {
		res.render('index', { title: req.params.id });		
	} else {
		res.render('index', { title: 'Express' });				
	}
};