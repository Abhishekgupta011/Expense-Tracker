import React from "react";

const AuthContext = React.createContext({
    token:"",
    isloggedIn:false,
    login: (token)=>{},
    logout:()=>{},
    refreshToken:"",
})

export default AuthContext;