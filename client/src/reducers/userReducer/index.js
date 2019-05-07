

//Actions
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER'


const initialState = {
    userDetails: {},
};


//Reducer
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userDetails: action.payload
            };
        
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
