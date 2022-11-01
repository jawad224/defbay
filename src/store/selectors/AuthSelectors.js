export const isAuthenticated = (state) => {
    console.log(state)
    if (state.auth.auth.token){
        console.log("token  false==>",state.auth.auth.token)

        return true;
    } 
    // console.log("token  false==>",state.auth.auth.token)
    return false;
};
