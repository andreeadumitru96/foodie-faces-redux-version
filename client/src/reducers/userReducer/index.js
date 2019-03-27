

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

export const userLogin = function(userCredentials) {
    return function(dispatch) { 
        fetch('http://localhost:3001/api/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(userCredentials)
        }).then(function (response) {
            if(response.status === 200) {
				response.json().then((userDetails) => {
                    dispatch({
                        type: LOGIN,
                        payload: userDetails
                    });
				})
            } 
            // else {
			// 	response.json().then((data) => {
			// 		notificationError(data.message);
			// 	});
            // }
        });
    }
} 

