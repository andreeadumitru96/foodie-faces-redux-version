

//Actions
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const FETCH_OWNER_LOCATIONS = 'FETCH_OWNER_LOCATIONS';
const SAVE_GOOGLE_SEARCH_FOOD = 'SAVE_GOOGLE_SEARCH_FOOD';


const initialState = {
    userDetails: {},
    ownerLocations: []
};


//Reducer
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userDetails: action.payload
            };
        case FETCH_OWNER_LOCATIONS: 
            return {
                ...state,
                ownerLocations: action.payload
            }

        case SAVE_GOOGLE_SEARCH_FOOD: 
            return {
                ...state,
                userDetails: action.payload
            }
        
        default:
            return state;
    }
}


//Action Creators

export const loginUser = function (userCredentials) {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(userCredentials)
            }).then(function (response) {
                if (response.status === 200) {
                    response.json().then((userDetails) => {
                        dispatch({
                            type: 'LOGIN',
                            payload: userDetails
                        });
                        resolve();
                    });
                } else {
                    response.json().then((data) => {
                        reject(data.message);
                    });
                }
            })

           
        });
    }
}


export const registerUser = function (userCredentials) {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/register', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(userCredentials)
            }).then(function (response) {
                if(response.status === 200) {
                    response.json().then((data) => {
                        resolve();
                    });
                } else {
                    response.json().then((data) => {
                        reject(data.message);
                    });
                }
            });

           
        });
    }
}

export const fetchOwnerLocations = (ownerId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3001/api/getOwnerLocations', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(ownerId)
            }).then(function (response) {
                if(response.status === 200) {
                    response.json().then((locations) => {
                        console.log(locations);
                        dispatch({
                            type: 'FETCH_OWNER_LOCATIONS',
                            payload: locations
                        })
                        resolve();
                    });
                } else {
                    response.json().then((err) => {
                        reject(err.message);
                    });
                }
            });
        });
    }
}


export const saveGoogleSearchFood = (data) => {
    return(dispatch) => {
        return new Promise((resolve, reject) => {

            fetch('http://localhost:3001/api/saveGoogleSearchFood', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(data)
            }).then((response) => {
                if(response.status === 200) {
                    response.json().then((user) => {

                        console.log(user);
                        dispatch({
                            type: 'SAVE_GOOGLE_SEARCH_FOOD',
                            payload: user
                        });
                        resolve();
                    });
                    
                } else {
                    response.json().then((err) => {
                        reject(err);
                    });
                    
                }
            });
        });
    }
}