//Actions
const FETCH_POSTS = 'FETCH_POSTS';
const NEW_POST = 'NEW_POST';
const FETCH_CITIES = 'FETCH_CITIES';
const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

const initialState = {
  items: [],
  item: {},
  citiesList: [],
  locationsListByCity: [],
  selectedCity: null
};


//Reducer
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload
      };
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
export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

export const createPost = (postData) => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};

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
        const selectedCity = getState().posts.selectedCity;
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

// for(index = 0; index < this.props.locationsList.length; index++) { 
        //     if(!this.props.locationsList[index].coordinates.longitude) {
                
        //         let coordinates = this._setDefaultCoordinates(this.props.locationsList[index].coordinates.latitude, this.props.locationsList[index].coordinates.longitude);
                
        //         this.props.locationsList[index].coordinates.latitude = coordinates.latitude;
        //         this.props.locationsList[index].coordinates.longitude = coordinates.longitude;
        //     }                      
        // }

        // _setDefaultCoordinates(latitude, longitude) {
        //     let coordinates = {
        //         latitude: 0,
        //         longitude: 0
        //     };
        //     return coordinates;
        // }


const setDefaultCoordinates = (locationsListByCity) => {
    let formattedLocationsList = []
    formattedLocationsList = locationsListByCity.map((location) => {
        location.coordinates.latitude = 0;
        location.coordinates.longitude = 0;
        return location;
    });      
    return formattedLocationsList;
}
