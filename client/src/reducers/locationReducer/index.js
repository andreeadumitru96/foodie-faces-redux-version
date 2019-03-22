//Actions
const FETCH_CITIES = 'FETCH_CITIES';
const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

const initialState = {
  citiesList: [],
  locationsListByCity: [],
  selectedCity: null
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
          locationsListByCity: action.payload
      };
    case SET_SELECTED_CITY: 
      return {
          ...state,
          selectedCity: action.payload
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
                response.json().then((data) => {
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
                        locationsListByCity = setDefaultCoordinates(locations)
                        console.log(locations);
                        dispatch({
                            type: FETCH_LOCATIONS,
                            payload: locationsListByCity
                        });
                    })
                }
        });
    }
}


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
