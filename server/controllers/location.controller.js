var Location = require('../models/location.model.js');

exports.getAllLocations = function (req, res) {
    Location.find({}).limit(10).exec(function (err, locations) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while searching for the Locations." })
        } else if (locations && locations != null) {
            res.status(200).send(locations);
        } else {
            res.status(404).send({ message: "Could not find any recipes." });
        }
    });
};

exports.getMostRatedLocations = function (req, res) {
    Location.find({}).sort({ 'tripAdvisorRating': 'desc' }).limit(30).exec(function (err, locations) {
        if (err) {
            res.status(500).send({ message: err })
        }
        else {
            res.status(200).send(locations);
        }
    });
};

exports.getLocationsCities = function (req, res) {
    Location.distinct('city', function (err, cities) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.status(200).send(cities);
        }
    });
};

exports.getLocationsByCity = function (req, res) {
    if (!req.body) {
        res.status(500).send({ message: error })
    }
    Location.find({ 'city': req.body.cityName }, function (err, locations) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.status(200).send(locations);
        }
    });
};

exports.getSingleLocation = function (req, res) {

    Location.findOne({ _id: req.params.id }, function (err, location) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.status(200).send(location);
        }
    });
};

exports.addReview = function (req, res) {
    if (!req.body) {
        res.status(400).send({ message: err })
    }

    let locationId = req.body.locationId;
    let score = req.body.score;
    let initialAverageScore = req.body.averageScore;
    let updatedAverageScore = (initialAverageScore + score) / 2;

    let searchQuery = {
        _id: locationId
    };

    let review = {
        title: req.body.title,
        content: req.body.content,
        userName: req.body.userName,
        userId: req.body.userId,
        score: score
    };

    Location.findOneAndUpdate(searchQuery, { $push: { receivedReviews: review }, $set: { averageScore: updatedAverageScore } }, { new: true }, function (err, location) {
        if (err) {
            console.log(err);

            res.status(500).send({ message: err });
        } else {
            res.status(200).send(location);
        }
    });
};

exports.getFiltersByLocations = function (req, res) {
    Location.distinct('categories.cuisine', function (err, cuisine) {
        let categories = {};
        if (err) {
            res.status(500).send({ message: err });
        } else {
            categories.cuisine = cuisine;
            Location.distinct('categories.goodFor', function (err, goodFor) {
                if (err) {
                    res.status(500).send({ message: err });
                } else {
                    categories.goodFor = goodFor;
                    Location.distinct('categories.meals', function (err, meals) {
                        if (err) {
                            res.status(500).send({ message: err });
                        } else {
                            categories.meals = meals;
                            res.status(200).send(categories);

                        }
                    });
                }
            });
        }
    });

};

exports.getFilteredLocations = function(req, res) {
    if (!req.body) {
        res.status(500).send({ message: error })
    }

    let objectQuery = {}

    Object.assign(objectQuery, req.body.goodFor.length !== 0 ? {'categories.goodFor': {$all: req.body.goodFor}} : null,
                               req.body.cuisine.length !== 0 ? {'categories.cuisine': {$all: req.body.cuisine}} : null,
                               req.body.meals.length !== 0 ? {'categories.meals': {$all: req.body.meals}} : null,
                                                             {'city': req.body.city} )

    let arrayQuery = [];

    for(key in objectQuery) {
        arrayQuery.push({[key] : objectQuery[key]});
    }

    Location.find({ $and: arrayQuery } ,
        function(err, locations) {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                res.status(200).send(locations);

            }
        }
    )
    
};

exports.wordSimilarity = function(s1, s2) {
    var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
}

