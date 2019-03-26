//Actions
const FETCH_CITIES = 'FETCH_CITIES';
const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
const FETCH_MOST_RATED_LOCATIONS = 'FETCH_MOST_RATED_LOCATIONS';
const FETCH_LOCATION_BY_ID = 'FETCH_LOCATION_BY_ID';

const initialState = {
  citiesList: [],
  locationsList: [],
//   locationsListByCity: [],
  selectedCity: null,
//   mostRatedLocationsList: {},
  locationDetails: null,
};


//Reducer
export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITIES:
          return {
              ...state,
              citiesList: action.payload
          };
        case FETCH_LOCATIONS:
          return {
              ...state,
              locationsList: action.payload
          };
        case SET_SELECTED_CITY: 
          return {
              ...state,
              selectedCity: action.payload
          }
        case FETCH_MOST_RATED_LOCATIONS: 
          return {
            ...state,
            locationsList: action.payload
          }
        case FETCH_LOCATION_BY_ID:
          return {
              ...state,
              locationDetails: action.payload
          }
        default:
          return state;
    }
}


//Action Creators

export const fetchCities = function() {
    return function(dispatch) { 
        fetch('http://localhost:3001/api/location/getLocationsCities', {
            headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function(response){
            if(response.status === 200) {
                response.json().then((cities) => {
                    dispatch({
                        type: FETCH_CITIES,
                        payload: cities
                      })
                })
            } else {
                response.json().then(() => {
                    console.log('Error while trying to fetch cities');
                });
            }
        });
    }
} 

export const fetchLocationsByCity = function() {
    return (dispatch, getState) => {
        const selectedCity = getState().locations.selectedCity;
        fetch('http://localhost:3001/api/location/getLocationsByCity', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(selectedCity)
            }).then(function(response) {
                if(response.status === 200) {
                    response.json().then((locations) => {
                        let locationsListByCity = [];
                        locationsListByCity = setDefaultCoordinates(locations);
                        dispatch({
                            type: FETCH_LOCATIONS,
                            payload: locationsListByCity
                        });
                    })
                }
        });
    }
}

// export const fetchLocationsList = (flag) => {
    
//     return (dispatch, getState) => {
//         let locationsList = [];
//         if(flag === 'MostRatedLocationsComponent') {
//             locationsList = getState().locations.mostRatedLocationsList
//         } else if(flag === 'LocationSearchComponent') {
//             locationsList = getState().locations.locationsListByCity
//         }
//         dispatch({
//             type: FETCH_LOCATIONS_LIST,
//             payload: locationsList
//         });
//     }
// }



export const setSelectedCity = (cityData) => {
    return (dispatch) => {
        dispatch({
            type: SET_SELECTED_CITY,
            payload: cityData
        })
    }
}

const setDefaultCoordinates = (locationsListByCity) => {
    let formattedLocationsList = []
    formattedLocationsList = locationsListByCity.map((location) => {
        location.coordinates.latitude = 0;
        location.coordinates.longitude = 0;
        return location;
    });      
    return formattedLocationsList;
}

export const fetchMostRatedLocations = () => {
    return (dispatch) => {
        fetch('http://localhost:3001/api/location/getMostRatedLocations', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function(response){
            if(response.status === 200) {
                response.json().then((mostRatedLocationsList) => {
                  dispatch({
                    type: FETCH_MOST_RATED_LOCATIONS,
                    payload: mostRatedLocationsList
                  });
                });
            }
        });
    }
}

export const fetchLocationById = (id) => {
    return(dispatch) => {
        fetch(`http://localhost:3001/api/location/getSingleLocation/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        }).then(function(response){
            if(response.status === 200) {
                response.json().then((location) => {
                  dispatch({
                    type: FETCH_LOCATION_BY_ID,
                    payload: location
                  });
                });
            }
        });
    }
}


export const getLocationById = (locationId) => {
    return(dispatch, getState) => {
        const locationsList = getState().locations.locationsList;
        let locationItemById = locationsList.find(location => location._id == locationId);
        return locationItemById;
    }
}
