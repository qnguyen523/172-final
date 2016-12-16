var router = require('express').Router();

// api router will mount other routers
// for all our resources

//This is the initial API Endpoint 
router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});
router.use('/users', require('./user/userRoutes'));
router.use('/posts', require('./post/postRoutes'));
router.use('/categories', require('./category/categoryRoutes'));

// error-handling middleware
router.get('*', function(req, res, next){
	console.log("error");
	var err = new Error();
	err.status = 500;
	next(err);
});  
  
// when calling next()
router.use(function(err, req, res, next){
	if(err.status !== 500){
		return next();
	}else{
		// when page is not found, send 500 code
		res.send(500);
	}
})

module.exports = router;