exports.addDish = function(req, res) {
    let locationId = req.body.locationId;

    let searchLocationId = {
        _id: locationId
    };

    let dish = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        score: req.body.score,
        image: req.body.image
    };


    Location.findOne(searchLocationId, function (err, location) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: err });
        } else {
            let occurenceDishNumber = 0;
            let similarDishes = [];
            location.temporaryMenu.forEach((existingDish) => {
                if(exports.wordSimilarity(existingDish.name, dish.name) > 0.75) {
                    similarDishes.push(existingDish);
                    occurenceDishNumber++;
                }
            });

            if(occurenceDishNumber < 2 ) {
                location.temporaryMenu.push(dish);
                Location.findOneAndUpdate(searchLocationId, {temporaryMenu: location.temporaryMenu}, {new: true}, function(err, updatedLocation) {
                    if(err) {
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send({message: 'Temporary Menu Updated'});
                    }
                });
            } else if (occurenceDishNumber === 2){
                similarDishes.push(dish);
                let processedDishForMenu = {
                    name: similarDishes[0].name,
                    price : 0,
                    image: [],
                    score: 0,
                    category: similarDishes[0].category
                };

                similarDishes.forEach((existingDish) => {
                    processedDishForMenu.price += existingDish.price;
                    processedDishForMenu.score += existingDish.score;
                    processedDishForMenu.image.push(existingDish.image);
                })

                processedDishForMenu.price = processedDishForMenu.price / 3;
                processedDishForMenu.score = processedDishForMenu.score / 3;


                let dishAlreadyExistsInMenu = false;
                location.menu.forEach((item, index) => {
                        if(exports.wordSimilarity(item.name, processedDishForMenu.name) > 0.75) {
                            processedDishForMenu[index] = processedDishForMenu;
                            processedDishForMenu[index].name = item.name;
                            dishAlreadyExistsInMenu = true;
                        }
                });

                if(!dishAlreadyExistsInMenu) {                    
                    location.menu.push(processedDishForMenu);
                }

                for(let index = location.temporaryMenu.length - 1; index >= 0; index--) {
                    if(exports.wordSimilarity(location.temporaryMenu[index].name, processedDishForMenu.name) > 0.75) {
                        location.temporaryMenu.splice(index, 1);
                    }
                }

                Location.findOneAndUpdate(searchLocationId, {temporaryMenu: location.temporaryMenu, menu: location.menu}, {new: true}, function(err, updatedLocation) {
                    if(err) {
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send({updatedLocation});
                    }
                });
            }
        }
    });
}

exports.recommendDish = function(req, res) {
    let locationId = req.body.locationId;

    let searchLocationId = {
        _id: locationId
    };

    let dishName = req.body.recommendedDish.name;
    let dishImage = req.body.recommendedDish.image

    Location.findOne(searchLocationId, function(err, location){
        if(err) {
            res.status(500).send({message: err});
        } else {
            let alreadyExists = false;

            location.recommendedDishes.forEach((existingDish, index) => {
                if(existingDish.name === dishName) {
                    location.recommendedDishes[index].occurrencesNumber ++;
                    alreadyExists = true;
                }
            });

            if(!alreadyExists) {
                location.recommendedDishes.push({
                    name: dishName,
                    occurrencesNumber: 1,
                    image: dishImage
                });
            }

            Location.findOneAndUpdate(searchLocationId, {recommendedDishes: location.recommendedDishes}, {new: true}, function(err, updatedLocation){
                if(err) {
                    res.status(500).send({message: err});
                } else { 
                    res.status(200).send({updatedLocation});
                }
            })
        }
    });

};

exports.getMenuDishes = function(req, res) {

    Location.findOne({ _id: req.params.id }, function (err, location) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.status(200).send(location.menu)
        }
    });
};

exports.getRecommendedDishes = function(req, res) {
    Location.findOne({ _id: req.params.id }, function (err, location) {
        if (err) {
            res.status(500).send({ message: err })
        }
        else {
            let mostRecommendedDishes = location.recommendedDishes.sort(function(a, b) {
                return b.occurrencesNumber - a.occurrencesNumber;
            });

            mostRecommendedDishes = mostRecommendedDishes.slice(0, 3);

            res.status(200).send(mostRecommendedDishes);
        }
    });
};

exports.getSimilarLocations = function (req, res) {
	if (!req.body) {
		res.status(500).send({ message: req.body });
    };

    let mealsFilters = req.body.filters.meals;
    let goodForFilters = req.body.filters.goodFor;
    let cuisineFilters = req.body.filters.cuisine;
    let cityLocation = req.body.cityLocation;

	Location.aggregate([
        {
            $match:
                {
                    'city': cityLocation,
                }
        },
		{
			$addFields: {
				totalMatch: {
                    $sum:[
                        {$size: {  $setIntersection:  [goodForFilters, "$categories.goodFor"]  }},
                        {$size: {  $setIntersection:  [cuisineFilters, "$categories.cuisine"]  }},
                        {$size: {  $setIntersection:  [mealsFilters, "$categories.meals"]  }}
                    ]
				}
			}
		},
		{
			$sort: {
				totalMatch: -1
			}
		},
		{
			$project: {
				totalMatch: 0
			}
		},
		{
			$limit: 10
		}
	], function (err, locations) {
		if (err) {
			res.status(500).send({ message: "Some error occurred while searching for the Locations." })
		} else if (locations && locations !== null) {
			res.status(200).send(locations);
		} else {
			res.status(404).send({ message: "Could not find the locations." });
		}
	});
};