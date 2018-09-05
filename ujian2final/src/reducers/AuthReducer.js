const INITIAL_STATE = 
    {username: "", email: "", error:"", cookieCheck: false, studio:""}
;

//INITIAL_STATE => default parameter
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "USER_LOGIN_SUCCESS" :
            return {...action.payload, cookieCheck: true, studio:""};
        case "USER_LOGIN_FAIL":
            return {...state, error: "Authentication Error"}
        case "COOKIES_CHECKED":
            return {...state, cookieCheck: true}
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        case "MOVIE_SELECT":   
            return {...state, ...action.payload}
        case "RESET_MOVIE":   
            return {...state, ...action.payload}
        default :   
            return state;
    }
}