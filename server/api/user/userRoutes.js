var router = require('express').Router();
var user = require("./userModel");
//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

//working
router.route('/')
  .get(function(req, res){
	  
	 user.find({}, function(err, data){
		 if(err){
			 res.send(err);
		 }else{
			 res.json(data);
		 }

	 });
    console.log('Hey from user!!');
    // var user1 = {name: 'modulus admin', address: "sjsu"};
	// var user2 = {name: 'modulus user', address: "sjsu2"};
	// this.User.db.collection.save([user1, user2], function(err, records)
	// {
	// 	res.send('saved');
	// })
  });
 //working
router.route('/')
	.post(function(req, res){
			var userData = {username: req.body.name,
							address: req.body.address};
			var account = new user(userData);
			account.save(function(err, records){
				res.send('User successfully inserted');
			});
	});
	
//working
router.route('/:user_id')
	.get(function(req, res){
		var id = req.params.user_id;
		user.findById(id, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.json(data);
			}
		});
	});
//working
router.route('/:user_id')
		.put(function(req, res){
			var id = req.params.user_id;
			var updateData = {username: req.body.name,
							  address: req.body.address};
			var updatedAccount = new user(updateData);
			var upsertData = updatedAccount.toObject();
			delete upsertData._id;
			user.update({_id: id}, upsertData, {upsert: true}, function(err, data){
				if(err){
					res.send(err);
				}else{
					res.send("User successfully updated");
				}
			});
			
		});
  //working
 router.route('/:user_id')
		.delete(function(req, res){
			var id = req.params.user_id;
			user.remove({_id: id}, function(err){
				if(err){
					res.send(err);
				}else{
					res.send("User successfully deleted");
				}
				
			});
			
			
			
		});
  
  //error-handling middleware
router.get('*', function(req, res, next){
	console.log("error");
	var err = new Error();
	err.status = 404;
	next(err);
});  
  

router.use(function(err, req, res, next){
	if(err.status !== 404){
		return next();
	}else{
		
		res.send("Page not found");
	}
})
  
module.exports = router;

