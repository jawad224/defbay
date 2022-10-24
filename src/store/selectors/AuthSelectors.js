export const isAuthenticated = (state) => {
    console.log(state)
    if (state.auth.auth.token) return true;
    return false;
};
