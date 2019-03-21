var User = require('../models/user.model.js');
var Location = require('../models/location.model.js');

var passwordHash = require('password-hash');

exports.register = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }
    let processedUser = req.body;
    processedUser.password = passwordHash.generate(processedUser.password);

    let user = new User(processedUser);

    User.findOne({email: req.body.email}, function(err, data){
		if(err) {
			console.log(err);
			res.status(500).send({message: "Some error occurred while trying to register."});
		} else if(data === null) {
			user.save();
			res.status(200).send(user);
		} else {
			res.status(422).send({message: "E-mail address already exists. Please choose another one."})
		}
	});
};


exports.login = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while trying to login."});
        } else if(user !== null && passwordHash.verify(req.body.password, user.password)){
            res.status(200).send(user);
        } else {
            res.status(403).send({message: "Credentials do not match."});
        }
    });
};

exports.saveLocationWishList = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let locationId = req.body.locationId; 
    
    let userId = req.body.userId;
  
    User.findOneAndUpdate({_id: userId}, {$push: {wishList: locationId} }, {new: true}, function(err, user) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to add the location to saved for wish list."});
        } else {
            res.status(200).send(user);
        }
    });
};

exports.removeLocationWishList = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }
    let locationId = req.body.locationId;
    let userId = req.body.userId;

    User.findOneAndUpdate({_id: userId}, {$pull: {wishList: locationId} }, {new: true}, function(err, user) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to add the location to remove from wish list."});
        } else {
            res.status(200).send(user);
        }
    }); 
};

exports.getLocationsWishList = function(req, res) {
    if (!req.body) {
        res.status(400).send({ message: error })
    }

    let userId = req.params.userId;

    User.find({ _id: userId }, 'wishList', function(err, list) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to get the wish list"});
        } else {
            Location.find({ _id : { $in: list[0].wishList } }, function(err, locations) {
                if(err) {
                    console.log(err);
                    res.status(500).send({message: "There was an error trying to get the wish list"});
                } else {
                    res.status(200).send(locations);
                }
            });
        }
    });
}

// exports.getLocationWishListByName = function(req, res) {
//     if(!req.body) {
//         res.status(400).send({ message: error})0000000000
//     }

//     let userId = req.params.userId;
//     let locationName = req.body.locationName;

//     User.find({ _id: userId }, function(err, list) {
//         if(err) {
//             console.log(err);
//             res.status(500).send({message: "There was an error trying to find the user"});
//         } else {
//             Location.findOne({ name: locationName }, function (err, location) {
//                 if (err) {
//                     res.status(500).send({ message: err });
//                 } else {
//                     res.status(200).send(location);
//                 }
//             });
//         }
//     });
    
// }