import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';



export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(email, password, history) {
    
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            runLogoutTimer(
                dispatch,
                response.data.expiresIn * 1000,
                history,
            );
            dispatch(confirmedSignupAction(response.data));
            console.log("response ==>",response.data)
            history.push('/home');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logout(history) {
    console.log("logout in redux==>",history)
    localStorage.removeItem('userDetails');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, history) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                console.log("ahmed==>",response?.data)
                if(response?.data.status == true)
                {
                dispatch(loginConfirmedAction(response.data))
                
                if(response?.data?.data?.role == "applicant")
                {
                   
                    saveTokenInLocalStorage(response?.data?.token);
                    // localStorage.setItem("AdminToken",response?.data?.token)
                    // localStorage.setItem('AdminToken', response?.data?.token);
                    // console.log("value of token==>",response?.data?.token)
                // runLogoutTimer(
                //     dispatch,
                //     response.data.expiresIn * 1000,
                //     history,
                // );
                dispatch(loginConfirmedAction({...response?.data?.data,token:response?.data?.token}));
                
				history.push('/HomeApplicant');     

                }
                if(response?.data?.data?.role == "recruiter")
                {
                    saveTokenInLocalStorage(response?.data?.token);
                // runLogoutTimer(
                //     dispatch,
                //     response.data.expiresIn * 1000,
                //     history,
                // );
                dispatch(loginConfirmedAction({...response?.data?.data,token:response?.data?.token}));
				history.push('/HomeRecruiter');     

                }
            }
            else if(response?.data.status === false){
                
                dispatch(loginFailedAction(response.data.message));
            }
                
                           
            })
            .catch((error) => {
				console.log("my error",error);
                const errorMessage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {

    console.log("value of status of loader==>",status)
    
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
