let Location = require('../../models/location.model');

const geoCoder = require('../../../google_geocode_config/google_geocode_config');
const googleGeoCoder = geoCoder.nodeGeocoder(geoCoder.options);

exports.saveLocationFromFile = function (req, res) {

    let fs = require('fs');
    let locations = JSON.parse(fs.readFileSync('assets/locationsData/compiegneCrawledFormatted.json', 'utf8'));
    let googleReqTimeout = 500;

    locations = locations.filter((location, index, self) =>
        index === self.findIndex((i) => (
            i.name === location.name
        ))
    )

    for (var i = 0; i < locations.length; i++) {
        let locationItem;
        let location = locations[i];

        if (location.address && location.address !== null && location.address !== '' && location.address !== undefined) {
            setTimeout(function(){
                googleGeoCoder.geocode(location.address)
                .then(function (locationDetails) {
                    let longitude = locationDetails.length > 0 && locationDetails[0].longitude ? locationDetails[0].longitude : null
                    let latitude = locationDetails.length > 0  && locationDetails[0].latitude ? locationDetails[0].latitude : null

                    let locationSchedule = [];
                    let phoneArray = [];
                    for (key in location.schedule) {
                        locationSchedule.push({
                            dayName: key,
                            openHours: location.schedule[key]
                        });
                    }
                    locationItem = {
                        name: location.name,
                        address: location.address,
                        city: location.city,
                        country: location.country,
                        coordinates: {
                            longitude: longitude,
                            latitude: latitude
                        },
                        phone: [location.phone],
                        images: location.images,
                        schedule: locationSchedule,
                        price: location.price,
                        averagePrice: location.averagePrice,
                        categories: {
                            cuisine: location.categories.cuisine,
                            meals: location.categories.meals,
                            goodFor: location.categories.goodFor
                        },
                        locationFeatures: location.locationFeatures,
                        tripAdvisorRating: location.tripAdvisorRating,
                        receivedReviews: [],
                        receivedRatings: [],
                        menu: [],
                        temporaryMenu: []

                    };
                    new Location(locationItem).save();
                })
                .catch(function (err) {
                    console.log(err);
                });
            }, googleReqTimeout)
            googleReqTimeout += 500;   
        } else {
            let locationSchedule = [];
            let phoneArray = [];
            for (key in location.schedule) {
                locationSchedule.push({
                    dayName: key,
                    openHours: location.schedule[key]
                });
            }

            locationItem = {
                name: location.name,
                address: location.address,
                city: location.city,
                country: location.country,
                coordinates: {
                    longitude: null,
                    latitude: null
                },
                phone: [location.phone],
                images: location.images,
                schedule: locationSchedule,
                price: location.price,
                averagePrice: location.averagePrice,
                categories: {
                    cuisine: location.categories.cuisine,
                    meals: location.categories.meals,
                    goodFor: location.categories.goodFor
                },
                locationFeatures: location.locationFeatures,
                tripAdvisorRating: parseFloat(location.tripAdvisorRating),
                receivedReviews: [],
                receivedRatings: [],
                menu: [],
                temporaryMenu: []
            }
            new Location(locationItem).save();
        }
    };

};

exports.setDefaultAverageScore = function(req, res) {
    Location.update({}, { averageScore: 3}, { multi: true }, function (err, raw) {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
      });      

};
